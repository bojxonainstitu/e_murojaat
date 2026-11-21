/* =====================================================================
   legal_basis_db — qonunchilik asoslari bazasi
   Yozuv: { id, title: { 'uz-Latn', 'uz-Cyrl', ru?, kaa?, en? }, actNumber?, actDate?,
            articles: [{ ref, note }], url, verifiedAt?, categories, summary }

   • Nomlar va rekvizitlar lex.uz dagi rasmiy sahifadan olingan (2026-11-21 da tekshirildi).
     Rasmiy nomlar AYNAN saqlanadi ("murojaatlari" — ikki "a" bilan): glossariy va
     uzNormalize ularning harf tarkibini oʻzgartirmaydi. Global almashtirish qilmang.
   • ru, kaa, en: lex.uz dan rasmiy tarjima olinmadi → oʻzimiz tarjima qilmaymiz:
     ru va kaa uchun uz-Cyrl, en uchun uz-Latn rasmiy nomi koʻrsatiladi (pickTitle).
   • Moddalar faqat lex.uz matnidan tekshirilganlari yoziladi; qolganlarida articles: [].
     AI qonun nomi yoki moddasini yozmaydi — hujjat va natijalar shu bazadan toʻldiriladi.
   • summary — qisqa tushuntirish (qonun matnidan iqtibos emas).
   ===================================================================== */
window.EM_LAWS = (function () {
  "use strict";
  const CHECKED = "2026-11-21";

  function law(o) {
    return {
      id: o.id, title: o.title, actNumber: o.actNumber || null, actDate: o.actDate || null,
      articles: o.articles || [], url: o.url, verifiedAt: o.verifiedAt === undefined ? CHECKED : o.verifiedAt,
      categories: o.categories || [], summary: o.summary
    };
  }
  function t(uz, cyr) { return { "uz-Latn": uz, "uz-Cyrl": cyr }; }

  const LIST = [
    law({ id: "appeals",
      title: t("Oʻzbekiston Respublikasining “Jismoniy va yuridik shaxslarning murojaatlari toʻgʻrisida”gi Qonuni",
               "Ўзбекистон Республикасининг «Жисмоний ва юридик шахсларнинг мурожаатлари тўғрисида»ги Қонуни"),
      actNumber: "OʻRQ-445", actDate: "11.09.2017", url: "https://lex.uz/docs/-3336169",
      articles: [
        { ref: "6-modda", note: "Murojaatlarga qoʻyiladigan talablar" },
        { ref: "22-modda", note: "Murojaatlarni berish muddatlari" },
        { ref: "27-modda", note: "Murojaatlarga javoblar" },
        { ref: "28-modda", note: "Murojaatlarni koʻrib chiqish muddatlari" }
      ],
      categories: ["*"],
      summary: { "uz-Latn": "Murojat qilish tartibi, unga qoʻyiladigan talablar (F.I.Sh., yashash joyi, mohiyat, elektron murojatda — aloqa maʼlumotlari), koʻrib chiqish muddatlari va javob berish majburiyatini belgilaydi.",
        ru: "Определяет порядок подачи обращений, требования к ним (Ф.И.О., место жительства, суть, для электронных — контакты), сроки рассмотрения и обязанность дать ответ.",
        en: "Sets the procedure for appeals, their requirements (full name, residence, substance, contact details for online appeals), time limits and the duty to reply." } }),
    law({ id: "labor_code",
      title: t("Oʻzbekiston Respublikasining Mehnat kodeksi", "Ўзбекистон Республикасининг Меҳнат кодекси"),
      actDate: "28.10.2022", url: "https://lex.uz/docs/-6257288", categories: ["labor"],
      summary: { "uz-Latn": "Ish beruvchi ish haqini belgilangan muddatlarda va toʻliq miqdorda toʻlashi shart; mehnat nizolarini hal etish tartibi belgilangan.",
        ru: "Работодатель обязан выплачивать заработную плату в срок и в полном объёме; установлен порядок разрешения трудовых споров.",
        en: "The employer must pay wages on time and in full; the procedure for resolving labor disputes is set out." } }),
    law({ id: "civil_code",
      title: t("Oʻzbekiston Respublikasining Fuqarolik kodeksi (birinchi qism)", "Ўзбекистон Республикасининг Фуқаролик кодекси (биринчи қисм)"),
      actDate: "21.12.1995", url: "https://lex.uz/docs/-111189", categories: ["banking_finance", "land_property"],
      summary: { "uz-Latn": "Mulk huquqi, majburiyatlar va shartnomalar hamda zararni qoplash boʻyicha umumiy qoidalar.",
        ru: "Общие правила о праве собственности, обязательствах, договорах и возмещении вреда.",
        en: "General rules on property rights, obligations, contracts and compensation for damage." } }),
    law({ id: "civil_code_2",
      title: t("Oʻzbekiston Respublikasining Fuqarolik kodeksi (ikkinchi qism)", "Ўзбекистон Республикасининг Фуқаролик кодекси (иккинчи қисм)"),
      actDate: "29.08.1996", url: "https://lex.uz/docs/-180552", categories: ["consumer", "housing_utilities", "rent", "notary_inheritance"],
      summary: { "uz-Latn": "Ayrim turdagi shartnomalar (oldi-sotdi, ijara, taʼminot, xizmat koʻrsatish) va meros boʻyicha qoidalar.",
        ru: "Правила об отдельных видах договоров (купля-продажа, аренда, снабжение, услуги) и наследовании.",
        en: "Rules on specific contracts (sale, lease, supply, services) and inheritance." } }),
    law({ id: "consumer",
      title: t("Oʻzbekiston Respublikasining “Isteʼmolchilarning huquqlarini himoya qilish toʻgʻrisida”gi Qonuni",
               "Ўзбекистон Республикасининг «Истеъмолчиларнинг ҳуқуқларини ҳимоя қилиш тўғрисида»ги Қонуни"),
      actNumber: "221-I", actDate: "26.04.1996", url: "https://lex.uz/docs/-4704", categories: ["consumer", "housing_utilities"],
      summary: { "uz-Latn": "Isteʼmolchi sifatli va xavfsiz tovar (ish, xizmat) olish huquqiga ega; kamchilik aniqlanganda almashtirish, narxni kamaytirish, bepul tuzatish yoki pulni qaytarishni talab qilishi mumkin.",
        ru: "Потребитель вправе получить качественный и безопасный товар (работу, услугу); при недостатках может требовать замены, снижения цены, бесплатного устранения недостатков или возврата денег.",
        en: "The consumer is entitled to safe goods (work, services) of proper quality; if defects are found they may demand replacement, a price reduction, free repair or a refund." } }),
    law({ id: "banks",
      title: t("Oʻzbekiston Respublikasining “Banklar va bank faoliyati toʻgʻrisida”gi Qonuni",
               "Ўзбекистон Республикасининг «Банклар ва банк фаолияти тўғрисида»ги Қонуни"),
      actNumber: "OʻRQ-580", actDate: "05.11.2019", url: "https://lex.uz/docs/-4581969", categories: ["banking_finance"],
      summary: { "uz-Latn": "Banklar faoliyati, mijozlar bilan munosabatlar va Markaziy bank nazorati asoslari.",
        ru: "Основы деятельности банков, отношений с клиентами и надзора Центрального банка.",
        en: "Basics of bank activity, client relations and Central Bank supervision." } }),
    law({ id: "traffic",
      title: t("Oʻzbekiston Respublikasining “Yoʻl harakati toʻgʻrisida”gi Qonuni", "Ўзбекистон Республикасининг «Йўл ҳаракати тўғрисида»ги Қонуни"),
      actNumber: "OʻRQ-900", actDate: "19.01.2024", url: "https://lex.uz/docs/-6764454", categories: ["traffic_transport"],
      summary: { "uz-Latn": "Yoʻl harakati ishtirokchilarining huquq va majburiyatlari hamda yoʻl harakati xavfsizligini taʼminlash asoslari.",
        ru: "Права и обязанности участников дорожного движения и основы обеспечения его безопасности.",
        en: "Rights and duties of road users and the basis of ensuring road safety." } }),
    law({ id: "admin_code",
      title: t("Oʻzbekiston Respublikasining Maʼmuriy javobgarlik toʻgʻrisidagi kodeksi", "Ўзбекистон Республикасининг Маъмурий жавобгарлик тўғрисидаги кодекси"),
      actDate: "22.09.1994", url: "https://lex.uz/docs/-97664", categories: ["traffic_transport"],
      summary: { "uz-Latn": "Maʼmuriy huquqbuzarliklar, jarimalar va ularni qoʻllash hamda shikoyat qilish tartibi.",
        ru: "Административные правонарушения, штрафы, порядок их применения и обжалования.",
        en: "Administrative offences, fines and the procedure for imposing and appealing them." } }),
    law({ id: "notary",
      title: t("Oʻzbekiston Respublikasining “Notariat toʻgʻrisida”gi Qonuni", "Ўзбекистон Республикасининг «Нотариат тўғрисида»ги Қонуни"),
      actNumber: "343-I", actDate: "26.12.1996", url: "https://lex.uz/docs/-54458", categories: ["notary_inheritance"],
      summary: { "uz-Latn": "Notarial harakatlarni amalga oshirish tartibi va notariuslar faoliyati ustidan nazorat.",
        ru: "Порядок совершения нотариальных действий и контроль за деятельностью нотариусов.",
        en: "Procedure for notarial acts and supervision of notaries." } }),
    law({ id: "citizenship",
      title: t("Oʻzbekiston Respublikasining “Oʻzbekiston Respublikasining fuqaroligi toʻgʻrisida”gi Qonuni",
               "Ўзбекистон Республикасининг «Ўзбекистон Республикасининг фуқаролиги тўғрисида»ги Қонуни"),
      actNumber: "OʻRQ-610", actDate: "13.03.2020", url: "https://lex.uz/docs/-4761984", categories: ["migration_citizenship"],
      summary: { "uz-Latn": "Fuqarolikka qabul qilish, uni rasmiylashtirish va tegishli hujjatlar berish asoslari.",
        ru: "Основания приобретения и оформления гражданства и выдачи документов.",
        en: "Grounds for acquiring and formalizing citizenship and issuing documents." } }),
    law({ id: "pension",
      title: t("Oʻzbekiston Respublikasining “Fuqarolarning davlat pensiya taʼminoti toʻgʻrisida”gi Qonuni",
               "Ўзбекистон Республикасининг «Фуқароларнинг давлат пенсия таъминоти тўғрисида»ги Қонуни"),
      actNumber: "938-XII", actDate: "03.09.1993", url: "https://lex.uz/docs/-112314", categories: ["pension_social"],
      summary: { "uz-Latn": "Pensiya tayinlash shartlari, uni hisoblash va toʻlash tartibi.",
        ru: "Условия назначения пенсии, порядок её исчисления и выплаты.",
        en: "Conditions for granting pensions and the procedure for calculating and paying them." } }),
    law({ id: "health",
      title: t("Oʻzbekiston Respublikasining “Fuqarolar sogʻligʻini saqlash toʻgʻrisida”gi Qonuni",
               "Ўзбекистон Республикасининг «Фуқаролар соғлиғини сақлаш тўғрисида»ги Қонуни"),
      actNumber: "265-I", actDate: "29.08.1996", url: "https://lex.uz/docs/-26013", categories: ["healthcare"],
      summary: { "uz-Latn": "Fuqarolarning tibbiy yordam olish huquqi, tibbiyot xodimlarining majburiyatlari va bemor huquqlarini himoya qilish asoslari.",
        ru: "Право граждан на медицинскую помощь, обязанности медработников и основы защиты прав пациентов.",
        en: "Citizens’ right to medical care, duties of medical workers and protection of patients’ rights." } }),
    law({ id: "education",
      title: t("Oʻzbekiston Respublikasining “Taʼlim toʻgʻrisida”gi Qonuni", "Ўзбекистон Республикасининг «Таълим тўғрисида»ги Қонуни"),
      actNumber: "OʻRQ-637", actDate: "23.09.2020", url: "https://lex.uz/docs/-5013007", categories: ["education"],
      summary: { "uz-Latn": "Har kimning taʼlim olish huquqi, taʼlim muassasalari va pedagoglarning majburiyatlari kafolatlanadi.",
        ru: "Гарантируются право на образование, обязанности учреждений и педагогов.",
        en: "Guarantees the right to education and the duties of institutions and teachers." } }),
    law({ id: "tax_code",
      title: t("Oʻzbekiston Respublikasining Soliq kodeksi", "Ўзбекистон Республикасининг Солиқ кодекси"),
      actDate: "30.12.2019", url: "https://lex.uz/docs/-4674902", categories: ["business_tax"],
      summary: { "uz-Latn": "Soliq toʻlovchilarning huquq va majburiyatlari, soliq tekshiruvlari va ular ustidan shikoyat qilish tartibi.",
        ru: "Права и обязанности налогоплательщиков, налоговые проверки и порядок их обжалования.",
        en: "Taxpayers’ rights and duties, tax audits and the procedure for appealing them." } }),
    law({ id: "business",
      title: t("Oʻzbekiston Respublikasining “Tadbirkorlik faoliyati erkinligining kafolatlari toʻgʻrisida”gi Qonuni",
               "Ўзбекистон Республикасининг «Тадбиркорлик фаолияти эркинлигининг кафолатлари тўғрисида»ги Қонуни"),
      actNumber: "69-II", actDate: "25.05.2000", url: "https://lex.uz/docs/-31846", categories: ["business_tax"],
      summary: { "uz-Latn": "Tadbirkorlik subyektlarining huquqlari va ularni himoya qilish kafolatlari.",
        ru: "Права субъектов предпринимательства и гарантии их защиты.",
        en: "Rights of business entities and guarantees of their protection." } }),
    law({ id: "nature",
      title: t("Oʻzbekiston Respublikasining “Tabiatni muhofaza qilish toʻgʻrisida”gi Qonuni", "Ўзбекистон Республикасининг «Табиатни муҳофаза қилиш тўғрисида»ги Қонуни"),
      actNumber: "754-XII", actDate: "09.12.1992", url: "https://lex.uz/docs/-107115", categories: ["ecology"],
      summary: { "uz-Latn": "Atrof-muhitni muhofaza qilish, fuqarolarning qulay atrof-muhitga boʻlgan huquqi va davlat nazorati asoslari.",
        ru: "Охрана окружающей среды, право граждан на благоприятную среду и основы госконтроля.",
        en: "Environmental protection, citizens’ right to a healthy environment and state control." } }),
    law({ id: "land_code",
      title: t("Oʻzbekiston Respublikasining Yer kodeksi", "Ўзбекистон Республикасининг Ер кодекси"),
      actDate: "30.04.1998", url: "https://lex.uz/docs/-152653", categories: ["land_property"],
      summary: { "uz-Latn": "Yer uchastkalariga boʻlgan huquqlar, ularni berish va yer munosabatlarini tartibga solish asoslari.",
        ru: "Права на земельные участки, порядок их предоставления и основы регулирования земельных отношений.",
        en: "Rights to land plots, their allocation and the basis of regulating land relations." } }),
    law({ id: "enforcement",
      title: t("Oʻzbekiston Respublikasining “Sud hujjatlari va boshqa organlar hujjatlarini ijro etish toʻgʻrisida”gi Qonuni",
               "Ўзбекистон Республикасининг «Суд ҳужжатлари ва бошқа органлар ҳужжатларини ижро этиш тўғрисида»ги Қонуни"),
      actNumber: "258-II", actDate: "29.08.2001", url: "https://lex.uz/docs/-26477", categories: ["enforcement"],
      summary: { "uz-Latn": "Sud hujjatlari va boshqa organlar hujjatlarini, jumladan aliment undirish toʻgʻrisidagi hujjatlarni majburiy ijro etish tartibi.",
        ru: "Порядок принудительного исполнения судебных актов и актов других органов, в том числе о взыскании алиментов.",
        en: "Procedure for compulsory enforcement of court decisions and other bodies’ decisions, including alimony orders." } })
  ];

  const LAWS = {};
  LIST.forEach(function (l) { LAWS[l.id] = l; });

  // Javob muddati — "Jismoniy va yuridik shaxslarning murojaatlari toʻgʻrisida"gi Qonun, 28-modda
  // (lex.uz matni, 2026-11-21): ariza yoki shikoyat kelib tushgan kundan eʼtiboran oʻn besh kun ichida,
  // qoʻshimcha oʻrganish va (yoki) tekshirish talab etilganda — bir oygacha boʻlgan muddatda koʻrib chiqiladi.
  const DEADLINE = { lawId: "appeals", article: "28-modda", standardDays: 15, extendedMonths: 1, verifiedAt: CHECKED };

  // Rus tilidagi "В соответствии с ..." iborasi uchun ham rasmiy nom (uz-Cyrl) ishlatiladi.
  function pickTitle(l, locale) {
    if (!l) return "";
    if (l.title[locale]) return l.title[locale];
    if (locale === "ru" || locale === "kaa") return l.title["uz-Cyrl"];
    return l.title["uz-Latn"];
  }
  /** Modda sarlavhasi (rasmiy matn, oʻzbekcha): uz-Latn / kirill yozuvli tillarda; ru va en uchun tarjima qilinmaydi → null */
  function articleNote(a, locale) {
    const TR = window.EM_TRANSLIT;
    if (locale === "uz-Latn") return a.note;
    if (locale === "uz-Cyrl" || locale === "kaa") return TR ? TR.uzLatnToCyrl(a.note) : a.note;
    return null;
  }
  /** Hujjat raqami joriy yozuvda: kirill yozuvli tillarda (ru da uz-Cyrl nom koʻrsatiladi) "OʻRQ-445" → "ЎРҚ-445" (lex.uz kirill shakli) */
  function actNo(l, locale) {
    if (!l.actNumber) return "";
    // Rim raqamlari (221-I, 938-XII) oʻzgarmaydi — faqat "OʻRQ" qisqartmasi oʻgiriladi
    return (locale === "uz-Cyrl" || locale === "kaa" || locale === "ru") ? l.actNumber.replace(/^OʻRQ/, "ЎРҚ") : l.actNumber;
  }
  /** "28-modda" → 28 (koʻrsatish shakli i18n dagi law.art kalitidan) */
  function articleNum(a) { return parseInt(a.ref, 10); }
  function forCategory(cat) {
    return LIST.filter(function (l) { return l.categories.indexOf(cat) >= 0; });
  }

  return { LAWS: LAWS, LIST: LIST, DEADLINE: DEADLINE, forCategory: forCategory, appeals: LAWS.appeals,
    pickTitle: pickTitle, articleNote: articleNote, articleNum: articleNum, actNo: actNo };
})();
