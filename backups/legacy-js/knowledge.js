/* =====================================================================
   E-murojaat — HUQUQIY BILIMLAR BAZASI (lokal / demo mantiq uchun)
   ---------------------------------------------------------------------
   MUHIM: bu yerda qonun moddalari raqamlari ataylab KELTIRILMAGAN.
   Faqat qonunchilik hujjatlarining nomlari va umumiy huquqiy mazmun.
   Har bir ma'lumotni foydalanuvchi lex.uz da tekshirishi kerak.
   ===================================================================== */

window.EM_KB = (function () {
  "use strict";

  // Barcha murojaatlar uchun umumiy asos
  const MUROJAAT_QONUNI = {
    nom: "O'zbekiston Respublikasining \"Jismoniy va yuridik shaxslarning murojaatlari to'g'risida\"gi Qonuni",
    qisqa: "Jismoniy va yuridik shaxslarning murojaatlari to'g'risidagi Qonun",
    mazmun:
      "Murojaat qilish tartibi, murojaatga qo'yiladigan talablar (F.I.Sh., yashash joyi, murojaat mohiyati, elektron murojaatda — aloqa ma'lumotlari), ko'rib chiqish muddatlari va javob berish majburiyatini belgilaydi. Anonim murojaatlar ko'rib chiqilmaydi."
  };

  const DALILLAR = {
    chek: "To'lovni tasdiqlovchi hujjat (chek / kvitansiya) nusxasi",
    shartnoma: "Shartnoma nusxasi",
    yozishma: "Tomonlar o'rtasidagi yozishmalar (xat, xabar, javob) nusxalari",
    foto: "Foto / video materiallar"
  };

  // Murojaat turlari (umumiy ta'riflar Murojaatlar to'g'risidagi Qonunga asoslangan)
  const TURLAR = {
    ariza: {
      nom: "Ariza",
      sarlavha: "ARIZA",
      tarif: "Fuqaroning huquq va erkinliklari hamda qonuniy manfaatlarini ro'yobga chiqarishda ko'maklashish to'g'risidagi iltimosi."
    },
    shikoyat: {
      nom: "Shikoyat",
      sarlavha: "SHIKOYAT",
      tarif: "Buzilgan huquq, erkinlik va qonuniy manfaatlarni tiklash, ularni himoya qilish to'g'risidagi talab."
    },
    taklif: {
      nom: "Taklif",
      sarlavha: "TAKLIF",
      tarif: "Davlat va jamiyat faoliyatini, tashkilot ishini takomillashtirishga doir tavsiyalar."
    }
  };

  const TUR_KALITLARI = {
    shikoyat: ["buzil", "to'lamay", "to'lanmay", "bermayapti", "bermay", "rad et", "rad qil", "qo'pol", "sifatsiz", "kechik",
      "noqonuniy", "javob bermay", "e'tibor bermay", "pora", "qaytarmay", "ishlamay", "yo'q", "o'chib", "nosoz", "aldad",
      "shikoyat", "talab qilaman", "huquqim", "ko'rmayapti", "ruxsat bermay", "majburla"],
    taklif: ["taklif", "yaxshi bo'lardi", "tashkil etish", "joriy etish", "o'rnatish kerak", "qurish kerak", "maqsadga muvofiq",
      "takomillashtir", "tavsiya", "foydali bo'lardi", "ochish kerak"]
  };

  /* Har bir toifa:
     kalit       — matndan aniqlash uchun kalit so'zlar (kichik harf)
     organ       — asosiy vakolatli organ
     kimga       — hujjatdagi "Kimga" qatori
     sabab       — nega aynan shu organ
     qoshimcha   — yuqori turuvchi / qo'shimcha organlar
     bosqich     — tavsiya etiladigan ketma-ketlik (agar bor bo'lsa)
     qonunlar    — tegishli qonunchilik (nom + umumiy mazmun)
     dalillar    — tavsiya etiladigan dalillar (DALILLAR kalitlari)
     mavzu       — hujjat kirish qismidagi mavzu
     tekshir     — toifaga xos qo'shimcha to'liqlik tekshiruvi */
  const TOIFALAR = [
    {
      id: "mehnat",
      nom: "Mehnat munosabatlari",
      kalit: ["ish haqi", "ish haq", "maosh", "oylik", "ish beruvchi", "ishdan bo'shat", "ishdan haydal", "mehnat shartnoma",
        "ta'til", "ishxona", "rahbariyat", "kompensatsiya", "mehnat daftar", "ish joyim", "ishlayman", "ishlaganman", "xodim"],
      organ: "Davlat mehnat inspeksiyasining hududiy (viloyat / tuman) bo'linmasi",
      kimga: "Davlat mehnat inspeksiyasi hududiy bo'linmasi rahbariga",
      sabab:
        "Mehnat qonunchiligiga rioya etilishi ustidan davlat nazoratini mehnat inspeksiyasi amalga oshiradi: ish haqining o'z vaqtida to'lanmasligi, mehnat shartnomasi shartlarining buzilishi va noqonuniy ishdan bo'shatish holatlarini tekshiradi.",
      qoshimcha: [
        "Ish beruvchining (korxona rahbarining) o'ziga yozma talab — ko'pincha birinchi va eng tez yo'l",
        "Bandlik va mehnat munosabatlari vazirligi — yuqori turuvchi organ",
        "Fuqarolik ishlari bo'yicha sud — nizo hal etilmasa (mehnat nizolari bo'yicha)"
      ],
      bosqich: [
        "Ish beruvchiga yozma murojaat qiling (qabul belgisi qo'yilgan nusxani saqlang).",
        "Natija bo'lmasa — Davlat mehnat inspeksiyasiga shikoyat yuboring.",
        "Nizo hal etilmasa — sudga da'vo arizasi bilan murojaat qiling."
      ],
      qonunlar: [
        { nom: "O'zbekiston Respublikasining Mehnat kodeksi", mazmun: "Ish beruvchi xodimga bajargan ishi uchun ish haqini belgilangan muddatlarda va to'liq miqdorda to'lashi shart; ish haqi kechiktirilganda xodim himoyalanish va kompensatsiya olish huquqiga ega; mehnat nizolarini hal etish tartibi belgilangan." }
      ],
      dalillar: ["shartnoma", "yozishma"],
      mavzu: "ish haqini to'lash bilan bog'liq mehnat huquqlarim masalasi",
      standartTalab: "Hisoblangan, biroq to'lanmagan ish haqini to'liq undirib berish hamda kechiktirilgan davr uchun qonunchilikda nazarda tutilgan kompensatsiyani to'lashni ta'minlash.",
      tekshir: function (t, f) {
        const w = [];
        if (!/(mchj|aj\b|qk\b|xk\b|korxona|tashkilot|kompaniya|firma|zavod|fabrika|"|«|“|davlat muassasa|maktab|shifoxona|ооо|компан|предприят|организац|llc|company|jshj|kárxana|shólkem)/i.test(t)) {
          w.push({ id: "mehnat_org", lvl: "yellow", t: "Ish beruvchi (tashkilot nomi) ko'rsatilmagan", fix: "Ish beruvchining to'liq nomini (masalan, \"…\" MChJ) va manzilini yozing — inspeksiya kimni tekshirishini bilishi kerak." });
        }
        if (!/\d/.test(t)) {
          w.push({ id: "mehnat_sum", lvl: "yellow", t: "Qarz miqdori yoki davri ko'rsatilmagan", fix: "Necha oylik ish haqi va taxminan qancha summa to'lanmaganini raqamlarda ko'rsating." });
        }
        return w;
      }
    },
    {
      id: "istemol",
      nom: "Iste'molchilar huquqlari",
      kalit: ["tovar", "sifatsiz", "do'kon", "sotuvchi", "sotib ol", "sotib old", "kafolat", "qaytarib", "almashtir", "nosoz",
        "brak", "internet do'kon", "yetkazib", "xarid", "telefon", "muzlatkich", "kir yuvish", "televizor", "mahsulot", "pulimni"],
      organ: "Raqobatni rivojlantirish va iste'molchilar huquqlarini himoya qilish qo'mitasining hududiy boshqarmasi",
      kimga: "Raqobatni rivojlantirish va iste'molchilar huquqlarini himoya qilish qo'mitasi hududiy boshqarmasi boshlig'iga",
      sabab:
        "Iste'molchilar huquqlariga rioya etilishi ustidan nazorat qiluvchi vakolatli davlat organi hisoblanadi: sifatsiz tovar, kafolat majburiyatlarining bajarilmasligi va sotuvchining qonunga zid harakatlari bo'yicha murojaatlarni ko'rib chiqadi.",
      qoshimcha: [
        "Sotuvchi (ishlab chiqaruvchi)ga yozma talabnoma (pretenziya) — dastlabki majburiy amaliy qadam",
        "Fuqarolik ishlari bo'yicha sud — talab ixtiyoriy bajarilmasa"
      ],
      bosqich: [
        "Sotuvchiga yozma talabnoma (pretenziya) bering, nusxasiga qabul belgisini qo'ydiring.",
        "Rad etilsa yoki javob bo'lmasa — iste'molchilar huquqlarini himoya qilish organiga shikoyat qiling.",
        "Zarur bo'lsa — sudga murojaat qiling (iste'molchi da'volari bo'yicha imtiyozlar mavjud — lex.uz da tekshiring)."
      ],
      qonunlar: [
        { nom: "O'zbekiston Respublikasining \"Iste'molchilarning huquqlarini himoya qilish to'g'risida\"gi Qonuni", mazmun: "Iste'molchi sifatli va xavfsiz tovar olish huquqiga ega; sifatsiz tovar aniqlanganda uni almashtirish, narxini mutanosib kamaytirish, bepul tuzatish yoki to'langan pulni qaytarishni talab qilishi mumkin; kafolat muddati davomida sotuvchi javobgar." },
        { nom: "O'zbekiston Respublikasining Fuqarolik kodeksi", mazmun: "Oldi-sotdi shartnomasi, tovar sifatiga oid talablar va shartnoma majburiyatlari buzilganda yetkazilgan zararni qoplash bo'yicha umumiy qoidalar." }
      ],
      dalillar: ["chek", "foto"],
      mavzu: "sifatsiz tovar bilan bog'liq iste'molchi huquqlarim masalasi",
      standartTalab: "Sotuvchini sifatsiz tovarni sifatlisiga almashtirishga yoki to'langan pul mablag'ini to'liq qaytarishga majburlash choralarini ko'rish.",
      tekshir: function (t, f) {
        const w = [];
        if (!f.dalillar.includes("chek")) {
          w.push({ id: "istemol_chek", lvl: "yellow", t: "Xarid cheki / kvitansiya belgilanmagan", fix: "Chek yoki to'lov kvitansiyasi tovar sotib olinganini isbotlovchi asosiy hujjat. Bo'lmasa, bank ko'chirmasi yoki guvohlarni ko'rsating." });
        }
        if (!/(do'kon|market|savdo|mchj|"|«|“|sotuvchi|internet|магазин|продав|shop|store|seller|dúkán|satıwshı)/i.test(t)) {
          w.push({ id: "istemol_seller", lvl: "yellow", t: "Sotuvchi (do'kon) nomi va manzili aniq emas", fix: "Do'kon nomi, manzili yoki internet-do'kon saytini kiriting." });
        }
        if (!/\d/.test(t)) {
          w.push({ id: "istemol_date", lvl: "yellow", t: "Xarid sanasi va narxi ko'rsatilmagan", fix: "Tovar qachon va qancha summaga sotib olinganini yozing — kafolat muddatini hisoblash uchun zarur." });
        }
        return w;
      }
    },
    {
      id: "kommunal",
      nom: "Kommunal xizmatlar",
      kalit: ["svet", "elektr", "gaz", "ichimlik suv", "issiq suv", "suv yo'q", "suv kelmay", "isitish", "kommunal", "chiqindi",
        "hisoblagich", "schyotchik", "kanalizatsiya", "elektr energiya", "tok", "abonent"],
      organ: "Tegishli hududiy ta'minot korxonasi (elektr / gaz / suv ta'minoti)",
      kimga: "Hududiy kommunal ta'minot korxonasi rahbariga",
      sabab:
        "Xizmatni bevosita ko'rsatuvchi korxona ta'minotni tiklash, hisob-kitobni qayta ko'rib chiqish va abonent bilan tuzilgan shartnoma majburiyatlarini bajarishga mas'ul.",
      qoshimcha: [
        "Tuman (shahar) hokimligi — hududda kommunal xizmatlar sifatini muvofiqlashtiradi",
        "Raqobatni rivojlantirish va iste'molchilar huquqlarini himoya qilish qo'mitasi — xizmat sifati iste'molchi huquqini buzsa",
        "Tarmoqdagi nazorat inspeksiyasi (energetika / gaz / suv) — ta'minot korxonasi choralar ko'rmasa (aniq nomini lex.uz va rasmiy saytlardan tekshiring)"
      ],
      bosqich: [
        "Ta'minot korxonasining call-markazi yoki hududiy bo'limiga yozma murojaat qiling.",
        "Muammo hal etilmasa — tuman (shahar) hokimligiga murojaat qiling."
      ],
      qonunlar: [
        { nom: "O'zbekiston Respublikasining \"Iste'molchilarning huquqlarini himoya qilish to'g'risida\"gi Qonuni", mazmun: "Kommunal xizmat iste'molchisi sifatli va uzluksiz xizmat olish, sifatsiz xizmat uchun to'lovni qayta hisoblashni talab qilish huquqiga ega." },
        { nom: "O'zbekiston Respublikasining Fuqarolik kodeksi", mazmun: "Ta'minot (energiya, gaz, suv bilan ta'minlash) shartnomasi bo'yicha tomonlarning majburiyatlari." }
      ],
      dalillar: ["chek", "foto"],
      mavzu: "kommunal xizmat ko'rsatilishi masalasi",
      standartTalab: "Kommunal xizmat ko'rsatilishini zudlik bilan tiklash va xizmat ko'rsatilmagan davr uchun to'lovni qayta hisob-kitob qilish.",
      tekshir: function (t) {
        const w = [];
        if (!/(abonent|hisob raqam|shaxsiy hisob|lits|лицев|абонент|account|jeke esap|\d{5,})/i.test(t)) {
          w.push({ id: "kommunal_acc", lvl: "yellow", t: "Abonent (shaxsiy hisob) raqami ko'rsatilmagan", fix: "Kvitansiyadagi abonent / shaxsiy hisob raqamini yozing — korxona sizni aynan shu raqam orqali topadi." });
        }
        return w;
      }
    },
    {
      id: "talim",
      nom: "Ta'lim",
      kalit: ["maktab", "bog'cha", "o'qituvchi", "ta'lim", "dars", "o'quvchi", "farzandim", "sinf", "direktor", "universitet",
        "talaba", "kontrakt", "maktabgacha"],
      organ: "Tuman (shahar) maktabgacha va maktab ta'limi bo'limi (oliy ta'lim masalalarida — OTM rahbariyati)",
      kimga: "Tuman (shahar) maktabgacha va maktab ta'limi bo'limi mudiriga",
      sabab:
        "Hududdagi ta'lim muassasalari faoliyatini bevosita boshqaradi va nazorat qiladi, ta'lim muassasasi rahbariyatining qarorlari ustidan murojaatlarni ko'rib chiqadi.",
      qoshimcha: [
        "Ta'lim muassasasi rahbari (direktor / mudira) — dastlabki murojaat uchun",
        "Maktabgacha va maktab ta'limi vazirligi (oliy ta'limda — tegishli vazirlik) — yuqori turuvchi organ"
      ],
      bosqich: [],
      qonunlar: [
        { nom: "O'zbekiston Respublikasining \"Ta'lim to'g'risida\"gi Qonuni", mazmun: "Har kimning ta'lim olish huquqi, ta'lim muassasalari va pedagoglarning majburiyatlari, ta'lim oluvchilarning huquqlari kafolatlanadi." }
      ],
      dalillar: ["yozishma"],
      mavzu: "ta'lim olish huquqi bilan bog'liq masala",
      standartTalab: "Ko'rsatilgan holatni o'rganib chiqib, ta'lim olish huquqining buzilishini bartaraf etish choralarini ko'rish.",
      tekshir: function (t) {
        const w = [];
        if (!/(maktab|bog'cha|universitet|institut|kollej|texnikum|litsey|школ|детский сад|университет|колледж|лицей|school|kindergarten|university|college|mektep|baqsha)/i.test(t)) {
          w.push({ id: "talim_school", lvl: "yellow", t: "Ta'lim muassasasi aniq ko'rsatilmagan", fix: "Muassasa nomi va raqamini yozing (masalan, 45-umumta'lim maktabi)." });
        }
        return w;
      }
    },
    {
      id: "sogliq",
      nom: "Sog'liqni saqlash",
      kalit: ["shifoxona", "poliklinika", "shifokor", "vrach", "tibbiy", "dori", "kasalxona", "davolan", "tez yordam", "hamshira",
        "operatsiya", "oilaviy poliklinika"],
      organ: "Tuman (shahar) tibbiyot birlashmasi / tibbiyot muassasasi rahbariyati",
      kimga: "Tuman (shahar) tibbiyot birlashmasi rahbariga",
      sabab:
        "Hududdagi davlat tibbiyot muassasalari faoliyatini boshqaradi, tibbiy yordam sifati va xodimlar xatti-harakati yuzasidan murojaatlarni ko'rib chiqadi.",
      qoshimcha: [
        "Viloyat (Toshkent shahar) sog'liqni saqlash boshqarmasi",
        "O'zbekiston Respublikasi Sog'liqni saqlash vazirligi — yuqori turuvchi organ"
      ],
      bosqich: [],
      qonunlar: [
        { nom: "O'zbekiston Respublikasining \"Fuqarolar sog'lig'ini saqlash to'g'risida\"gi Qonuni", mazmun: "Fuqarolarning tibbiy yordam olish huquqi, tibbiyot xodimlarining majburiyatlari va bemor huquqlarini himoya qilish asoslari belgilangan." }
      ],
      dalillar: ["yozishma", "foto"],
      mavzu: "tibbiy yordam ko'rsatilishi masalasi",
      standartTalab: "Ko'rsatilgan holat yuzasidan xizmat tekshiruvi o'tkazish va tegishli tibbiy yordam ko'rsatilishini ta'minlash.",
      tekshir: function () { return []; }
    },
    {
      id: "pensiya",
      nom: "Ijtimoiy ta'minot",
      kalit: ["pensiya", "nafaqa", "ijtimoiy yordam", "nogironlik", "moddiy yordam", "temir daftar", "ayollar daftar", "yoshlar daftar"],
      organ: "Ijtimoiy himoya milliy agentligining tuman (shahar) bo'limi",
      kimga: "Ijtimoiy himoya milliy agentligi tuman (shahar) bo'limi boshlig'iga",
      sabab:
        "Pensiya, nafaqa va ijtimoiy yordam tayinlash hamda to'lash masalalari bo'yicha vakolatli tizim hisoblanadi (aniq tarkibiy bo'linmani rasmiy saytlardan tekshiring).",
      qoshimcha: [
        "Byudjetdan tashqari Pensiya jamg'armasining hududiy bo'limi — pensiya hisob-kitobi masalalarida",
        "Tuman (shahar) hokimligi"
      ],
      bosqich: [],
      qonunlar: [
        { nom: "O'zbekiston Respublikasining \"Fuqarolarning davlat pensiya ta'minoti to'g'risida\"gi Qonuni", mazmun: "Pensiya tayinlash shartlari, pensiya miqdorini hisoblash va to'lash tartibi belgilangan." }
      ],
      dalillar: ["yozishma"],
      mavzu: "pensiya va nafaqa ta'minoti masalasi",
      standartTalab: "Pensiya (nafaqa) tayinlash / to'lash masalasini qonunchilik asosida qayta ko'rib chiqish.",
      tekshir: function () { return []; }
    },
    {
      id: "korrupsiya",
      nom: "Korrupsiya holatlari",
      kalit: ["pora", "korrupsiya", "tama", "pul so'radi", "pul talab", "noqonuniy pul", "tanish-bilish", "sovg'a so'radi"],
      organ: "O'zbekiston Respublikasi Korrupsiyaga qarshi kurashish agentligi",
      kimga: "O'zbekiston Respublikasi Korrupsiyaga qarshi kurashish agentligi direktoriga",
      sabab:
        "Korrupsiyaga qarshi kurashish sohasida davlat siyosatini amalga oshiruvchi va korrupsiya holatlari to'g'risidagi xabarlarni ko'rib chiqadigan maxsus vakolatli organ.",
      qoshimcha: [
        "Prokuratura organlari — jinoyat alomatlari bo'lsa",
        "Tegishli tashkilotning yuqori turuvchi organi"
      ],
      bosqich: [],
      qonunlar: [
        { nom: "O'zbekiston Respublikasining \"Korrupsiyaga qarshi kurashish to'g'risida\"gi Qonuni", mazmun: "Korrupsiyaviy huquqbuzarliklarning oldini olish, ular haqida xabar beruvchi shaxslarni himoya qilish asoslari belgilangan." }
      ],
      dalillar: ["yozishma", "foto"],
      mavzu: "korrupsiyaviy holat to'g'risida xabar",
      standartTalab: "Bayon etilgan holat yuzasidan tekshiruv o'tkazish va aybdor shaxslarga nisbatan qonuniy choralar ko'rish.",
      tekshir: function () {
        return [{ id: "korrupsiya_fact", lvl: "yellow", t: "Faktlarga asoslanganlik", fix: "Faqat o'zingiz bilgan va isbotlay oladigan faktlarni yozing: sana, joy, shaxs lavozimi. Bila turib yolg'on xabar berish qonun bo'yicha javobgarlikka sabab bo'ladi." }];
      }
    },
    {
      id: "obodon",
      nom: "Obodonlashtirish va mahalliy masalalar",
      kalit: ["yo'lni", "yo'l ta'mir", "asfalt", "chiroq", "ariq", "obodon", "mahalla", "daraxt", "chuqur", "ko'cha", "hovli",
        "bolalar maydon", "avtobus", "bekat", "yer uchast", "qurilish ruxsat"],
      organ: "Tuman (shahar) hokimligi",
      kimga: "Tuman (shahar) hokimiga",
      sabab:
        "Hududni obodonlashtirish, yo'llar, ko'cha yoritgichlari, mahalliy infratuzilma va aholining kundalik muammolarini hal etish mahalliy davlat hokimiyati vakolatiga kiradi.",
      qoshimcha: [
        "Mahalla fuqarolar yig'ini va mahalla hokim yordamchisi — dastlabki aniqlash uchun",
        "Viloyat (Toshkent shahar) hokimligi — yuqori turuvchi organ"
      ],
      bosqich: [],
      qonunlar: [
        { nom: "O'zbekiston Respublikasining \"Mahalliy davlat hokimiyati to'g'risida\"gi Qonuni", mazmun: "Hokimlarning hududni ijtimoiy-iqtisodiy rivojlantirish, obodonlashtirish va aholi murojaatlarini hal etish bo'yicha vakolatlari belgilangan." }
      ],
      dalillar: ["foto"],
      mavzu: "hududni obodonlashtirish masalasi",
      standartTalab: "Ko'rsatilgan muammoni o'rganib chiqib, uni bartaraf etish choralarini ko'rish va muddatini belgilash.",
      tekshir: function (t) {
        const w = [];
        if (!/(ko'cha|mahalla|uy|massiv|kvartal|dahasi|tuman|улиц|дом|махалл|район|street|district|kóshe|máhálle)/i.test(t)) {
          w.push({ id: "obodon_place", lvl: "yellow", t: "Muammo joyi aniq ko'rsatilmagan", fix: "Ko'cha nomi, uy raqami yoki mo'ljalni aniq yozing." });
        }
        return w;
      }
    }
  ];

  const UMUMIY = {
    id: "umumiy",
    nom: "Umumiy masala",
    kalit: [],
    organ: "Tuman (shahar) hokimligi yoki masala yuzasidan vakolatli tashkilot",
    kimga: "Tuman (shahar) hokimiga",
    sabab:
      "Muammo toifasi aniq aniqlanmadi. Tuman (shahar) hokimligi murojaatni qabul qilib, zarur bo'lsa uni vakolatli organga yuborishi mumkin. Murojaatlar to'g'risidagi Qonunga ko'ra, murojaat vakolatli bo'lmagan organga yuborilsa, u tegishli organga yo'naltiriladi va bu haqda murojaat etuvchiga xabar beriladi.",
    qoshimcha: [
      "Prezidentning Xalq qabulxonasi / Virtual qabulxonasi (pm.gov.uz) — boshqa organlar masalani hal etmagan hollarda"
    ],
    bosqich: [],
    qonunlar: [],
    dalillar: [],
    mavzu: "murojaatimda bayon etilgan masala",
    standartTalab: "Bayon etilgan masalani o'rganib chiqib, qonunchilikka muvofiq hal etish.",
    tekshir: function () {
      return [{ id: "umumiy_organ", lvl: "yellow", t: "Vakolatli organ aniq aniqlanmadi", fix: "Muammoni batafsilroq yozing (kim, qayerda, qanday huquqingiz buzildi) — shunda aniq organ tavsiya qilinadi." }];
    }
  };

  return { MUROJAAT_QONUNI, DALILLAR, TURLAR, TUR_KALITLARI, TOIFALAR, UMUMIY };
})();
