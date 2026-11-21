# E-murojat — yangilash rejasi

## Audit xulosasi (oʻzgartirishdan oldin)
- **Stek:** build'siz vanilla HTML/CSS/JS (`index.html`, `css/`, `js/`), global obyektlar (`EM_I18N`, `EM_KB`, `EM_AI`). Marshrutlash yoʻq: titul varaq ↔ ishchi oyna `hidden` va xesh bilan almashadi (yangi xesh `#murojat`, eskisi ham qabul qilinadi).
- **i18n:** `js/i18n.js` (uz/ru/kaa-lotin/en lugʻati, `data-i18n*` atributlari), `js/knowledge.i18n.js` (bilimlar bazasi tarjimasi).
- **AI:** `js/ai.js` brauzerdan toʻgʻridan-toʻgʻri Anthropic API'ga murojat qiladi va kalitni localStorage'da saqlaydi. Bu yangi xavfsizlik talabiga zid, shuning uchun serverga koʻchiriladi.
- **Stil:** `css/style.css` dagi `:root` tokenlari (indigo, yashil/sariq/qizil) va `css/landing.css` (navy/teal/gold).
- **Muhit:** Node, npm va git **yoʻq**; Python 3.12 va `anthropic` SDK **bor**. Shuning uchun TypeScript/zod/npm-build oʻrniga JS + Python ishlatiladi (qarang: `DECISIONS.md`).

## Bosqichlar
| Bosqich | Mazmun | Asosiy fayllar |
|---|---|---|
| 0 | Brend `E-murojat` (yagona konstanta + glossariy), imlo normalizatsiyasi, translit, 5 til (`uz-Latn`, `uz-Cyrl`, `ru`, `kaa`-kirill, `en`), matn kesilmasligi, mobil (44px, 16px, dvh, safe-area), video qoʻllanma | `js/config.js`, `js/i18n/*`, `js/lib/uzNormalize.js`, `js/lib/translit.js`, `js/components/videoGuide.js`, `js/components/languageSwitcher.js`, `css/flow.css` |
| 1 | "Murojat qiluvchi maʼlumotlari" oynasi: F.I.Sh., viloyat → tuman, manzil, telefon (+998 maskasi) / e-pochta, "Davom etish" | `js/data/regions.js`, `js/lib/validators.js`, `js/components/applicantDialog.js` |
| 2 | Holat mashinasi (profil → kiritish → aniqlashtirish → natija), AI chat qatori, 14 soha tasnifi, ovozli kiritish (tasdiq bilan), fayl biriktirish | `js/app.js`, `js/data/categories.js`, `js/components/appealComposer.js`, `js/components/voiceInput.js`, `js/components/attachmentList.js`, `js/ai/client.js`, `js/ai/stt.js`, `server/*.py` |
| 3 | 5 ta natija oynasi, hududiy organlar bazasi (fallback bilan), qonun bazasi, `validateAppeal()`, 7 boʻlimli hujjat, javob muddati va eskalatsiya | `js/components/resultPanels.js`, `js/data/organizations_db.js`, `js/data/legal_basis_db.js`, `js/lib/validateAppeal.js`, `js/lib/docTemplate.js` |
| QA | Brauzer unit testlari, Python testlari, 320–768px kengliklarda tekshiruv, 5 til boʻyicha toʻliq oqim | `tests/`, `server/test_server.py` |

## Xavflar
- **Rasmiy maʼlumotlar** (organ manzil/telefon, modda raqamlari, muddat turi) bu muhitda tasdiqlanmaydi → `verified: false`, interfeysda "tekshirilsin" deb koʻrsatiladi.
- **Kirill va qoraqalpoq matnlari** ona tili egasi tekshiruvini talab qiladi (`I18N_REVIEW.md`).
- **Git yoʻq** → bosqichma-bosqich commit qilib boʻlmaydi; oʻrniga `backups/pre-update-*.zip` va `PROGRESS.md` jurnali yuritiladi.
- **Haqiqiy STT provayderi va WebView** bu yerda sinab boʻlmaydi (stub va hujjat).
- **Eski funksiyalar** (demo, tahlil, DOCX, nusxa, chop etish, titul varaq animatsiyasi) yangi oqimga koʻchiriladi va qoʻlda tekshiriladi.
