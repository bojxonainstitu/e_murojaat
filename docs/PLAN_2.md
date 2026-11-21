# 2-topshiriq rejasi (qisqa)

**Stek:** oʻzgarmaydi — vanilla JS (build yoʻq) + Python server. `.ts` nomlari oʻrniga mavjud `.js` fayllar ishlatiladi (DECISIONS #1).

| Bosqich | Ish | Asosiy fayllar |
|---|---|---|
| A | "LexHakaton · MVP" nishoni va footerdagi yozuv, "Namunani koʻrish" tugmasi, video qoʻllanma, "Tahrirlash" soʻzi, rejim belgisi va "AI va maxfiylik" tugmasi/oynasini olib tashlash | `index.html`, `js/app.js`, `js/config.js`, `js/components/videoGuide.js` (oʻchiriladi), `css/*.css`, `js/i18n/*`, `i18n-src/kaa.latn.json` |
| B | "Muammoim" → "Muammo"; "Qoʻshimcha maʼlumotlar" maydoni (`extraInfo` → `keyFacts`); `[TELEFON]/[EPOCHTA]/[RAQAM]` niqoblari | `appealComposer.js`, `app.js`, `ai/client.js`, `server/classify.py`, `server/server.py`, `docTemplate.js` |
| C | Natijadagi "tasdiqlanmagan/tekshirilsin" yozuvlari olib tashlanadi; qonunlar lex.uz dagi rasmiy nomi bilan, havola nom ustida; muddat 28-moddadan | `legal_basis_db.js`, `resultPanels.js`, `docTemplate.js` |
| D | Ilova A bazasi + `categoryIds`, `hierarchy`, `sources`, `verified`; `resolveOrganizations`; 16 soha (`land_property`, `enforcement`) | `organizations_db.js`, `js/lib/resolveOrganizations.js` (yangi), `categories.js`, `server/classify.py`, `resultPanels.js`, `docTemplate.js` |
| Test | Unit (organlar yaxlitligi, resolve, qonun nomlari snapshot), server testlari, Playwright (olib tashlangan elementlar 5 tilda, toʻliq oqim 320/390, kenglik sweep) | `tests/unit.js`, `server/test_server.py`, `tests/e2e.py` |

**Xavflar:** (1) Git oʻrnatilmagan → branch/commit yoʻq, oʻrniga `backups/pre-update-2-2026-11-21.zip`. (2) lex.uz rus tilidagi nomlarini avtomatik olib boʻlmadi → `ru` uchun uz-Cyrl rasmiy nomi koʻrsatiladi. (3) Manzil va telefonlarni toʻliq tekshirib boʻlmaydi → `verified: false`. (4) "Tahlilda" soʻzi kodda yoʻq — "Tayyor hujjat" kartasidagi "Tahrirlash" soʻzi deb talqin qilindi (DECISIONS #24).
