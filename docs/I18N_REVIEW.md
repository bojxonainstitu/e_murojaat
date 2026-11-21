# Tarjimalarni inson tomonidan tekshirish roʻyxati

## 1. Qoraqalpoq tili (`ҚҚ`, `kaa`) — **toʻliq tekshiruv SHART**
- Manba: `i18n-src/kaa.latn.json` (lotin). Undan `scripts/gen_i18n.py` orqali `js/i18n/kaa.js` (kirill) hosil qilinadi.
- Butun lugʻat (327 kalit) ona tili egasi tomonidan koʻrib chiqilmagan — `// REVIEW` belgisi fayl boshida turibdi.
- Alohida eʼtibor talab qiladigan joylar:
  - Lotin → kirill qoidalari (`á→ә`, `ó→ө`, `ú→ү`, `ń→ң`, `ǵ→ғ`, `ı→ы`, `w→ў`, soʻz boshidagi `I→И`) — ayniqsa `е/э` va katta harflar.
  - `Мәселенизди` kabi soʻzlarda `ң` / `н` farqi (manbada ayrim joylarda `n` yozilgan boʻlishi mumkin).
  - Rasmiy uslubdagi iboralar: `doc.*` (hujjat shabloni), `va.*` (tekshiruv), `r5.repeatText`.
  - Organ nomlari, ierarxiya bosqichlari, qonun nomlari kaa uchun **oʻzbekcha rasmiy nomdan kirillga oʻgiriladi** (qoraqalpoqcha rasmiy nom yoʻq — tarjima qilinmadi).
- **REVIEW — 2-topshiriqda qoʻshilgan kalitlar** (`scripts/patch_i18n_v2.py` → `SET["kaa"]`): `step.2` (`Másele` → `Мәселе`), `comp.extra`, `ph.extra`, `comp.extraHint`, `t.analyzeErr`, `r1.levelOf.*`, `r1.contacts`, `r1.chain`, `r1.step.*` (`Tómengi / Orta / Joqarı basqısh`), `r1.localHint`, `r1.others`, `r1.fallback`, `r1.phone` (`Isenim telefonı`), `r5.std/ext/dayType/basis/escUp`, `doc.toHead` (`… basshısına`), `law.*` (`{n}-statya`, `{d} j.`), `cat/mavzu/req/why.land_property`, `cat/mavzu/req/why.enforcement`.
  - Demo matnlari: `js/data/demos.js` → `kaa`.

## 2. Oʻzbek kirill (`ЎЗ`, `uz-Cyrl`)
- `js/i18n/uz-Cyrl.js` lotin lugʻatidan qoidaviy oʻgirish va qoʻlda tuzatishlar bilan hosil qilingan. Tekshirish tavsiya etiladi:
  - `е/э` (soʻz boshida `э`), `ъ` (`субъект`), qisqartmalar (`СИ` = sunʼiy intellekt, `МЧЖ`).
  - Rus tilidan oʻzlashgan soʻzlar (`инспекция`, `квитанция`, `компенсация`, `колл-марказ`) `POST_FIX` qoidalari bilan tuzatilgan — boshqa shunday soʻzlar qolmaganini tekshiring.
- Maʼlumotlar bazasi matnlari (organlar, qonunlar mazmuni, hudud nomlari) ish vaqtida `js/lib/translit.js` bilan oʻgiriladi (zaxira). Rasmiy kirill nomlari bilan solishtirish kerak.

## 3. Rus va ingliz tillari
- **Qonun nomlari:** lex.uz dan rus tilidagi rasmiy nomlarni avtomatik olib boʻlmadi, oʻzimiz tarjima qilmadik. Hozir `ru` (va `kaa`) da **uz-Cyrl rasmiy nomi**, `en` da **uz-Latn rasmiy nomi** koʻrsatiladi (`EM_LAWS.pickTitle`). Rasmiy ruscha nomlar lex.uz dan olinsa, `legal_basis_db.js` dagi `title.ru` ga yozing — kod oʻzi ishlatadi.
- **Organ nomlari** `ru`/`en` da foydalanuvchi bazasidagi oʻzbekcha (lotin) nomda koʻrsatiladi; rasmiy tarjima boʻlsa `organizations_db.js` → `nameI18n` ga qoʻshing.
- `ru`: hujjatdagi "Согласно акту законодательства (…)" va "Руководителю: …" iboralari koʻrib chiqilsin.
- Tuman nomlarining ruscha shakli oʻzbekchadan oʻgirilgan (`Асака район`, `Чилонзор район`) — rasmiy ruscha nomlar (`Чиланзарский район`) bilan almashtirish tavsiya etiladi.

## 4. Glossariy
- `js/i18n/glossary.js` — `murojat` / `мурожат` / `обращение` / `мүрәжат` / `appeal`. Atama oʻzgarsa, faqat shu fayl va `scripts/gen_i18n.py` qayta ishga tushiriladi.
