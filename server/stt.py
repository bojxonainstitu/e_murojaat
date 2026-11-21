"""
Speech-to-Text (nutqni matnga oʻgirish) abstraksiyasi.

Hozircha haqiqiy provayder ULANMAGAN: `StubSTT` mavjud emasligini bildiradi va
server /api/transcribe ga 501 qaytaradi (mijoz "matnni yozing" deb xabar beradi).

Haqiqiy provayderni ulash (oʻzbek tilini qoʻllaydigan xizmat tanlang):
  1) Shu faylda `STTProvider` dan meros oluvchi klass yozing va
     `transcribe(audio: bytes, mime: str, locale: str) -> str` ni amalga oshiring.
  2) `get_stt()` ichida STT_PROVIDER qiymati boʻyicha qaytaring.
  3) .env ga yozing:  STT_PROVIDER=<nom>  STT_API_KEY=<kalit>  (+ provayderga xos sozlamalar)
Audio faqat shu so'rov uchun ishlatiladi va diskka yozilmaydi.
"""
from __future__ import annotations

import os


class STTProvider:
    name = "none"

    def available(self) -> bool:
        return False

    def transcribe(self, audio: bytes, mime: str, locale: str) -> str:
        raise NotImplementedError("stt_not_configured")


class StubSTT(STTProvider):
    """Mock: demo maqsadida STT_DEMO_TEXT berilsa, shu matnni qaytaradi."""

    name = "stub"

    def __init__(self):
        self.demo_text = os.environ.get("STT_DEMO_TEXT", "")

    def available(self) -> bool:
        return bool(self.demo_text)

    def transcribe(self, audio: bytes, mime: str, locale: str) -> str:
        if not self.demo_text:
            raise NotImplementedError("stt_not_configured")
        return self.demo_text


def get_stt() -> STTProvider:
    kind = os.environ.get("STT_PROVIDER", "stub").lower()
    # if kind == "my_provider": return MyProvider(os.environ["STT_API_KEY"])
    return StubSTT()
