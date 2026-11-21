/* =====================================================================
   categories — 16 ta soha (yopiq roʻyxat) va lokal tasniflash qoidalari
   Nomlar, mavzu, talab va izohlar i18n lugʻatlarida: cat.<id>, mavzu.<id>,
   req.<id>, why.<id>, first.<id>.
   kw — kalit soʻzlar (oʻzbek lotin/kirill, rus, ingliz, qoraqalpoq); taqqoslash
        EM_UZ.forMatch + kirill→lotin oʻgirish orqali bajariladi.
   facts — rad etilmaslik uchun muhim faktlar (yetishmasa aniqlashtiruvchi savol)
   evidence — tavsiya etiladigan dalillar
   escalation — organ ierarxiyasi, prokuratura va Virtual qabulxonadan tashqari
                qoʻshimcha qadamlar: "business", "court" (esc.step.<key>)
   ===================================================================== */
window.EM_CATEGORIES = (function () {
  "use strict";

  const LIST = [
    { id: "labor", facts: ["employer", "date", "amount"], evidence: ["shartnoma", "yozishma"], escalation: ["court"],
      kw: ["ish haqi", "ish haq", "maosh", "oylik", "ish beruvchi", "ishdan bo'shat", "ishdan haydal", "mehnat shartnoma", "ta'til", "ishxona", "rahbariyat", "kompensatsiya", "mehnat daftar", "ishlayman", "xodim",
        "зарплат", "заработн", "работодател", "уволи", "увольн", "трудов", "отпуск", "работаю", "salary", "wage", "employer", "dismiss", "fired", "payslip", "jumıs", "is haqı", "aylıq"] },
    { id: "consumer", facts: ["seller", "date", "amount"], evidence: ["chek", "foto"], escalation: ["court"],
      kw: ["tovar", "sifatsiz", "do'kon", "sotuvchi", "sotib ol", "kafolat", "qaytarib", "almashtir", "nosoz", "brak", "xarid", "mahsulot", "internet do'kon", "yetkazib", "pulimni",
        "товар", "магазин", "продав", "купил", "гарант", "брак", "возврат", "product", "shop", "store", "seller", "bought", "warranty", "refund", "defective", "dúkán", "satıwshı", "satıp al", "kepillik", "sapasız"] },
    { id: "housing_utilities", facts: ["account", "date"], evidence: ["chek", "foto"], escalation: [],
      kw: ["svet", "elektr", "gaz", "ichimlik suv", "issiq suv", "suv yo'q", "suv kelmay", "isitish", "kommunal", "chiqindi olib", "hisoblagich", "schyotchik", "kanalizatsiya", "abonent", "bsk", "lift", "uy-joy mulkdorlari", "tok yo'q",
        "свет", "электр", "газ", "вода", "воды", "отоплен", "коммунал", "счётчик", "счетчик", "лифт", "управляющ", "electricity", "power cut", "water", "heating", "utility", "meter", "suw", "jılıtıw", "svet joq"] },
    { id: "rent", facts: ["contract", "date"], evidence: ["shartnoma", "chek"], escalation: ["court"],
      kw: ["ijara", "ijaraga", "ijarachi", "uy egasi", "kvartira egasi", "garov puli", "depozit",
        "аренд", "арендодател", "съём", "залог", "rent", "landlord", "tenant", "lease", "deposit"] },
    { id: "banking_finance", facts: ["contract", "amount"], evidence: ["shartnoma", "yozishma"], escalation: ["court"],
      kw: ["bank", "kredit", "foiz", "plastik karta", "kartamdan", "mikroqarz", "lizing", "hisob raqamim", "pul o'tkaz", "ipoteka",
        "банк", "кредит", "процент", "микрозайм", "займ", "ипотек", "loan", "credit", "interest rate", "mortgage", "qarjı"] },
    { id: "traffic_transport", facts: ["date", "place"], evidence: ["foto"], escalation: ["court"],
      kw: ["yo'l harakat", "jarima", "haydovchilik", "guvohnoma", "avtomobil", "avtobus", "taksi", "yo'l-transport", "avariya", "radar", "yhxx", "yo'l belgisi", "svetofor", "jamoat transporti",
        "штраф", "водител", "автомобил", "автобус", "такси", "дтп", "дорожн", "светофор", "traffic", "fine", "driver", "licence", "license", "bus", "taxi", "accident", "jol háreketi"] },
    { id: "notary_inheritance", facts: ["date"], evidence: ["yozishma"], escalation: ["court"],
      kw: ["notarius", "notarial", "meros", "vasiyat", "merosxo'r", "ishonchnoma",
        "нотари", "наследств", "завещан", "доверенност", "notary", "inheritance", "heir", "power of attorney", "miyras"] },
    { id: "migration_citizenship", facts: ["date"], evidence: ["yozishma"], escalation: [],
      kw: ["propiska", "doimiy ro'yxat", "vaqtincha ro'yxat", "fuqarolik", "pasport", "migratsiya", "viza", "id-karta", "id karta", "chet el fuqarosi", "yashash guvohnomasi",
        "прописк", "гражданств", "паспорт", "миграц", "виза", "citizenship", "passport", "migration", "visa", "residence permit", "puqaralıq"] },
    { id: "pension_social", facts: ["date"], evidence: ["yozishma"], escalation: ["court"],
      kw: ["pensiya", "nafaqa", "ijtimoiy yordam", "nogironlik", "moddiy yordam", "temir daftar", "ayollar daftar", "yoshlar daftar", "bolalar puli", "ijtimoiy reyestr",
        "пенси", "пособи", "инвалидн", "соцпомощ", "pension", "allowance", "benefit", "disability", "nápaqa"] },
    { id: "healthcare", facts: ["institution", "date"], evidence: ["yozishma"], escalation: [],
      kw: ["shifoxona", "poliklinika", "shifokor", "vrach", "tibbiy", "dori", "kasalxona", "davolan", "tez yordam", "hamshira", "operatsiya",
        "больниц", "поликлиник", "врач", "лечени", "лекарств", "скорая", "hospital", "clinic", "doctor", "treatment", "ambulance", "medicine", "emlewxana", "shıpaker"] },
    { id: "education", facts: ["institution"], evidence: ["yozishma"], escalation: [],
      kw: ["maktab", "bog'cha", "o'qituvchi", "ta'lim", "dars", "o'quvchi", "universitet", "talaba", "kontrakt", "maktabgacha", "kollej", "litsey", "texnikum",
        "школ", "детский сад", "учител", "студент", "университет", "school", "kindergarten", "teacher", "student", "university", "mektep", "oqıtıwshı", "balalar baqshası"] },
    { id: "business_tax", facts: ["date"], evidence: ["yozishma"], escalation: ["business", "court"],
      kw: ["soliq", "tadbirkor", "yakka tartibdagi", "yatt", "litsenziya", "kassa apparati", "qqs", "patent", "biznesim", "firmam", "tekshiruv o'tkaz",
        "налог", "предпринимател", "лицензи", "бизнес", "ндс", "tax", "business", "entrepreneur", "vat", "salıq", "isbilermen"] },
    { id: "ecology", facts: ["place"], evidence: ["foto"], escalation: [],
      kw: ["ekologiya", "daraxt kes", "ifloslan", "havo ifloslan", "tutun", "atrof-muhit", "chiqindi tashla", "axlat tashla", "shovqin", "daryoga", "suv havzasi",
        "эколог", "вырубк", "загрязн", "свалк", "дым", "шум", "pollution", "ecology", "environment", "smoke", "noise", "dumping", "terek", "átirap-ortalıq"] },
    { id: "land_property", facts: ["place", "date"], evidence: ["shartnoma", "yozishma"], escalation: ["court"],
      kw: ["kadastr", "yer uchastka", "ko'chmas mulk", "mulk huquq", "kadastr pasport", "uy-joy hujjat", "kvartira hujjat","mulkni ro'yxat", "yer maydon",
        "кадастр", "земельн", "недвижим", "право собственност", "cadastre", "land plot", "real estate", "property right", "jer uchastka", "kóshpes múlk"] },
    { id: "enforcement", facts: ["date", "amount"], evidence: ["yozishma"], escalation: ["court"],
      kw: ["aliment", "ijro varaq", "majburiy ijro", "mib", "sud qarori ijro", "sud qarorini ijro", "ijro hujjat", "sud ijrochi",
        "алимент", "исполнительн", "пристав", "принудительн", "решение суда не исполн", "alimony", "child support", "bailiff", "enforcement of", "orınlaw hújjet"] },
    { id: "other", facts: ["place"], evidence: [], escalation: [], kw: [] }
  ];

  const DOC_TYPE_KW = {
    SHIKOYAT: ["buzil", "to'lamay", "to'lanmay", "bermayapti", "bermay", "berilmay", "kelmay", "rad et", "qo'pol", "sifatsiz", "kechik", "noqonuniy", "javob bermay", "pora", "qaytarmay", "ishlamay", "yo'q", "nosoz", "aldad", "shikoyat", "huquqim",
      "нарушен", "не выплач", "отказал", "отказыва", "грубо", "некачествен", "задерж", "незаконн", "не работает", "нет света", "никто не", "жалоб", "not paid", "refused", "violat", "defective", "delay", "illegal", "not working", "complain", "no electricity", "nobody",
      "buzıl", "tólenbe", "bas tart", "keshik", "islemey", "joq"],
    TAKLIF: ["taklif", "yaxshi bo'lardi", "tashkil etish", "joriy etish", "o'rnatish kerak", "qurish kerak", "maqsadga muvofiq", "takomillashtir", "tavsiya",
      "предлага", "предложен", "было бы хорошо", "целесообразно", "propose", "suggest", "would be good", "usınıs"]
  };

  // Muhim faktlarni matndan aniqlash (forMatch qilingan matn ustida)
  const FACT_RE = {
    date: /(\d|\b(yanvar|fevral|mart|aprel|may|iyun|iyul|avgust|sentyabr|oktyabr|noyabr|dekabr|january|february|march|april|june|july|august|september|october|november|december|yesterday|today|week|month)|kecha|bugun|hafta|oydan|kundan|yildan|январ|феврал|март|апрел|мая|июн|июл|август|сентябр|октябр|ноябр|декабр|вчера|сегодня|недел|месяц|aydan|kúnnen|jıldan)/i,
    amount: /(\d[\d\s.,]*\s*(so'm|сўм|сум|swm|soum|sum\b|mln|million|ming|\$|usd|доллар|руб)|summa|сумм|amount)/i,
    employer: /(mchj|\bmchj|ooo|ооо|\baj\b|korxona|tashkilot|kompaniya|firma|zavod|fabrika|«|“|"|компан|предприят|организац|llc|company|jshj|kárxana|shólkem)/i,
    seller: /(do'kon|market|savdo|«|“|"|магазин|shop|store|dúkán)/i,
    account: /(abonent|hisob raqam|shaxsiy hisob|лицев|абонент|account|\d{5,})/i,
    contract: /((shartnoma|договор|contract|shártnama)[^.\n]{0,25}(№|n\b|no\b|raqam|номер|#|\d))/i,
    place: /(ko'cha|mahalla|massiv|kvartal|tuman|shahar|qishloq|улиц|махалл|район|город|street|district|village|kóshe|máhálle|\d+-uy)/i,
    institution: /(maktab|bog'cha|universitet|institut|kollej|litsey|shifoxona|poliklinika|школ|сад|университет|больниц|поликлиник|school|hospital|clinic|mektep|№\s*\d|\d+-son|\d+-)/i,
    request: /(so'rayman|talab qilaman|iltimos|qaytarib|qaytaring|to'lab|undir|tiklash|tiklang|almashtir|chora ko'r|прошу|требую|верн|выплат|восстанов|замен|please|request|demand|refund|replace|restore|sorayman|talap etemen)/i
  };

  function byId(id) { return LIST.find(function (c) { return c.id === id; }) || LIST[LIST.length - 1]; }
  const IDS = LIST.map(function (c) { return c.id; });

  return { LIST: LIST, IDS: IDS, byId: byId, DOC_TYPE_KW: DOC_TYPE_KW, FACT_RE: FACT_RE };
})();
