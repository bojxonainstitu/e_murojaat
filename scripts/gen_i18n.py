"""
E-murojat — kirill lugʻatlarini hosil qilish skripti.

  python -I scripts/gen_i18n.py

1) js/i18n/uz-Latn.js  →  js/i18n/uz-Cyrl.js   (oʻzbek lotin → kirill)
2) i18n-src/kaa.latn.json → js/i18n/kaa.js     (qoraqalpoq lotin → kirill)

Qoidaviy oʻgirishdan soʻng OVERRIDES lugʻatidagi qoʻlda tuzatilgan qiymatlar
ustidan yoziladi. Natija fayllar statik va koʻrib chiqiladi (docs/I18N_REVIEW.md).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TURNED, MOD = "ʻ", "ʼ"
APOS = "['‘’ʻʼ`´]"
LETTER_RE = re.compile(r"[A-Za-zÀ-ɏЀ-ӿʻʼ]")

PROTECT = re.compile(
    r"(<[^>]+>|\{[^}]+\}|§\w|https?://\S+|[\w.+-]+@[\w-]+\.[\w.]+|"
    r"\b[\w-]+(?:\.[\w-]+)*\.(?:uz|com|org|ru|md|js|docx|pdf|env)\b|\.env\b|"
    r"\b(?:DOCX|PDF|AI|API|E-murojat|LexHakaton|MVP|STT|URL|ID|MB)\b|\+998[\d ]*|[A-Z]{2,}\s[A-Z]{2,}\s[A-Z]{2}\s[A-Z]{2})"
)

# Qoʻlda tuzatilgan qiymatlar (qoidaviy oʻgirish xato beradigan joylar)
OVERRIDES = {
    "uz-Cyrl": {
        "ph.email": "ism@pochta.uz",
        "ph.fish": "Масалан: Алиев Акмал Каримович",
        "err.email": "Э-почта нотўғри. Масалан: ism@pochta.uz",
        "lbl.fish": "Ф.И.Ш.",
        "ph.d.fish": "Ф.И.Ш.",
    },
    "kaa": {
        "ph.email": "at@pochta.uz",
        "err.email": "Э-почта қәте. Мысалы: at@pochta.uz",
        "lbl.fish": "Ф.А.Ә.",
        "ph.d.fish": "Ф.А.Ә.",
        "law.art": "{n}-статья",  # REVIEW
    },
}


def is_upper(ch):
    return bool(ch) and ch != ch.lower() and ch == ch.upper()


def word_all_caps(s, i):
    a = b = i
    while a > 0 and LETTER_RE.match(s[a - 1]):
        a -= 1
    while b < len(s) and LETTER_RE.match(s[b]):
        b += 1
    w = s[a:b].replace(TURNED, "").replace(MOD, "")
    return len(w) > 1 and w == w.upper() and w != w.lower()


def apply_case(src, out, s, i):
    if not is_upper(src[0]):
        return out
    if word_all_caps(s, i) or (len(src) > 1 and is_upper(src[1])):
        return out.upper()
    return out[0].upper() + out[1:]


def normalize_apostrophes(s):
    def og(m):
        start = m.start()
        prev = s[start - 1] if start > 0 else ""
        nxt = s[start + 2] if start + 2 < len(s) else ""
        if not LETTER_RE.match(prev or " ") and not LETTER_RE.match(nxt or " "):
            return m.group(0)
        return m.group(1) + TURNED
    s = re.sub("([oOgG])" + APOS, og, s)
    # o/g dan keyingisi allaqachon ʻ — qolgan harf'harf → tutuq belgisi
    s = re.sub(r"([A-FH-NP-Za-fh-np-zÀ-ɏ])" + APOS + r"(?=[A-Za-zÀ-ɏ])", r"\1" + MOD, s)
    return s


UZ_PAIRS = [("s" + MOD + "h", "сҳ"), ("o" + TURNED, "ў"), ("g" + TURNED, "ғ"), ("sh", "ш"), ("ch", "ч"),
            ("yo", "ё"), ("yu", "ю"), ("ya", "я"), ("ye", "е")]
UZ_SINGLE = dict(a="а", b="б", d="д", f="ф", g="г", h="ҳ", i="и", j="ж", k="к", l="л", m="м", n="н",
                 o="о", p="п", q="қ", r="р", s="с", t="т", u="у", v="в", x="х", y="й", z="з", c="ц", w="в")
UZ_SINGLE[MOD] = "ъ"


def uz_chunk(chunk):
    s = normalize_apostrophes(chunk)
    out, i = [], 0
    while i < len(s):
        low = s[i:i + 3].lower()
        done = False
        for lat, cyr in UZ_PAIRS:
            if low.startswith(lat):
                if lat == "yo" and i + 2 < len(s) and s[i + 2] == TURNED:
                    break
                # undosh + "ye" soʻz ichida (obyekt, subyekt) → "ъе"
                if lat == "ye" and i > 0 and LETTER_RE.match(s[i - 1]) and s[i - 1].lower() not in "aeiouʻʼ":
                    out.append("ъ")
                out.append(apply_case(s[i:i + len(lat)], cyr, s, i))
                i += len(lat)
                done = True
                break
        if done:
            continue
        ch = s[i]
        lc = ch.lower()
        if lc == "e":
            prev = s[i - 1] if i > 0 else ""
            out.append(apply_case(ch, "е" if LETTER_RE.match(prev or " ") else "э", s, i))
        elif lc in UZ_SINGLE:
            out.append(apply_case(ch, UZ_SINGLE[lc], s, i))
        elif ch == TURNED:
            pass
        else:
            out.append(ch)
        i += 1
    return "".join(out)


KAA_PAIRS = [("sh", "ш"), ("ch", "ч"), ("ya", "я"), ("yu", "ю"), ("yo", "ё")]
KAA_SINGLE = {"a": "а", "á": "ә", "b": "б", "d": "д", "e": "е", "f": "ф", "g": "г", "ǵ": "ғ", "h": "ҳ",
              "x": "х", "ı": "ы", "i": "и", "j": "ж", "k": "к", "q": "қ", "l": "л", "m": "м", "n": "н",
              "ń": "ң", "o": "о", "ó": "ө", "p": "п", "r": "р", "s": "с", "t": "т", "u": "у", "ú": "ү",
              "v": "в", "w": "ў", "y": "й", "z": "з", "c": "ц", "í": "и"}


def kaa_chunk(s):
    out, i = [], 0
    while i < len(s):
        low = s[i:i + 2].lower()
        pair = next((p for p in KAA_PAIRS if p[0] == low), None)
        if pair:
            out.append(apply_case(s[i:i + 2], pair[1], s, i))
            i += 2
            continue
        ch = s[i]
        lc = ch.lower()
        r = KAA_SINGLE.get(lc)
        out.append(ch if r is None else apply_case(ch, r, s, i))
        i += 1
    return "".join(out)


def map_protected(text, fn):
    out, last = [], 0
    for m in PROTECT.finditer(text):
        out.append(fn(text[last:m.start()]))
        out.append(m.group(0))
        last = m.end()
    out.append(fn(text[last:]))
    return "".join(out)


# Koʻrib chiqishda topilgan soʻz darajasidagi tuzatishlar (qoʻlda)
POST_FIX = {
    "uz-Cyrl": [(r"\bAI(?=[а-яўқғҳ]|\b)", "СИ"), (r"\bАИ", "СИ"), (r"цалл-", "колл-"),
                (r"тси([яо])", r"ци\1"), (r"инспексия", "инспекция"), (r"Инспексия", "Инспекция"),
                (r"квитансия", "квитанция"), (r"Квитансия", "Квитанция"), (r"лицензия", "лицензия")],
    "kaa": [(r"\bAI(?=[а-яәғқңөүўҳы]|\b)", "ЖИ"), (r"субйект", "субъект"), (r"\bе-почта", "э-почта"), (r"\bЕ-почта", "Э-почта"),
            (r"цалл-", "колл-")],
}


def post_fix(code, text):
    for pat, rep in POST_FIX.get(code, []):
        text = re.sub(pat, rep, text)
    return text


def read_js_locale(path):
    src = path.read_text(encoding="utf-8")
    start = src.index("= {", src.index("EM_LOCALES[")) + 2
    end = src.rindex("};") + 1
    return json.loads(src[start:end])


def write_js_locale(path, code, data, header):
    body = json.dumps(data, ensure_ascii=False, indent=2)
    path.write_text(
        header + "window.EM_LOCALES = window.EM_LOCALES || {};\n"
        f'window.EM_LOCALES["{code}"] = {body};\n', encoding="utf-8")


def main():
    uz = read_js_locale(ROOT / "js/i18n/uz-Latn.js")
    cyr = {k: post_fix("uz-Cyrl", map_protected(v, uz_chunk)) for k, v in uz.items()}
    cyr.update(OVERRIDES["uz-Cyrl"])
    write_js_locale(ROOT / "js/i18n/uz-Cyrl.js", "uz-Cyrl", cyr,
                    "// Oʻzbek kirill lugʻati. scripts/gen_i18n.py orqali uz-Latn.js dan hosil qilingan,\n"
                    "// soʻng qoʻlda koʻrib chiqilgan (OVERRIDES). Toʻgʻridan-toʻgʻri tahrirlamang —\n"
                    "// uz-Latn.js yoki OVERRIDES ni oʻzgartirib, skriptni qayta ishga tushiring.\n"
                    "// REVIEW: ona tili egasi tekshiruvi tavsiya etiladi (docs/I18N_REVIEW.md).\n")

    kaa = json.loads((ROOT / "i18n-src/kaa.latn.json").read_text(encoding="utf-8"))
    kc = {k: post_fix("kaa", map_protected(v, kaa_chunk)) for k, v in kaa.items()}
    kc.update(OVERRIDES["kaa"])
    write_js_locale(ROOT / "js/i18n/kaa.js", "kaa", kc,
                    "// Qoraqalpoq (kirill) lugʻati. i18n-src/kaa.latn.json dan scripts/gen_i18n.py orqali hosil qilingan.\n"
                    "// REVIEW: butun fayl qoraqalpoq tili ona tili egasi tomonidan tekshirilishi SHART (docs/I18N_REVIEW.md).\n")

    missing = set(uz) ^ set(kaa)
    print("uz-Cyrl:", len(cyr), "kalit; kaa:", len(kc), "kalit")
    if missing:
        print("OGOHLANTIRISH: uz va kaa kalitlari farq qiladi:", sorted(missing))
        sys.exit(1)


if __name__ == "__main__":
    main()
