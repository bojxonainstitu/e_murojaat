# E-murojat — rasmiy murojat tayyorlash yordamchisi (LexHakaton MVP)

Fuqaro muammosini oddiy soʻzlar bilan yozadi yoki ovoz bilan aytadi. **E-murojat** 3 qadamda yordam beradi:

1. **Maʼlumotlarim** — F.I.Sh., viloyat → tuman/shahar, manzil, telefon (+998) yoki e-pochta.
2. **Muammo** — AI chat qatoriga oʻxshash maydon: matn, ixtiyoriy "Qoʻshimcha maʼlumotlar" (sana, summa, shartnoma raqami), 🎤 ovoz (avval matnga oʻgiriladi va tasdiqlanadi), 📎 dalil fayllari. Kerak boʻlsa 1–3 ta aniqlashtiruvchi savol beriladi.
3. **Natija** — 5 ta oyna: organ (toʻliq nomi, boshqaruv tuzilmasi quyi → yuqori, manzil, ishonch telefoni, sayt) · shakl va ilovalar · qonunchilik (lex.uz dagi rasmiy nomi bilan) va rad etilishdan himoya · tayyor hujjat (nusxa, DOCX, chop etish/PDF) · javob muddati va keyingi qadamlar.

Tillar: **OʻZ** (lotin), **ЎЗ** (kirill), **РУ**, **ҚҚ** (qoraqalpoq, kirill), **EN**.

## Ishga tushirish

### Server bilan (tavsiya etiladi — AI va STT ulash mumkin)
```bash
python -m pip install -r server/requirements.txt
```
```bash
python server/server.py
```
Brauzerda `http://127.0.0.1:8765` ni oching. Kalit kiritilmasa, sayt **lokal rejimda** toʻliq ishlaydi.

### Serversiz
`index.html` ni brauzerda oching. Sayt lokal rejimda ishlaydi, AI va ovoz yoʻq. Internetsiz ham ishlaydi (`vendor/docx.umd.js`).

## `.env` (faqat serverda)
`server/.env.example` ni loyiha ildizidagi `.env` ga nusxalang:

| Oʻzgaruvchi | Vazifasi |
|---|---|
| `ANTHROPIC_API_KEY` | AI tasniflash kaliti. Brauzerga hech qachon berilmaydi |
| `AI_PROVIDER`, `AI_MODEL` | Provayder (`anthropic`) va model (`claude-opus-5-5`) |
| `STT_PROVIDER`, `STT_API_KEY` | Nutqni matnga oʻgirish provayderi. Hozircha stub, ulash joyi: `server/stt.py` |
| `STT_DEMO_TEXT` | Faqat namoyish uchun: ovoz yozilgandan keyin shu matn qaytadi |
| `HOST`, `PORT` | Server manzili (standart `127.0.0.1:8765`) |

**Maxfiylik:** AIga faqat muammo matni yuboriladi. F.I.Sh., manzil, telefon va e-pochta matndan yashiriladi va hujjatga faqat brauzerda qoʻyiladi. Fayllar hech qayerga yuborilmaydi. API'da rate-limit bor, soʻrov tanasi logga yozilmaydi.

## Testlar
```bash
python server/test_server.py
```
```bash
python tests/e2e.py
```
Brauzer unit testlari: server ishlab turganda `http://127.0.0.1:8765/tests/unit.html` ni oching.

e2e uchun avval Playwright'ni oʻrnating:
```bash
python -m pip install playwright
```
```bash
python -m playwright install chromium
```

## Tuzilma
```
index.html                 titul varaq (motion effektlar) va ishchi oyna
css/style.css, landing.css dizayn tizimi (tokenlar :root da), titul varaq
css/flow.css               qadamlar, dialog, kiritish qatori, natija oynalari, mobil, print
js/config.js               BRAND_NAME, tillar, cheklovlar
js/i18n/                   uz-Latn, uz-Cyrl, ru, kaa, en lugʻatlari, glossary.js, i18n.js
js/lib/                    uzNormalize, translit, validators, validateAppeal, docTemplate, docExport,
                           resolveOrganizations (soha + hudud → organ, zanjir quyi → yuqori)
js/data/                   regions, categories (16 soha), organizations_db, legal_basis_db, demos
js/ai/                     client.js (tasniflash, niqoblash), stt.js
js/components/             languageSwitcher, applicantDialog, appealComposer,
                           voiceInput, attachmentList, resultPanels
js/app.js                  holat mashinasi: profil → kiritish → aniqlashtirish → natija
server/                    server.py, ai_provider.py, classify.py, stt.py, test_server.py
scripts/gen_i18n.py        kirill lugʻatlarini hosil qilish
scripts/patch_i18n_v2.py   2-topshiriq kalitlarini manba lugʻatlarga qoʻshish (takror ishlatsa boʻladi)
docs/                      PLAN, PLAN_2, DECISIONS, I18N_REVIEW, MOBILE_WEBVIEW
```

## Maʼlumotlarni yangilash
- **Yangi organ:** `js/data/organizations_db.js` → `ORGANIZATIONS_DATA` ga bitta yozuv qoʻshing (`id`, `name`, `level`, `regionId`/`districtId` — hududiy boʻlsa, `categoryIds`, `subordinateTo` + `hierarchy`, `address`, `phone`, `website`, `sources`, `verified`). Viloyat/tuman yozuvi qoʻshilsa, `resolveOrganizations` uni oʻzi afzal koʻradi.
- **Qonun moddasi:** `js/data/legal_basis_db.js` → `articles: [{ ref: "10-modda", note: "…" }]`, `verifiedAt: "YYYY-MM-DD"`. Rasmiy nomni aynan yozing; `tests/unit.js` dagi snapshotni ham yangilang.
- **Matn yoki tarjima:** `js/i18n/uz-Latn.js`, `ru.js`, `en.js`, `i18n-src/kaa.latn.json`. Keyin kirill lugʻatlarini qayta hosil qiling:
  ```bash
  python -I scripts/gen_i18n.py
  ```

## Huquqiy ogohlantirish
Qonun nomlari va murojaatlar qonunining muddatlari lex.uz da tekshirilgan (2026-11-21). Organlar bazasidagi manzil va telefonlarning aksariyati foydalanuvchi bergan qiymatlar boʻlib, rasmiy manbada alohida tasdiqlanmagan (`verified: false` — faqat ichki belgi, interfeysda koʻrsatilmaydi). Yuborishdan oldin [lex.uz](https://lex.uz) va [my.gov.uz](https://my.gov.uz) da tekshiring. Bu huquqiy maslahat emas.
