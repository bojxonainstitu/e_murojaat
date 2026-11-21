/* =====================================================================
   E-murojat — unit testlar (brauzerda ishlaydi: tests/unit.html)
   Natija: window.__TEST_RESULTS = { passed, failed, failures[] }
   ===================================================================== */
(function () {
  "use strict";
  const results = { passed: 0, failed: 0, failures: [] };
  let group = "";
  function describe(name, fn) { group = name; fn(); }
  function eq(actual, expected, msg) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) results.passed++;
    else { results.failed++; results.failures.push(group + " › " + (msg || "") + " — kutilgan: " + JSON.stringify(expected) + ", olingan: " + JSON.stringify(actual)); }
  }
  function ok(cond, msg) { eq(!!cond, true, msg); }

  const UZ = window.EM_UZ, TR = window.EM_TRANSLIT, V = window.EM_VALID;
  const RES = window.EM_RESOLVE.resolveOrganizations;

  describe("uzNormalize", function () {
    ["'", "‘", "’", "ʻ", "ʼ", "`"].forEach(function (a) {
      eq(UZ.normalizeApostrophes("o" + a + "zbek"), "oʻzbek", "o + " + JSON.stringify(a));
      eq(UZ.normalizeApostrophes("g" + a + "isht"), "gʻisht", "g + " + JSON.stringify(a));
      eq(UZ.normalizeApostrophes("ma" + a + "lum"), "maʼlum", "tutuq + " + JSON.stringify(a));
    });
    eq(UZ.normalizeApostrophes("tog'"), "togʻ", "soʻz oxiridagi gʻ");
    eq(UZ.normalizeApostrophes("O'zbekiston"), "Oʻzbekiston", "bosh harf Oʻ");
    eq(UZ.normalizeApostrophes("e'tibor san'at"), "eʼtibor sanʼat", "bir nechta tutuq");
    eq(UZ.normalizeApostrophes("to'g'ri"), "toʻgʻri", "ketma-ket oʻ va gʻ");
    eq(UZ.normalizeApostrophes("'o'"), "'o'", "yakka o' (qoʻshtirnoq) oʻzgarmaydi");
    eq(UZ.normalizeSpacing("salom ,  dunyo  !"), "salom, dunyo!", "boʻshliq va tinish belgilari");
    eq(UZ.sentence("murojat matni"), "Murojat matni.", "gap shakli");
    eq(UZ.forMatch("Doʻkon"), "do'kon", "taqqoslash shakli");
  });

  describe("translit (lotin → kirill)", function () {
    const c = TR.uzLatnToCyrl;
    eq(c("shahar"), "шаҳар", "sh, h");
    eq(c("choy"), "чой", "ch, y");
    eq(c("oʻzbek"), "ўзбек", "oʻ va soʻz boshidagi o");
    eq(c("togʻ"), "тоғ", "gʻ");
    eq(c("tong"), "тонг", "ng");
    eq(c("ekin"), "экин", "soʻz boshidagi e → э");
    eq(c("telefon"), "телефон", "soʻz ichidagi e → е");
    eq(c("yer yoz yurt yana"), "ер ёз юрт яна", "ye/yo/yu/ya");
    eq(c("yoʻl"), "йўл", "yoʻ = й + ў");
    eq(c("xabar"), "хабар", "x → х");
    eq(c("qishloq"), "қишлоқ", "q → қ");
    eq(c("maʼlum"), "маълум", "tutuq → ъ");
    eq(c("Isʼhoq"), "Исҳоқ", "sʼh → сҳ");
    eq(c("ARIZA SHIKOYAT"), "АРИЗА ШИКОЯТ", "toʻliq katta harf");
    eq(c("Shahar"), "Шаҳар", "bosh harf Sh");
    eq(c("subyekt"), "субъект", "undosh + ye → ъе");
    eq(c("my.gov.uz va ism@pochta.uz"), "my.gov.uz ва ism@pochta.uz", "URL va e-pochta oʻgirilmaydi");
    eq(c("{fish} §m"), "{fish} §m", "oʻzgaruvchi va token oʻgirilmaydi");
    eq(c("ma'lum"), "маълум", "oddiy apostrof ham normallashadi");
  });

  describe("translit (kirill → lotin, qoraqalpoq)", function () {
    eq(TR.uzCyrlToLatn("Иш ҳақи"), "Ish haqi", "oʻzbek kirill → lotin");
    eq(TR.uzCyrlToLatn("ўзбек"), "oʻzbek", "ў → oʻ");
    eq(TR.kaaLatnToCyrl("Qaraqalpaqstan"), "Қарақалпақстан", "qoraqalpoq lotin → kirill");
    eq(TR.kaaLatnToCyrl("áwele"), "әўеле", "á, w");
    eq(TR.kaaCyrlToLatn("жумыс"), "jumıs", "qoraqalpoq kirill → lotin");
  });

  describe("telefon va e-pochta", function () {
    eq(V.formatPhone("901234567"), "+998 90 123 45 67", "maska");
    eq(V.formatPhone("+998901234567"), "+998 90 123 45 67", "998 bilan");
    ok(V.isValidPhone("+998 90 123 45 67"), "toʻgʻri raqam");
    ok(!V.isValidPhone("+998 90 123"), "qisqa raqam");
    ok(!V.isValidPhone(""), "boʻsh raqam");
    ok(!V.isValidPhone("+998 00 123 45 67"), "0 bilan boshlangan operator kodi");
    ok(V.isValidEmail("ism@pochta.uz"), "toʻgʻri e-pochta");
    ok(!V.isValidEmail("ism@pochta"), "domen yoʻq");
    ok(!V.isValidEmail("ism pochta.uz"), "@ yoʻq");
    ok(V.isValidFish("Aliyev Akmal"), "2 soʻz");
    ok(!V.isValidFish("Aliyev"), "1 soʻz");
    ok(V.isValidFish("Алиев Акмал"), "kirill F.I.Sh.");
    ok(V.isValidAddress("Navoiy koʻchasi, 5-uy"), "manzil raqam bilan");
    ok(!V.isValidAddress("Navoiy"), "raqamsiz manzil");
    const good = { fish: "Aliyev Akmal", regionId: "an", districtId: "an-asaka", address: "Navoiy 5", phone: "", email: "a@b.uz" };
    ok(V.validateProfile(good).ok, "toʻliq profil");
    eq(Object.keys(V.validateProfile(Object.assign({}, good, { email: "" })).errors), ["contact"], "aloqa yoʻq");
    eq(V.validateProfile(Object.assign({}, good, { phone: "+998 90" })).errors.phone, "err.phone", "notoʻgʻri telefon");
  });

  describe("validateAppeal", function () {
    const VA = window.EM_VALIDATE.validateAppeal;
    const profile = { fish: "Aliyev Akmal Karimovich", regionId: "an", districtId: "an-asaka", address: "Navoiy 5-uy", phone: "+998 90 123 45 67", email: "" };
    const analysis = { category: "labor", confidence: 0.8, documentType: "SHIKOYAT", requestedAction: "Ish haqini undirish", missingInfo: [] };
    const r1 = VA({ profile: profile, analysis: analysis, answers: {}, attachmentsCount: 2, text: "matn", history: [] });
    eq(r1.status, "green", "hammasi toʻliq → yashil");
    eq(r1.ok, r1.all, "barcha tekshiruvlar oʻtdi");
    const r2 = VA({ profile: Object.assign({}, profile, { fish: "Aliyev" }), analysis: analysis, answers: {}, attachmentsCount: 1, text: "matn", history: [] });
    eq(r2.status, "red", "F.I.Sh. chala → qizil");
    const r3 = VA({ profile: profile, analysis: Object.assign({}, analysis, { requestedAction: "" }), answers: { request: "Toʻlash" }, attachmentsCount: 1, text: "matn", history: [] });
    eq(r3.items.find(function (x) { return x.id === "request"; }).status, "pass", "talab aniqlashtirish javobidan olinadi");
    const r4 = VA({ profile: profile, analysis: analysis, answers: {}, attachmentsCount: 0, text: "matn", history: [] });
    eq(r4.status, "yellow", "ilova yoʻq → sariq");
    const h = window.EM_VALIDATE.textHash("matn");
    const r5 = VA({ profile: profile, analysis: analysis, answers: {}, attachmentsCount: 1, text: "matn", history: [{ hash: h, at: Date.now() - 3600 * 1000 }] });
    eq(r5.items.find(function (x) { return x.id === "duplicate"; }).status, "warn", "takroriy murojat aniqlanadi");
  });

  describe("lokal tasniflash (16 soha)", function () {
    eq(window.EM_CATEGORIES.IDS.length, 16, "16 ta soha");
    eq(window.EM_CATEGORIES.IDS[window.EM_CATEGORIES.IDS.length - 1], "other", "other — oxirgi (zaxira)");
    eq(window.EM_AI.classifyLocal("Kadastr yer uchastkasi hujjatini rasmiylashtirmayapti").category, "land_property", "yer va koʻchmas mulk");
    eq(window.EM_AI.classifyLocal("Sobiq turmush oʻrtogʻim aliment toʻlamayapti, ijro varaqasi bor").category, "enforcement", "aliment ijrosi");
    eq(window.EM_AI.classifyLocal("Maosh berilmayapti", "2026-yil 15-avgust; 3 500 000 soʻm").keyFacts, ["2026-yil 15-avgust", "3 500 000 soʻm"], "qoʻshimcha maʼlumot → keyFacts");
    const C = window.EM_AI.classifyLocal;
    eq(C("Ish joyimda 3 oydan beri maosh berishmayapti").category, "labor", "mehnat (lotin)");
    eq(C("Иш жойимда маош беришмаяпти, иш ҳақи йўқ").category, "labor", "mehnat (oʻzbek kirill)");
    eq(C("Уже 3 месяца не выплачивают зарплату").category, "labor", "mehnat (rus)");
    eq(C("My employer has not paid my salary").category, "labor", "mehnat (ingliz)");
    eq(C("Doʻkondan sotib olgan tovarim sifatsiz chiqdi").category, "consumer", "isteʼmolchi");
    eq(C("Uyimizda gaz yoʻq, svet ham oʻchib qoladi").category, "housing_utilities", "kommunal");
    eq(C("Ijaraga bergan uy egasi garov pulini qaytarmayapti").category, "rent", "ijara");
    eq(C("Bank kredit foizini oshirib yubordi").category, "banking_finance", "bank");
    eq(C("YHXX jarima yozdi, haydovchilik guvohnomasi").category, "traffic_transport", "yoʻl harakati");
    eq(C("Notarius meros hujjatini rasmiylashtirmayapti").category, "notary_inheritance", "notarius");
    eq(C("Pasport va fuqarolik masalasida migratsiya xizmati").category, "migration_citizenship", "migratsiya");
    eq(C("Pensiya va nafaqa toʻlanmayapti").category, "pension_social", "pensiya");
    eq(C("Poliklinikada shifokor qabul qilmadi").category, "healthcare", "sogʻliq");
    eq(C("Maktabda oʻqituvchi dars oʻtmayapti").category, "education", "taʼlim");
    eq(C("Soliq inspeksiyasi tadbirkor sifatida jarimaladi").category, "business_tax", "soliq");
    eq(C("Zavod tutuni havo ifloslanishiga sabab boʻlmoqda").category, "ecology", "ekologiya");
    eq(C("Salom, bir savolim bor edi").category, "other", "boshqa");
    eq(C("Maosh berilmayapti").documentType, "SHIKOYAT", "shikoyat turi");
    eq(C("Mahallaga bolalar maydonchasi qurish taklifi bor").documentType, "TAKLIF", "taklif turi");
    ok(C("Maosh berilmayapti").missingInfo.length > 0 && C("Maosh berilmayapti").missingInfo.length <= 3, "1–3 ta aniqlashtiruvchi savol");
  });

  describe("AI javob sxemasi", function () {
    const VC = window.EM_AI.validateClassification;
    const good = { category: "labor", secondaryCategories: [], documentType: "SHIKOYAT", summary: "x", keyFacts: [], requestedAction: "y", missingInfo: [], confidence: 0.7 };
    ok(VC(good).ok, "toʻgʻri javob");
    ok(!VC(Object.assign({}, good, { category: "hack" })).ok, "notoʻgʻri soha rad etiladi");
    ok(!VC(Object.assign({}, good, { missingInfo: ["a", "b", "c", "d"] })).ok, "3 tadan ortiq savol rad etiladi");
    ok(!VC(Object.assign({}, good, { confidence: 2 })).ok, "ishonch 0..1 dan tashqari");
    const red = window.EM_AI.redact("Men Aliyev Akmal, tel +998 90 123 45 67, a@b.uz", { fish: "Aliyev Akmal", address: "" });
    ok(red.indexOf("Aliyev") < 0 && red.indexOf("123 45 67") < 0 && red.indexOf("a@b.uz") < 0, "shaxsiy maʼlumotlar yashiriladi");
    const red2 = window.EM_AI.redact("tel 90 123 45 67, a@b.uz, pasport AA1234567, karta 8600 1234 5678 9012, JSHSHIR 12345678901234", null);
    ok(red2.indexOf("[TELEFON]") >= 0 && red2.indexOf("[EPOCHTA]") >= 0, "[TELEFON] va [EPOCHTA] niqoblari");
    eq((red2.match(/\[RAQAM\]/g) || []).length, 3, "pasport, karta va JSHSHIR → [RAQAM]");
    ok(!/\d{7}/.test(red2), "uzun raqamlar qolmagan");
  });

  describe("i18n lugʻatlari", function () {
    const base = Object.keys(window.EM_LOCALES["uz-Latn"]);
    ["uz-Cyrl", "ru", "kaa", "en"].forEach(function (L) {
      const keys = Object.keys(window.EM_LOCALES[L]);
      eq(base.filter(function (k) { return keys.indexOf(k) < 0; }), [], L + ": yetishmayotgan kalitlar yoʻq");
    });
    const cyr = Object.values(window.EM_LOCALES["uz-Cyrl"]).join(" ").replace(/<[^>]+>|https?:\S+|[\w.-]*\.(uz|env)\b|\{\w+\}|§\w|DOCX|PDF|MB|LexHakaton|MVP|ism@pochta\.uz/g, "");
    eq((cyr.match(/[A-Za-z]{2,}/g) || []), [], "uz-Cyrl lugʻatida lotin soʻzlar qolmagan");
    ok(!/E-murojaat/i.test(JSON.stringify(window.EM_LOCALES)), "eski brend shakli lugʻatlarda yoʻq");
    eq(window.EM_CONFIG.BRAND_NAME, "E-murojat", "brend nomi yagona konstantada");
    ok(window.EM_I18N.t("meta.title").indexOf("E-murojat") === 0, "§B tokeni brend nomiga almashadi");
    const all = JSON.stringify(window.EM_LOCALES);
    ok(!/Muammoyim|Muammoim|Муаммоим|Муаммойим/.test(all), "\"Muammoyim/Muammoim\" yoʻq");
    eq(["uz-Latn", "uz-Cyrl", "ru", "kaa", "en"].map(function (L) { return window.EM_LOCALES[L]["step.2"]; }), ["Muammo", "Муаммо", "Проблема", "Мәселе", "Problem"], "2-qadam nomi 5 tilda");
    ok(!/LexHakaton|MVP|xodimi/.test(all), "LexHakaton / MVP yozuvi lugʻatlarda yoʻq");
    ["land.badge", "land.demo", "video.title", "mode.local", "btn.aiInfo", "ai.title", "r1.unverified", "r3.lexHint", "r3.unverified"].forEach(function (k) {
      ok(["uz-Latn", "uz-Cyrl", "ru", "kaa", "en"].every(function (L) { return !(k in window.EM_LOCALES[L]); }), "olib tashlangan kalit: " + k);
    });
    ok(!/tasdiqlanmagan|tekshirilsin|тасдиқланмаган|текширилсин|требует проверки|to be verified|тексерилсин/i.test(all), "\"tasdiqlanmagan / tekshirilsin\" yozuvlari yoʻq");
  });

  describe("hujjat shabloni (7 boʻlim)", function () {
    window.EM_I18N.setLocale("uz-Latn");
    const paras = window.EM_DOC.build({
      profile: { fish: "Aliyev Akmal Karimovich", regionId: "an", districtId: "an-asaka", address: "Navoiy 5-uy", phone: "+998 90 123 45 67", email: "" },
      analysis: { source: "local", category: "labor", summary: "maosh berilmayapti", keyFacts: [], requestedAction: "Undirib berish", missingInfo: [] },
      answers: { date: "3 oydan beri" }, attachments: ["chek.jpg"], docType: "SHIKOYAT",
      org: RES({ categoryId: "labor", regionId: "an", districtId: "an-asaka", locale: "uz-Latn" }).primary,
      chain: RES({ categoryId: "labor", regionId: "an", districtId: "an-asaka", locale: "uz-Latn" }).chain
    });
    eq(Array.from(new Set(paras.map(function (p) { return p.section; }))), [1, 2, 3, 4, 5, 6, 7], "7 boʻlim tartibda");
    ok(paras.some(function (p) { return /1-ilova: chek\.jpg/.test(p.html); }), "ilova raqamlangan");
    ok(paras.some(function (p) { return /SHIKOYAT/.test(p.html); }), "hujjat turi sarlavhasi");
    eq(paras[0].html, "<b>Davlat mehnat inspeksiyasi hududiy boʻlinmalari (Asaka tumani) rahbariga</b>", "Kimga: quyi bosqich + hudud + rahbariga");
    const sec5 = paras.filter(function (p) { return p.section === 5; }).map(function (p) { return p.html; }).join(" ");
    ok(sec5.indexOf("Oʻzbekiston Respublikasining Mehnat kodeksi") >= 0, "5-boʻlim: qonun bazadan, rasmiy nom");
    ok(sec5.indexOf("“Jismoniy va yuridik shaxslarning murojaatlari toʻgʻrisida”gi Qonuni") >= 0, "5-boʻlim: murojaatlar qonunining rasmiy nomi aynan");
  });

  /* ---------- D: organlar bazasi va resolveOrganizations ---------- */
  describe("organizations_db yaxlitligi", function () {
    const O = window.EM_ORGS.ORGS;
    const ids = O.map(function (o) { return o.id; });
    eq(ids.length, new Set(ids).size, "barcha id noyob");
    ok(O.every(function (o) { return /^https:\/\/[^\s\[\]()]+$/.test(o.website) && o.website.indexOf("](") < 0; }), "saytlar https:// va Markdown belgilarisiz");
    ok(O.every(function (o) { return o.hierarchy.length > 0 && o.hierarchy.every(function (h) { return h.title && ["tuman", "viloyat", "respublika"].indexOf(h.level) >= 0; }); }), "hierarchy boʻsh emas, darajalar toʻgʻri");
    O.forEach(function (o) {
      const titles = o.hierarchy.map(function (h) { return h.title; });
      if (o.subordinateTo.indexOf("->") >= 0) eq(titles, o.subordinateTo.split("->").map(function (x) { return x.trim(); }), o.id + ": hierarchy = subordinateTo");
      else eq(titles[titles.length - 1], o.subordinateTo, o.id + ": yuqori bosqich = subordinateTo");
    });
    const LEVEL = { tuman: 0, viloyat: 1, respublika: 2 };
    ok(O.every(function (o) { return o.hierarchy.every(function (h, i, a) { return i === 0 || LEVEL[h.level] >= LEVEL[a[i - 1].level]; }); }), "zanjir tartibi quyi → yuqori");
    const strs = JSON.stringify(O.map(function (o) { return [o.name, o.category, o.district, o.subordinateTo, o.address, o.hierarchy]; }));
    ok(!/['‘’`]/.test(strs), "apostroflar yagona toʻplamda (ʻ U+02BB, ʼ U+02BC)");
    ok(O.every(function (o) { return Array.isArray(o.sources) && o.sources.length && typeof o.verified === "boolean" && Array.isArray(o.categoryIds) && o.categoryIds.length; }), "sources, verified, categoryIds bor");
    ok(O.every(function (o) { return o.categoryIds.every(function (c) { return window.EM_CATEGORIES.IDS.indexOf(c) >= 0; }); }), "categoryIds — mavjud sohalar");
    ok(window.EM_REGIONS.REGIONS.length === 14, "14 ta hudud");
  });

  describe("resolveOrganizations", function () {
    window.EM_CATEGORIES.IDS.forEach(function (c) {
      const r = RES({ categoryId: c, regionId: "an", districtId: "an-asaka", locale: "uz-Latn" });
      ok(r.primary && r.primary.id && r.chain.length > 0, "natija bor: " + c);
    });
    ["rent", "education"].forEach(function (c) {
      const r = RES({ categoryId: c, regionId: "an", districtId: "an-asaka", locale: "uz-Latn" });
      eq([r.primary.id, r.isFallback], ["presidential_portal", true], c + " → zaxira");
    });
    const unknown = RES({ categoryId: "nonexistent", regionId: "zz", districtId: "zz-1", locale: "uz-Latn" });
    eq([unknown.primary.id, unknown.isFallback], ["presidential_portal", true], "nomaʼlum soha/hudud → zaxira");
    const pr = RES({ categoryId: "enforcement", regionId: "an", districtId: "an-asaka", locale: "uz-Latn" });
    eq(pr.chain.map(function (c) { return c.role; }), ["quyi", "orta", "yuqori"], "zanjir rollari quyi → oʻrta → yuqori");
    eq(pr.chain[0].locality, "Asaka tumani", "tuman bosqichiga hudud qoʻshiladi");
    eq(pr.chain[1].locality, "Andijon viloyati", "viloyat bosqichiga viloyat qoʻshiladi");
    eq(pr.chain[2].locality, undefined, "respublika bosqichiga hudud qoʻshilmaydi");
    eq(pr.usedLevel, "respublika", "hozircha baza respublika darajasida");
    eq(RES({ categoryId: "housing_utilities", regionId: "an", districtId: "an-asaka", text: "Uyimizda 3 kundan beri svet yoʻq" }).primary.id, "energetika", "svet → Energetika vazirligi");
    const k = RES({ categoryId: "housing_utilities", regionId: "an", districtId: "an-asaka", text: "Issiq suv kelmayapti" });
    eq([k.primary.id, k.others.map(function (o) { return o.id; })], ["kommunal", ["energetika"]], "suv → kommunal, others = energetika");
    eq(RES({ categoryId: "consumer" }).primary.id, "raqobat", "isteʼmolchi: davlat organi birinchi");
    eq(RES({ categoryId: "enforcement", regionId: "an", districtId: "an-asaka", locale: "uz-Cyrl" }).chain[0].title, "Туман МИБ", "uz-Cyrl: zanjir kirillda");
  });

  describe("legal_basis_db (snapshot)", function () {
    const LAWS = window.EM_LAWS;
    // Rasmiy nomlar aynan saqlanishi kerak — oʻzgarsa test yiqiladi (lex.uz, 2026-11-21)
    const SNAP = {
      appeals: "Oʻzbekiston Respublikasining “Jismoniy va yuridik shaxslarning murojaatlari toʻgʻrisida”gi Qonuni",
      labor_code: "Oʻzbekiston Respublikasining Mehnat kodeksi",
      civil_code: "Oʻzbekiston Respublikasining Fuqarolik kodeksi (birinchi qism)",
      civil_code_2: "Oʻzbekiston Respublikasining Fuqarolik kodeksi (ikkinchi qism)",
      consumer: "Oʻzbekiston Respublikasining “Isteʼmolchilarning huquqlarini himoya qilish toʻgʻrisida”gi Qonuni",
      banks: "Oʻzbekiston Respublikasining “Banklar va bank faoliyati toʻgʻrisida”gi Qonuni",
      traffic: "Oʻzbekiston Respublikasining “Yoʻl harakati toʻgʻrisida”gi Qonuni",
      admin_code: "Oʻzbekiston Respublikasining Maʼmuriy javobgarlik toʻgʻrisidagi kodeksi",
      notary: "Oʻzbekiston Respublikasining “Notariat toʻgʻrisida”gi Qonuni",
      citizenship: "Oʻzbekiston Respublikasining “Oʻzbekiston Respublikasining fuqaroligi toʻgʻrisida”gi Qonuni",
      pension: "Oʻzbekiston Respublikasining “Fuqarolarning davlat pensiya taʼminoti toʻgʻrisida”gi Qonuni",
      health: "Oʻzbekiston Respublikasining “Fuqarolar sogʻligʻini saqlash toʻgʻrisida”gi Qonuni",
      education: "Oʻzbekiston Respublikasining “Taʼlim toʻgʻrisida”gi Qonuni",
      tax_code: "Oʻzbekiston Respublikasining Soliq kodeksi",
      business: "Oʻzbekiston Respublikasining “Tadbirkorlik faoliyati erkinligining kafolatlari toʻgʻrisida”gi Qonuni",
      nature: "Oʻzbekiston Respublikasining “Tabiatni muhofaza qilish toʻgʻrisida”gi Qonuni",
      land_code: "Oʻzbekiston Respublikasining Yer kodeksi",
      enforcement: "Oʻzbekiston Respublikasining “Sud hujjatlari va boshqa organlar hujjatlarini ijro etish toʻgʻrisida”gi Qonuni"
    };
    const got = {};
    LAWS.LIST.forEach(function (l) { got[l.id] = l.title["uz-Latn"]; });
    eq(got, SNAP, "qonun nomlari oʻzgarmagan");
    ok(LAWS.LIST.every(function (l) { return /^https:\/\/lex\.uz\/docs\/-\d+$/.test(l.url) && l.title["uz-Cyrl"]; }), "har bir qonun: lex.uz havolasi va uz-Cyrl nomi");
    eq(LAWS.pickTitle(LAWS.appeals, "ru"), LAWS.appeals.title["uz-Cyrl"], "ru: rasmiy tarjima yoʻq → uz-Cyrl rasmiy nomi");
    eq(LAWS.pickTitle(LAWS.appeals, "en"), SNAP.appeals, "en: uz-Latn rasmiy nomi");
    eq([LAWS.DEADLINE.article, LAWS.DEADLINE.standardDays, LAWS.DEADLINE.extendedMonths], ["28-modda", 15, 1], "javob muddati — 28-modda");
    window.EM_CATEGORIES.IDS.forEach(function (c) {
      ok(LAWS.forCategory(c).every(function (l) { return !!LAWS.LAWS[l.id]; }), "soha qonunlari bazada: " + c);
    });
    eq(LAWS.forCategory("*").map(function (l) { return l.id; }), ["appeals"], "umumiy qonun — murojaatlar qonuni");
    ok(window.EM_UZ.uzNormalize(SNAP.appeals) === SNAP.appeals, "uzNormalize rasmiy nomni oʻzgartirmaydi");
    eq([LAWS.actNo(LAWS.appeals, "uz-Cyrl"), LAWS.actNo(LAWS.LAWS.pension, "uz-Cyrl"), LAWS.actNo(LAWS.appeals, "en")], ["ЎРҚ-445", "938-XII", "OʻRQ-445"], "hujjat raqami yozuvga mos, rim raqamlari oʻzgarmaydi");
  });

  window.__TEST_RESULTS = results;
  const out = document.getElementById("out");
  if (out) {
    out.innerHTML = "<h1>" + (results.failed ? "❌" : "✅") + " " + results.passed + " oʻtdi, " + results.failed + " xato</h1>" +
      (results.failures.length ? "<ul>" + results.failures.map(function (f) { return "<li>" + window.EM_DOC.esc(f) + "</li>"; }).join("") + "</ul>" : "");
  }
})();
