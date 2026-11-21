/* =====================================================================
   regions — Oʻzbekiston Respublikasining maʼmuriy-hududiy boʻlinishi
   14 ta hudud: Qoraqalpogʻiston Respublikasi, 12 viloyat, Toshkent shahri.
   ⚠ verified: false — roʻyxat xotiradan tuzilgan, rasmiy manba (stat.uz, lex.uz)
   bilan solishtirilishi kerak. Soʻnggi yillarda tashkil etilgan yangi tuman yoki
   shaharlar tushib qolgan boʻlishi mumkin (docs/DECISIONS.md).
   Har bir hududda "sh." bilan tugaganlari — shahar, qolganlari — tuman.
   ===================================================================== */
window.EM_REGIONS = (function () {
  "use strict";
  const META = {
    verified: false,
    sources: [{ title: "Davlat statistika qoʻmitasi — maʼmuriy-hududiy boʻlinish (tekshirilsin)", url: "https://stat.uz" }],
    note: "Roʻyxat rasmiy manba bilan solishtirilishi kerak"
  };

  const R = [
    { id: "qr", name: { "uz-Latn": "Qoraqalpogʻiston Respublikasi", ru: "Республика Каракалпакстан", en: "Republic of Karakalpakstan", kaa: "Қарақалпақстан Республикасы" },
      d: ["Nukus sh.", "Amudaryo", "Beruniy", "Boʻzatov", "Chimboy", "Ellikqalʼa", "Kegeyli", "Moʻynoq", "Nukus", "Qanlikoʻl", "Qoʻngʻirot", "Qoraoʻzak", "Shumanay", "Taxiatosh", "Taxtakoʻpir", "Toʻrtkoʻl", "Xoʻjayli"] },
    { id: "an", name: { "uz-Latn": "Andijon viloyati", ru: "Андижанская область", en: "Andijan region" },
      d: ["Andijon sh.", "Xonobod sh.", "Andijon", "Asaka", "Baliqchi", "Boʻston", "Buloqboshi", "Izboskan", "Jalaquduq", "Marhamat", "Oltinkoʻl", "Paxtaobod", "Qoʻrgʻontepa", "Shahrixon", "Ulugʻnor", "Xoʻjaobod"] },
    { id: "bu", name: { "uz-Latn": "Buxoro viloyati", ru: "Бухарская область", en: "Bukhara region" },
      d: ["Buxoro sh.", "Kogon sh.", "Buxoro", "Gʻijduvon", "Jondor", "Kogon", "Olot", "Peshku", "Qorakoʻl", "Qorovulbozor", "Romitan", "Shofirkon", "Vobkent"] },
    { id: "fa", name: { "uz-Latn": "Fargʻona viloyati", ru: "Ферганская область", en: "Fergana region" },
      d: ["Fargʻona sh.", "Margʻilon sh.", "Qoʻqon sh.", "Quvasoy sh.", "Bagʻdod", "Beshariq", "Buvayda", "Dangʻara", "Fargʻona", "Furqat", "Oltiariq", "Qoʻshtepa", "Quva", "Rishton", "Soʻx", "Toshloq", "Uchkoʻprik", "Oʻzbekiston", "Yozyovon"] },
    { id: "ji", name: { "uz-Latn": "Jizzax viloyati", ru: "Джизакская область", en: "Jizzakh region" },
      d: ["Jizzax sh.", "Arnasoy", "Baxmal", "Doʻstlik", "Forish", "Gʻallaorol", "Mirzachoʻl", "Paxtakor", "Sharof Rashidov", "Yangiobod", "Zafarobod", "Zarbdor", "Zomin"] },
    { id: "xo", name: { "uz-Latn": "Xorazm viloyati", ru: "Хорезмская область", en: "Khorezm region" },
      d: ["Urganch sh.", "Xiva sh.", "Bogʻot", "Gurlan", "Hazorasp", "Xiva", "Xonqa", "Qoʻshkoʻpir", "Shovot", "Tuproqqalʼa", "Urganch", "Yangiariq", "Yangibozor"] },
    { id: "nm", name: { "uz-Latn": "Namangan viloyati", ru: "Наманганская область", en: "Namangan region" },
      d: ["Namangan sh.", "Chortoq", "Chust", "Kosonsoy", "Mingbuloq", "Namangan", "Norin", "Pop", "Toʻraqoʻrgʻon", "Uchqoʻrgʻon", "Uychi", "Yangiqoʻrgʻon"] },
    { id: "nv", name: { "uz-Latn": "Navoiy viloyati", ru: "Навоийская область", en: "Navoi region" },
      d: ["Navoiy sh.", "Zarafshon sh.", "Gʻozgʻon sh.", "Karmana", "Konimex", "Navbahor", "Nurota", "Qiziltepa", "Tomdi", "Uchquduq", "Xatirchi"] },
    { id: "qa", name: { "uz-Latn": "Qashqadaryo viloyati", ru: "Кашкадарьинская область", en: "Kashkadarya region" },
      d: ["Qarshi sh.", "Shahrisabz sh.", "Chiroqchi", "Dehqonobod", "Gʻuzor", "Kasbi", "Kitob", "Koson", "Koʻkdala", "Mirishkor", "Muborak", "Nishon", "Qamashi", "Qarshi", "Shahrisabz", "Yakkabogʻ"] },
    { id: "sa", name: { "uz-Latn": "Samarqand viloyati", ru: "Самаркандская область", en: "Samarkand region" },
      d: ["Samarqand sh.", "Kattaqoʻrgʻon sh.", "Bulungʻur", "Ishtixon", "Jomboy", "Kattaqoʻrgʻon", "Narpay", "Nurobod", "Oqdaryo", "Pastdargʻom", "Paxtachi", "Payariq", "Qoʻshrabot", "Samarqand", "Toyloq", "Urgut"] },
    { id: "si", name: { "uz-Latn": "Sirdaryo viloyati", ru: "Сырдарьинская область", en: "Syrdarya region" },
      d: ["Guliston sh.", "Shirin sh.", "Yangiyer sh.", "Boyovut", "Guliston", "Mirzaobod", "Oqoltin", "Sardoba", "Sayxunobod", "Sirdaryo", "Xovos"] },
    { id: "su", name: { "uz-Latn": "Surxondaryo viloyati", ru: "Сурхандарьинская область", en: "Surkhandarya region" },
      d: ["Termiz sh.", "Angor", "Bandixon", "Boysun", "Denov", "Jarqoʻrgʻon", "Muzrabot", "Oltinsoy", "Qiziriq", "Qumqoʻrgʻon", "Sariosiyo", "Sherobod", "Shoʻrchi", "Termiz", "Uzun"] },
    { id: "tv", name: { "uz-Latn": "Toshkent viloyati", ru: "Ташкентская область", en: "Tashkent region" },
      d: ["Nurafshon sh.", "Olmaliq sh.", "Angren sh.", "Bekobod sh.", "Ohangaron sh.", "Chirchiq sh.", "Yangiyoʻl sh.", "Bekobod", "Boʻka", "Boʻstonliq", "Chinoz", "Ohangaron", "Oqqoʻrgʻon", "Oʻrtachirchiq", "Parkent", "Piskent", "Qibray", "Quyichirchiq", "Toshkent", "Yangiyoʻl", "Yuqorichirchiq", "Zangiota"] },
    { id: "ts", name: { "uz-Latn": "Toshkent shahri", ru: "город Ташкент", en: "Tashkent city" },
      d: ["Bektemir", "Chilonzor", "Mirobod", "Mirzo Ulugʻbek", "Olmazor", "Sergeli", "Shayxontohur", "Uchtepa", "Yakkasaroy", "Yangihayot", "Yashnobod", "Yunusobod"] }
  ];

  function slug(s) {
    return s.toLowerCase().replace(/ sh\.$/, "-sh").replace(/[ʻʼ']/g, "").replace(/[^a-z0-9-]+/g, "-");
  }

  const REGIONS = R.map(function (r) {
    return {
      id: r.id,
      name: r.name,
      districts: r.d.map(function (n) {
        const isCity = / sh\.$/.test(n);
        const base = n.replace(/ sh\.$/, "");
        return {
          id: r.id + "-" + slug(n),
          isCity: isCity,
          name: {
            "uz-Latn": isCity ? base + " shahri" : (r.id === "ts" ? base + " tumani" : base + " tumani"),
            ru: null, en: isCity ? base + " city" : base + " district"
          },
          base: base
        };
      })
    };
  });

  function byId(id) { return REGIONS.find(function (r) { return r.id === id; }) || null; }
  function district(regionId, districtId) {
    const r = byId(regionId);
    return r ? (r.districts.find(function (d) { return d.id === districtId; }) || null) : null;
  }

  /** Nomni joriy tilda: tumanlar uchun ru/kaa/uz-Cyrl — oʻzbekcha nomning kirillchasi */
  function label(obj, locale) {
    if (!obj) return "";
    const n = obj.name || obj;
    if (n[locale]) return n[locale];
    const lat = n["uz-Latn"];
    if (locale === "uz-Cyrl" || locale === "kaa") return window.EM_TRANSLIT.uzLatnToCyrl(lat);
    if (locale === "ru" && obj.base) {
      const cyr = window.EM_TRANSLIT.uzLatnToCyrl(obj.base);
      return obj.isCity ? "г. " + cyr : cyr + " район";
    }
    return lat;
  }

  return { META: META, REGIONS: REGIONS, byId: byId, district: district, label: label };
})();
