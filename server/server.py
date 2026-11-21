"""
E-murojat — kichik server (faqat Python standart kutubxonasi + anthropic/pydantic).

  python server/server.py            # http://127.0.0.1:8765
  PORT=9000 python server/server.py

Vazifalari:
  • loyiha papkasidagi statik fayllarni berish (server/, .env, backups/ va h.k. yopiq);
  • GET  /api/health      → {"ai": bool, "stt": bool, "model": str|null}
  • POST /api/classify    → {"text", "targetLocale"} → tasniflash (zod oʻrniga pydantic bilan tekshiriladi)
  • POST /api/transcribe  → audio → {"text"}  (provayder ulanmagan boʻlsa 501)
Xavfsizlik: kalitlar faqat .env da; IP boʻyicha oddiy rate-limit; soʻrov tanasi va
shaxsiy maʼlumotlar logga yozilmaydi.
"""
from __future__ import annotations

import json
import os
import sys
import threading
import time
from collections import defaultdict, deque
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))


def load_env(path: Path) -> None:
    """Oddiy .env oʻquvchi: KEY=VALUE qatorlari (mavjud muhit oʻzgaruvchilari ustun)."""
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env(ROOT / ".env")
load_env(ROOT / "server" / ".env")

from ai_provider import ProviderError, get_provider  # noqa: E402
from classify import LOCALES, MAX_EXTRA, classify  # noqa: E402
from stt import get_stt  # noqa: E402

PROVIDER = get_provider()
STT = get_stt()

MAX_JSON_BYTES = 32 * 1024
MAX_AUDIO_BYTES = 10 * 1024 * 1024
MAX_TEXT = 6000
BLOCKED_PREFIXES = ("/server", "/.env", "/backups", "/scripts", "/.claude", "/i18n-src", "/tests/__pycache__", "/.git")


class RateLimiter:
    """IP boʻyicha sirpanuvchi oyna: `limit` ta soʻrov / `window` soniya."""

    def __init__(self, limit: int, window: float):
        self.limit, self.window = limit, window
        self.hits = defaultdict(deque)
        self.lock = threading.Lock()

    def allow(self, key: str, now: float | None = None) -> bool:
        now = time.monotonic() if now is None else now
        with self.lock:
            q = self.hits[key]
            while q and now - q[0] > self.window:
                q.popleft()
            if len(q) >= self.limit:
                return False
            q.append(now)
            return True


LIMITS = {"/api/classify": RateLimiter(20, 60), "/api/transcribe": RateLimiter(10, 60)}


class Handler(SimpleHTTPRequestHandler):
    server_version = "EMurojat/1.0"

    # ---- yordamchilar ----
    def _json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def _read_body(self, limit: int) -> bytes | None:
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > limit:
            return None
        return self.rfile.read(length)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Permissions-Policy", "microphone=(self), camera=(self)")
        super().end_headers()

    def log_message(self, fmt, *args):  # faqat usul, yoʻl va holat — tana va shaxsiy maʼlumot yoʻq
        sys.stderr.write("%s %s\n" % (self.log_date_time_string(), fmt % args))

    # ---- statik fayllar ----
    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/api/health":
            return self._json(200, {"ai": PROVIDER.available(), "stt": STT.available(),
                                    "model": getattr(PROVIDER, "model", None) if PROVIDER.available() else None})
        if path.startswith("/api/"):
            return self._json(404, {"error": "not_found"})
        if any(path.lower().startswith(p) for p in BLOCKED_PREFIXES):
            return self._json(404, {"error": "not_found"})
        return super().do_GET()

    def do_HEAD(self):
        path = self.path.split("?", 1)[0]
        if path.startswith("/api/") or any(path.lower().startswith(p) for p in BLOCKED_PREFIXES):
            self.send_response(404)
            self.end_headers()
            return
        return super().do_HEAD()

    # ---- API ----
    def do_POST(self):
        path = self.path.split("?", 1)[0]
        limiter = LIMITS.get(path)
        if limiter is None:
            return self._json(404, {"error": "not_found"})
        if not limiter.allow(self.client_address[0]):
            return self._json(429, {"error": "rate_limited"})
        if path == "/api/classify":
            return self._classify()
        return self._transcribe()

    def _classify(self):
        if not PROVIDER.available():
            return self._json(503, {"error": "ai_not_configured"})
        raw = self._read_body(MAX_JSON_BYTES)
        if raw is None:
            return self._json(413, {"error": "bad_size"})
        try:
            data = json.loads(raw.decode("utf-8"))
            text = str(data.get("text", "")).strip()[:MAX_TEXT]
            extra = str(data.get("extraInfo", "") or "").strip()[:MAX_EXTRA]
            locale = data.get("targetLocale") if data.get("targetLocale") in LOCALES else "uz-Latn"
        except (ValueError, AttributeError):
            return self._json(400, {"error": "bad_json"})
        if len(text) < 5:
            return self._json(400, {"error": "text_too_short"})
        try:
            return self._json(200, classify(PROVIDER, text, locale, extra))
        except ProviderError as e:
            sys.stderr.write("classify: AI provayder xatosi — mijoz lokal rejimga oʻtadi\n")
            return self._json(502, {"error": str(e)})
        except ValueError as e:
            sys.stderr.write("classify: javob sxemaga mos emas — mijoz lokal rejimga oʻtadi\n")
            return self._json(502, {"error": str(e)})

    def _transcribe(self):
        if not STT.available():
            return self._json(501, {"error": "stt_not_configured"})
        raw = self._read_body(MAX_AUDIO_BYTES)
        if raw is None:
            return self._json(413, {"error": "bad_size"})
        locale = self.headers.get("x-locale", "uz-Latn")
        try:
            text = STT.transcribe(raw, self.headers.get("Content-Type", ""), locale)
        except NotImplementedError:
            return self._json(501, {"error": "stt_not_configured"})
        except Exception:
            return self._json(502, {"error": "stt_failed"})
        return self._json(200, {"text": text})


def main():
    for stream in (sys.stdout, sys.stderr):  # Windows konsolida ham UTF-8
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass
    port =int(os.environ.get("PORT") or (sys.argv[1] if len(sys.argv) > 1 else 8765))
    host = os.environ.get("HOST", "127.0.0.1")
    handler = partial(Handler, directory=str(ROOT))
    httpd = ThreadingHTTPServer((host, port), handler)
    print(f"E-murojat: http://{host}:{port}  (AI: {'ulangan' if PROVIDER.available() else 'yoʻq — lokal rejim'}, "
          f"STT: {'ulangan' if STT.available() else 'yoʻq'})", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
