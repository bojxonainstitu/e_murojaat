/* =====================================================================
   organizations_db — vakolatli organlar bazasi
   Manba: foydalanuvchi bergan ORGANIZATIONS_DATA (2-topshiriq, Ilova A).
   Yangi organ qoʻshish = ORGANIZATIONS_DATA ga bitta yozuv qoʻshish
   (viloyat/tuman yozuvi qoʻshilsa, resolveOrganizations uni avtomatik afzal koʻradi).

   Tip (TypeScript koʻrinishida):
     type OrgLevel = "tuman" | "viloyat" | "respublika";
     interface HierarchyStep { title: string; level: OrgLevel }       // quyi → yuqori
     interface OrganizationInfo {
       // foydalanuvchi bazasidagi maydonlar
       id, category, level, region, district, name, subordinateTo, address, website, phone: string;
       // qoʻshilgan
       categoryIds: CategoryId[]; hierarchy: HierarchyStep[];
       nameI18n?: Partial<Record<Locale, string>>; regionId?; districtId?;
       responsibleRole?: string;              // lavozim nomi, shaxs ismi emas
       sources: { title, url }[]; verified: boolean; lastVerified?: string;  // ISO sana
       kw?: string[];                         // bir soha ichida organni tanlash uchun (ixtiyoriy)
     }

   • Qiymatlar foydalanuvchi bazasidan AYNAN olingan; faqat apostroflar yagona
     toʻplamga keltirildi (oʻ/gʻ — U+02BB, tutuq — U+02BC) va saytlardagi Markdown olib tashlandi.
   • 2026-11-21 dagi tekshiruvda topilgan farqlar (eski → yangi) docs/DECISIONS.md da (#27).
   • verified: true — faqat nom, manzil, telefon va sayt rasmiy saytda tasdiqlangan yozuvlar.
   ===================================================================== */
window.EM_ORGS = (function () {
  "use strict";
  const TR = window.EM_TRANSLIT;

  function steps(list) { return list.map(function (x) { return { title: x[0], level: x[1] }; }); }

  const ORGANIZATIONS_DATA = [
    {
      id: "presidential_portal",
      category: "Barcha sohalar (Yuqori nazorat)",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Barcha tuman va shaharlardagi Xalq qabulxonalari",
      name: "Oʻzbekiston Respublikasi Prezidentining Virtual qabulxonasi",
      subordinateTo: "Oʻzbekiston Respublikasi Prezidenti Administratsiyasi",
      address: "Toshkent shahri (hamda barcha tuman/shahar Xalq qabulxonalari)",
      website: "https://pm.gov.uz",
      phone: "1000",
      categoryIds: ["other"],
      hierarchy: steps([["Tuman (shahar) Xalq qabulxonasi", "tuman"], ["Oʻzbekiston Respublikasi Prezidentining Virtual qabulxonasi", "respublika"], ["Oʻzbekiston Respublikasi Prezidenti Administratsiyasi", "respublika"]]),
      sources: [{ title: "pm.gov.uz", url: "https://pm.gov.uz" }],
      verified: false
    },
    {
      id: "prokuratura",
      category: "Qonun ustuvorligi va shikoyatlar",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar prokuraturalari",
      name: "Oʻzbekiston Respublikasi Bosh prokuraturasi",
      subordinateTo: "Tuman prokuraturasi -> Viloyat prokuraturasi -> Bosh prokuratura",
      address: "Toshkent shahri, Yahyo Gʻulomov koʻchasi, 66-uy",
      website: "https://prokuratura.uz",
      phone: "1007",
      categoryIds: ["other"],
      hierarchy: steps([["Tuman prokuraturasi", "tuman"], ["Viloyat prokuraturasi", "viloyat"], ["Bosh prokuratura", "respublika"]]),
      sources: [{ title: "prokuratura.uz", url: "https://prokuratura.uz" }],
      verified: false
    },
    {
      id: "adliya",
      category: "Notarius, FHDYo va Davlat xizmatlari",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar adliya boʻlimlari va DXM",
      name: "Oʻzbekiston Respublikasi Adliya vazirligi",
      subordinateTo: "Tuman adliya boʻlimi -> Viloyat adliya boshqarmasi -> Adliya vazirligi",
      address: "Toshkent shahri, Sayilgoh koʻchasi, 5-uy",
      website: "https://gov.uz/adliya",
      phone: "1008 / +998 (71) 207-04-43",
      categoryIds: ["notary_inheritance"],
      hierarchy: steps([["Tuman adliya boʻlimi", "tuman"], ["Viloyat adliya boshqarmasi", "viloyat"], ["Adliya vazirligi", "respublika"]]),
      sources: [{ title: "gov.uz/adliya", url: "https://gov.uz/oz/adliya" }],
      verified: false
    },
    {
      id: "pensiya",
      category: "Pensiya va ijtimoiy nafaqalar",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar Pensiya jamgʻarmasi boʻlimlari",
      // Rasmiy saytdagi shakl: "budjetdan" (foydalanuvchi bazasida: "byudjetdan") — DECISIONS #27
      name: "Iqtisodiyot va moliya vazirligi huzuridagi budjetdan tashqari Pensiya jamgʻarmasi",
      subordinateTo: "Tuman Pensiya boʻlimi -> Viloyat boshqarmasi -> Pensiya jamgʻarmasi",
      address: "Toshkent shahri, Istiqlol koʻchasi, 29-uy",
      website: "https://gov.uz/pj",
      phone: "+998 (71) 202-12-71 (707)",
      categoryIds: ["pension_social"],
      hierarchy: steps([["Tuman Pensiya boʻlimi", "tuman"], ["Viloyat boshqarmasi", "viloyat"], ["Pensiya jamgʻarmasi", "respublika"]]),
      sources: [{ title: "gov.uz/pj", url: "https://gov.uz/oz/pj" }],
      verified: false
    },
    {
      id: "mehnat",
      category: "Mehnat va ish haqi",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar Kambagʻallikni qisqartirish va bandlik boʻlimlari",
      name: "Oʻzbekiston Respublikasi Kambagʻallikni qisqartirish va bandlik vazirligi",
      subordinateTo: "Davlat mehnat inspeksiyasi hududiy boʻlinmalari -> Vazirlik",
      address: "Toshkent shahri, Mirobod koʻchasi, 15-uy",
      website: "https://gov.uz/bv",
      phone: "+998 (71) 203-01-30 / +998 (71) 200-06-00",
      categoryIds: ["labor"],
      hierarchy: steps([["Davlat mehnat inspeksiyasi hududiy boʻlinmalari", "tuman"], ["Vazirlik", "respublika"]]),
      sources: [{ title: "gov.uz/bv", url: "https://gov.uz/oz/bv" }],
      verified: false
    },
    {
      id: "kommunal",
      category: "Uy-joy va kommunal xizmatlar",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar uy-joy kommunal xizmat koʻrsatish boʻlimlari",
      name: "Oʻzbekiston Respublikasi Qurilish va uy-joy kommunal xoʻjaligi vazirligi",
      subordinateTo: "BSK / Tuman boʻlimi -> Viloyat boshqarmasi -> Vazirlik",
      address: "Toshkent shahri, Mirobod tumani, Oybek koʻchasi, 26/1-uy",
      website: "https://gov.uz/mc",
      phone: "1298 / +998 (71) 210-11-04",
      categoryIds: ["housing_utilities"],
      hierarchy: steps([["BSK / Tuman boʻlimi", "tuman"], ["Viloyat boshqarmasi", "viloyat"], ["Vazirlik", "respublika"]]),
      sources: [{ title: "gov.uz/mc", url: "https://gov.uz/oz/mc" }],
      verified: false,
      kw: ["suv", "isitish", "issiq", "kanalizatsiya", "lift", "chiqindi", "bsk", "вод", "отоплен", "канализ", "лифт", "water", "heating", "sewage", "suw"]
    },
    {
      id: "energetika",
      category: "Elektr energiyasi va tabiiy gaz",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman elektr taʼminoti (ETK) va Hududgaz filiallari",
      name: "Oʻzbekiston Respublikasi Energetika vazirligi",
      subordinateTo: "Tuman ETK / Tumangaz -> Hududiy filial -> Energetika vazirligi",
      address: "Toshkent shahri, Istiqlol koʻchasi, 21-uy",
      website: "https://gov.uz/minenergy",
      phone: "+998 (71) 231-16-61 / 1154 (Elektr) / 1104 (Gaz)",
      categoryIds: ["housing_utilities"],
      hierarchy: steps([["Tuman ETK / Tumangaz", "tuman"], ["Hududiy filial", "viloyat"], ["Energetika vazirligi", "respublika"]]),
      sources: [{ title: "gov.uz/minenergy", url: "https://gov.uz/oz/minenergy" }],
      verified: false,
      kw: ["svet", "elektr", "gaz", "tok yo'q", "tok o'ch", "hisoblagich", "свет", "электр", "газ", "electricity", "power cut", "gas", "jaqtılıq"]
    },
    {
      id: "bank",
      category: "Bank, kredit va moliya",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tijorat banklarining hududiy filiallari va Markaziy bank boshqarmalari",
      name: "Oʻzbekiston Respublikasi Markaziy banki (Bank xizmatlari isteʼmolchilarining huquqlarini himoya qilish xizmati)",
      subordinateTo: "Tijorat banki filiali -> Bank Bosh ofisi -> Markaziy bank",
      address: "Toshkent shahri, Islom Karimov koʻchasi, 6-uy",
      website: "https://cbu.uz",
      phone: "+998 (71) 212-60-29 / +998 (71) 200-00-44",
      categoryIds: ["banking_finance"],
      hierarchy: steps([["Tijorat banki filiali", "tuman"], ["Bank Bosh ofisi", "respublika"], ["Markaziy bank", "respublika"]]),
      sources: [{ title: "cbu.uz", url: "https://cbu.uz" }],
      verified: false
    },
    {
      // Foydalanuvchi bazasidagi "istemolchi" yozuvidan ajratilgan davlat organi (DECISIONS #27).
      // Nom, manzil, telefon va sayt qoʻmitaning rasmiy saytidan olingan.
      id: "raqobat",
      category: "Isteʼmolchilar huquqlari va savdo",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Qoʻmitaning hududiy boshqarmalari",
      name: "Oʻzbekiston Respublikasi Raqobatni rivojlantirish va isteʼmolchilar huquqlarini himoya qilish qoʻmitasi",
      subordinateTo: "Hududiy boshqarma -> Raqobatni rivojlantirish va isteʼmolchilar huquqlarini himoya qilish qoʻmitasi",
      address: "Toshkent shahri, Labzak koʻchasi, 3",
      website: "https://raqobat.gov.uz",
      phone: "1159 / +998 (71) 207-48-00 / +998 (71) 207-47-00",
      categoryIds: ["consumer"],
      hierarchy: steps([["Hududiy boshqarma", "viloyat"], ["Raqobatni rivojlantirish va isteʼmolchilar huquqlarini himoya qilish qoʻmitasi", "respublika"]]),
      sources: [{ title: "raqobat.gov.uz", url: "https://raqobat.gov.uz" }],
      verified: true,
      lastVerified: "2026-11-21"
    },
    {
      // Jamoat birlashmasi. Manzil foydalanuvchi bazasida qoʻmita manzili bilan bir xil edi
      // (Labzak koʻchasi, 3 — qoʻmitaning rasmiy manzili), shuning uchun bu yerda boʻsh qoldirildi.
      id: "istemolchi",
      category: "Isteʼmolchilar huquqlari va savdo",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar isteʼmolchilar huquqlarini himoya qilish jamiyatlari",
      name: "Oʻzbekiston isteʼmolchilar huquqlarini himoya qilish jamiyatlari federatsiyasi",
      subordinateTo: "Tuman / Shahar isteʼmolchilar huquqlarini himoya qilish jamiyati -> Oʻzbekiston isteʼmolchilar huquqlarini himoya qilish jamiyatlari federatsiyasi",
      address: "",
      website: "https://istemol.uz",
      phone: "1091",
      categoryIds: ["consumer"],
      hierarchy: steps([["Tuman / Shahar isteʼmolchilar huquqlarini himoya qilish jamiyati", "tuman"], ["Oʻzbekiston isteʼmolchilar huquqlarini himoya qilish jamiyatlari federatsiyasi", "respublika"]]),
      sources: [{ title: "istemol.uz", url: "https://istemol.uz" }],
      verified: false
    },
    {
      id: "soliq",
      category: "Soliq, keshbek va tadbirkorlik",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar davlat soliq inspeksiyalari",
      name: "Oʻzbekiston Respublikasi Soliq qoʻmitasi",
      subordinateTo: "Tuman DSI -> Viloyat DSB -> Soliq qoʻmitasi",
      address: "Toshkent shahri, Abdulla Qodiriy koʻchasi, 13A-uy",
      website: "https://gov.uz/soliq",
      phone: "1198 / +998 (71) 202-32-82",
      categoryIds: ["business_tax"],
      hierarchy: steps([["Tuman DSI", "tuman"], ["Viloyat DSB", "viloyat"], ["Soliq qoʻmitasi", "respublika"]]),
      sources: [{ title: "gov.uz/soliq", url: "https://gov.uz/oz/soliq" }],
      verified: false
    },
    {
      id: "kadastr",
      category: "Yer va koʻchmas mulk kadastri",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar Kadastr palatasi filiallari",
      name: "Iqtisodiyot va moliya vazirligi huzuridagi Kadastr agentligi",
      subordinateTo: "Tuman filiali -> Viloyat boshqarmasi -> Kadastr agentligi",
      address: "Toshkent shahri, Chilonzor tumani, Choʻponota koʻchasi, 6-uy",
      website: "https://gov.uz/kadastr",
      phone: "1097",
      categoryIds: ["land_property"],
      hierarchy: steps([["Tuman filiali", "tuman"], ["Viloyat boshqarmasi", "viloyat"], ["Kadastr agentligi", "respublika"]]),
      sources: [{ title: "gov.uz/kadastr", url: "https://gov.uz/oz/kadastr" }],
      verified: false
    },
    {
      id: "iiv_yhxx",
      category: "Yoʻl harakati, pasport va huquq-tartibot",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar IIB, YHXX va Migratsiya boʻlinmalari",
      name: "Oʻzbekiston Respublikasi Ichki ishlar vazirligi",
      subordinateTo: "Tuman IIB -> Viloyat IIBB -> Ichki ishlar vazirligi",
      address: "Toshkent shahri, Yunus Rajabiy koʻchasi, 1-uy",
      website: "https://gov.uz/iiv",
      phone: "1102",
      categoryIds: ["traffic_transport", "migration_citizenship"],
      hierarchy: steps([["Tuman IIB", "tuman"], ["Viloyat IIBB", "viloyat"], ["Ichki ishlar vazirligi", "respublika"]]),
      sources: [{ title: "gov.uz/iiv", url: "https://gov.uz/oz/iiv" }],
      verified: false
    },
    {
      id: "migratsiya",
      category: "Tashqi mehnat migratsiyasi",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Viloyat hududiy filiallari",
      name: "Oʻzbekiston Respublikasi Vazirlar Mahkamasi huzuridagi Migratsiya agentligi",
      subordinateTo: "Viloyat filiali -> Migratsiya agentligi -> Vazirlar Mahkamasi",
      address: "Toshkent shahri, Olmazor tumani, Qamarniso koʻchasi, 1-uy",
      website: "https://gov.uz/migration",
      phone: "+998 (71) 202-33-55",
      categoryIds: ["migration_citizenship"],
      hierarchy: steps([["Viloyat filiali", "viloyat"], ["Migratsiya agentligi", "respublika"], ["Vazirlar Mahkamasi", "respublika"]]),
      sources: [{ title: "gov.uz/migration", url: "https://gov.uz/oz/migration" }],
      verified: false,
      kw: ["chet elda", "xorijda", "xorijga", "mehnat migra", "ishga ketish", "за рубеж", "трудов мигра", "abroad", "labour migration", "labor migration", "shet elde"]
    },
    {
      id: "mib",
      category: "Aliment va sud qarorlari ijrosi",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar Majburiy ijro byurosi boʻlimlari",
      name: "Bosh prokuratura huzuridagi Majburiy ijro byurosi",
      subordinateTo: "Tuman MIB -> Viloyat MIB -> Bosh prokuratura",
      address: "Toshkent shahri, Yunusobod tumani, Xalqobod 3-tor koʻchasi, 2A-uy",
      website: "https://mib.uz",
      phone: "1107",
      categoryIds: ["enforcement"],
      hierarchy: steps([["Tuman MIB", "tuman"], ["Viloyat MIB", "viloyat"], ["Bosh prokuratura", "respublika"]]),
      sources: [{ title: "mib.uz", url: "https://mib.uz" }],
      verified: false
    },
    {
      id: "ssv",
      category: "Sogʻliqni saqlash va tibbiyot",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman tibbiyot birlashmalari va oilaviy poliklinikalar",
      name: "Oʻzbekiston Respublikasi Sogʻliqni saqlash vazirligi",
      subordinateTo: "Tuman tibbiyot birlashmasi -> Viloyat SSB -> Sogʻliqni saqlash vazirligi",
      address: "Toshkent shahri, Navoiy koʻchasi, 12-uy",
      website: "https://gov.uz/ssv",
      phone: "1003 / +998 (71) 203-15-19",
      categoryIds: ["healthcare"],
      hierarchy: steps([["Tuman tibbiyot birlashmasi", "tuman"], ["Viloyat SSB", "viloyat"], ["Sogʻliqni saqlash vazirligi", "respublika"]]),
      sources: [{ title: "gov.uz/ssv", url: "https://gov.uz/oz/ssv" }],
      verified: false
    },
    {
      id: "ekologiya",
      category: "Ekologiya va atrof-muhit",
      level: "respublika",
      region: "Oʻzbekiston Respublikasi",
      district: "Tuman / Shahar ekologiya boʻlimlari",
      // Rasmiy saytdagi joriy nom (2026-11-21). Eski: "…Ekologiya, atrof-muhitni muhofaza qilish va
      // iqlim oʻzgarishi vazirligi" — DECISIONS #27. Ishonch telefoni 1157 saytda tasdiqlandi.
      name: "Oʻzbekiston Respublikasi Ekologiya va iqlim oʻzgarishi milliy qoʻmitasi",
      subordinateTo: "Tuman boʻlimi -> Viloyat boshqarmasi -> Ekologiya va iqlim oʻzgarishi milliy qoʻmitasi",
      address: "Toshkent shahri, Chilonzor tumani, Bunyodkor shoh koʻchasi, 7A-uy",
      website: "https://gov.uz/eco",
      phone: "1157 / +998 (55) 502-33-77",
      categoryIds: ["ecology"],
      hierarchy: steps([["Tuman boʻlimi", "tuman"], ["Viloyat boshqarmasi", "viloyat"], ["Ekologiya va iqlim oʻzgarishi milliy qoʻmitasi", "respublika"]]),
      sources: [{ title: "gov.uz/eco", url: "https://gov.uz/oz/eco" }],
      verified: false
    }
  ];

  function cyrLocale(locale) { return locale === "uz-Cyrl" || locale === "kaa"; }
  /** Matnni joriy tilga: nameI18n → (kirill tillar uchun) translit → uz-Latn */
  function localize(text, locale, i18n) {
    if (i18n && i18n[locale]) return i18n[locale];
    return cyrLocale(locale) && TR ? TR.uzLatnToCyrl(text) : text;
  }
  function label(org, locale) { return org ? localize(org.name, locale, org.nameI18n) : ""; }
  function byId(id) { return ORGANIZATIONS_DATA.find(function (o) { return o.id === id; }) || null; }

  return { ORGS: ORGANIZATIONS_DATA, ORGANIZATIONS_DATA: ORGANIZATIONS_DATA, byId: byId, label: label, localize: localize };
})();
