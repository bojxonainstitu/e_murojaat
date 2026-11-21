# PROGRESS — E-murojat (LexHakaton MVP)

> **Qoida:** har bir muhim qadamdan keyin shu fayl yangilanadi. Yangi sessiyada ishni boshlashdan oldin avval shu faylni, `docs/DECISIONS.md` ni va mavjud fayllarni oʻqing. Mavjud kodni qaytadan yozmang.

**Oxirgi yangilanish:** 2026-11-21 (4-bosqich: 2-topshiriq — interfeysni tozalash, "Muammo", qonun nomlari, organlar bazasi)

## ✅ Tayyor
| Qism | Fayllar | Holati |
|---|---|---|
| Brend va glossariy | `js/config.js` (`BRAND_NAME`), `js/i18n/glossary.js` (`§B`, `§m`, `§M` tokenlari) | "E-murojat" hamma joyda yagona konstantadan. "murojaat" faqat qonunlarning rasmiy nomlarida (`legal_basis_db.js`) |
| Imlo | `js/lib/uzNormalize.js` (ʻ U+02BB, ʼ U+02BC), `js/lib/translit.js` | Unit testlar bilan qoplangan |
| 5 til | `js/i18n/uz-Latn.js`, `ru.js`, `en.js`, `uz-Cyrl.js`, `kaa.js` (kirill; `scripts/gen_i18n.py` orqali), `i18n.js`; 2-topshiriq kalitlari — `scripts/patch_i18n_v2.py` | 327 kalit, barcha tillarda mos |
| Titul varaq | `index.html`, `css/landing.css`, `css/flow.css`, `languageSwitcher.js` | Motion effektlar saqlangan. **Olib tashlandi:** "LexHakaton · MVP" nishoni, "Namunani koʻrish", video qoʻllanma, "Tahrirlash" soʻzi |
| Ilova sarlavhasi | `index.html`, `js/app.js` | **Olib tashlandi:** rejim belgisi (Lokal rejim / AI ulangan) va "AI va maxfiylik" tugmasi + oynasi. Lokal zaxira jim ishlaydi; xato boʻlsa `t.analyzeErr` |
| 1-qadam: profil | `js/components/applicantDialog.js`, `js/data/regions.js`, `js/lib/validators.js` | Oʻzgarmagan |
| 2-qadam: **Muammo** | `js/components/appealComposer.js`, `voiceInput.js`, `attachmentList.js` | Nomi "Muammo" (5 tilda). Yangi: **"Qoʻshimcha maʼlumotlar"** maydoni (≥768px yonma-yon, mobilda ostida) → `extraInfo` → `keyFacts` → hujjatning 4-boʻlimi |
| Tasniflash | `js/ai/client.js`, `js/data/categories.js` (**16 soha**: + `land_property`, `enforcement`), `server/classify.py`, `server/server.py` | Niqoblar `[TELEFON]`, `[EPOCHTA]`, `[RAQAM]`; `extraInfo` `<extra_info>` ichida maʼlumot sifatida |
| 3-qadam: 5 natija oynasi | `js/components/resultPanels.js`, `js/lib/resolveOrganizations.js` (yangi), `js/data/organizations_db.js` (Ilova A), `legal_basis_db.js`, `docTemplate.js` | 1-oyna: toʻliq nom, daraja, ierarxiya (quyi → oʻrta → yuqori, hudud bilan), manzil, `tel:` telefonlar, https sayt, "Shuningdek". 3-oyna: qonun **rasmiy nomi** havola sifatida, raqam/sana, moddalar; "tekshirilsin / tasdiqlanmagan" yozuvlari yoʻq. 5-oyna: muddat 28-moddadan, eskalatsiya zanjirdan. Hujjat "Kimga": quyi bosqich + hudud + "rahbariga" |
| Server | `server/server.py` | `/api/classify` endi `extraInfo` ham oladi; rejim/AI xatosi shaxsiy maʼlumotsiz logga yoziladi |
| Testlar | `tests/unit.html` + `unit.js` (209 ✓), `server/test_server.py` (13 ✓), `tests/e2e.py` (Playwright) | Organlar yaxlitligi, `resolveOrganizations`, qonun nomlari snapshoti, olib tashlangan elementlar 5 tilda |
| Hujjatlar | `docs/PLAN.md`, `PLAN_2.md`, `DECISIONS.md` (#24–#38), `I18N_REVIEW.md`, `MOBILE_WEBVIEW.md`, `README.md` | Yangilangan |

## ⚠ Inson tekshiruvi kerak / chala
- **Organlar:** faqat `raqobat` `verified: true`. Qolganlarining manzil/telefoni foydalanuvchi qiymati (`verified: false`); saytlar ochilishi va nomlar sarlavha bilan solishtirildi (DECISIONS #27).
- **`rent` va `education`** sohalari uchun alohida organ yoʻq → zaxira (Prezidentning Virtual qabulxonasi).
- **Qonunlar:** nomlar, raqamlar, sanalar lex.uz dan; moddalar faqat murojaatlar qonunida. Rus tilidagi rasmiy nomlar olinmadi (ru da uz-Cyrl nom koʻrsatiladi).
- **Tarjimalar:** qoraqalpoq (ayniqsa 2-topshiriq kalitlari), uz-Cyrl, ru, en (`docs/I18N_REVIEW.md`).
- **Maxfiylik matni:** "AI va maxfiylik" oynasi olib tashlangani uchun shaxsiy maʼlumotlarni qayta ishlash haqidagi batafsil matn interfeysda yoʻq — egasi koʻrib chiqsin.
- **Hududlar roʻyxati** xotiradan tuzilgan — rasmiy roʻyxat bilan solishtirish kerak.
- **STT provayderi** ulanmagan (stub). **AI** haqiqiy kalit bilan sinalmagan. **WebView** qurilmada sinalmagan.
- **Git yoʻq:** commit qilinmagan; zaxira: `backups/pre-update-2026-11-20.zip`, `backups/pre-update-2-2026-11-21.zip`.
- `assets/logo-full.png` va `hero-reference.png` rasmlari ichida eski brend yozuvi bor (rasm, matn emas). Ular interfeysda ham, `og:image` da ham endi ishlatilmaydi (`og:image` → `logo-mark.png`).

## ➡ Keyingi qadamlar
1. Organlarning manzil va telefonlarini rasmiy saytlardan tasdiqlash; viloyat/tuman yozuvlarini qoʻshish.
2. Qonunlarning rus tilidagi rasmiy nomlarini va sohaviy moddalarni lex.uz dan qoʻshish.
3. Haqiqiy STT provayderini `server/stt.py` ga ulash; AI'ni haqiqiy kalit bilan sinash.
4. Git oʻrnatib, `feature/e-murojat-update-2` branchiga commit qilish.

## 📌 Muhim qarorlar
Batafsil: `docs/DECISIONS.md`. Asosiylari:
- Stek oʻzgarmadi: vanilla JS + Python server (Node yoʻq).
- AI kaliti faqat serverda; AIga shaxsiy maʼlumot va fayllar yuborilmaydi.
- `murojat` atamasi glossariyda; qonun nomlari esa rasmiy shaklda ("murojaatlari").
- Uydirma maʼlumot yoʻq: yasalgan hududiy organ nomlari olib tashlandi; `verified` faqat ichki belgi.

## 🕒 Jurnal
- **2026-11-20 (1)** — MVP yaratildi (forma + 4 kartochka, DOCX, chop etish).
- **2026-11-20 (2)** — Motion effektli titul varaq va 4 til qoʻshildi.
- **2026-11-20 (3)** — 1-topshiriq: brend "E-murojat", 5 til, 3 qadamli oqim, 14 soha, ovoz, fayllar, 5 natija oynasi, server, testlar.
- **2026-11-21 (4)** — 2-topshiriq: A (6 element olib tashlandi), B ("Muammo", qoʻshimcha maʼlumotlar, niqoblar), C (qonunlarning rasmiy nomlari, muddat 28-moddadan), D (Ilova A bazasi, `resolveOrganizations`, 16 soha). Eski `videoGuide.js` oʻchirildi.
