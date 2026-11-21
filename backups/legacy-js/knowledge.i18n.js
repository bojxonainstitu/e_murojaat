/* =====================================================================
   E-murojaat — BILIMLAR BAZASI TARJIMALARI (ru / kaa / en)
   knowledge.js dagi oʻzbekcha maʼlumotlar ustiga qoʻyiladi.
   Qonun moddalari raqamlari bu yerda ham YOʻQ.
   "kalit" — toifani aniqlash uchun qoʻshimcha kalit soʻzlar
   (barcha tillar birga ishlatiladi, shuning uchun ruscha yoki
   inglizcha yozilgan muammo ham toʻgʻri toifaga tushadi).
   ===================================================================== */
window.EM_KB_I18N = (function () {
  "use strict";

  const KALIT = {
    mehnat: ["зарплат", "заработн", "работодател", "уволи", "увольн", "трудов", "отпуск", "работаю", "salary", "wage", "employer", "dismiss", "fired", "payslip",
      "jumıs", "is haqı", "aylıq", "jumıs beriwshi"],
    istemol: ["товар", "магазин", "продав", "купил", "гарант", "брак", "возврат", "стиральн", "product", "shop", "store", "seller", "bought", "warranty", "refund", "defective",
      "dúkán", "satıwshı", "satıp al", "kepillik", "sapasız"],
    kommunal: ["свет", "электр", "газ", "вода", "воды", "отоплен", "коммунал", "счётчик", "счетчик", "мусор", "electricity", "power", "water", "heating", "utility", "meter",
      "suw", "jılıtıw"],
    talim: ["школ", "детский сад", "учител", "учеб", "студент", "контракт", "school", "kindergarten", "teacher", "student", "university", "mektep", "oqıtıwshı", "balalar baqshası"],
    sogliq: ["больниц", "поликлиник", "врач", "лечени", "лекарств", "скорая", "hospital", "clinic", "doctor", "treatment", "ambulance", "medicine", "emlewxana", "shıpaker"],
    pensiya: ["пенси", "пособи", "инвалидн", "pension", "allowance", "benefit", "disability", "nápaqa", "járdem puli"],
    korrupsiya: ["взятк", "коррупц", "вымогал", "bribe", "corruption", "para", "korrupciya"],
    obodon: ["дорог", "улиц", "освещен", "фонар", "арык", "махалл", "детская площадк", "road", "street", "streetlight", "pothole", "playground", "kóshe", "jol"]
  };

  const SHIKOYAT = ["нарушен", "не выплач", "отказал", "отказыва", "грубо", "некачествен", "задерж", "незаконн", "не работает", "нет света", "жалоб",
    "not paid", "refused", "violat", "defective", "delay", "illegal", "not working", "complain", "no electricity",
    "buzıl", "tólenbe", "bas tart", "sapasız", "keshik", "islemey", "joq"];
  const TAKLIF = ["предлага", "предложен", "было бы хорошо", "целесообразно", "propose", "suggest", "would be good", "recommend", "usınıs", "usınaman"];

  const L = {};

  /* ============================ РУССКИЙ ============================ */
  L.ru = {
    murojaatQonuni: {
      nom: "Закон Республики Узбекистан «Об обращениях физических и юридических лиц»",
      inline: "Законом Республики Узбекистан «Об обращениях физических и юридических лиц»",
      mazmun: "Определяет порядок подачи обращений, требования к ним (Ф.И.О., место жительства, суть обращения, для электронного обращения — контактные данные), сроки рассмотрения и обязанность дать ответ. Анонимные обращения не рассматриваются."
    },
    turlar: {
      ariza: { nom: "Заявление", sarlavha: "ЗАЯВЛЕНИЕ", tarif: "Просьба гражданина о содействии в реализации его прав, свобод и законных интересов." },
      shikoyat: { nom: "Жалоба", sarlavha: "ЖАЛОБА", tarif: "Требование о восстановлении и защите нарушенных прав, свобод и законных интересов." },
      taklif: { nom: "Предложение", sarlavha: "ПРЕДЛОЖЕНИЕ", tarif: "Рекомендации по совершенствованию деятельности государства, общества и организаций." }
    },
    dalillar: {
      chek: "Копия документа, подтверждающего оплату (чек / квитанция)", shartnoma: "Копия договора",
      yozishma: "Копии переписки сторон (письма, сообщения, ответы)", foto: "Фото / видеоматериалы"
    },
    cats: {
      mehnat: {
        nom: "Трудовые отношения", organ: "Территориальное (областное / районное) подразделение Государственной инспекции труда",
        kimga: "Руководителю территориального подразделения Государственной инспекции труда",
        sabab: "Государственный надзор за соблюдением трудового законодательства осуществляет инспекция труда: она проверяет случаи несвоевременной выплаты заработной платы, нарушения условий трудового договора и незаконного увольнения.",
        qoshimcha: ["Письменное требование самому работодателю (руководителю предприятия) — часто первый и самый быстрый путь", "Министерство занятости и трудовых отношений — вышестоящий орган", "Суд по гражданским делам — если спор не урегулирован (по трудовым спорам)"],
        bosqich: ["Подайте письменное обращение работодателю (сохраните копию с отметкой о принятии).", "При отсутствии результата — направьте жалобу в Государственную инспекцию труда.", "Если спор не решён — обратитесь в суд с исковым заявлением."],
        qonunlar: [{ nom: "Трудовой кодекс Республики Узбекистан", mazmun: "Работодатель обязан выплачивать работнику заработную плату в установленные сроки и в полном объёме; при задержке работник вправе на защиту и компенсацию; установлен порядок разрешения трудовых споров." }],
        mavzu: "нарушение трудовых прав в связи с невыплатой заработной платы",
        standartTalab: "Взыскать начисленную, но не выплаченную заработную плату в полном объёме и обеспечить выплату компенсации за период задержки, предусмотренной законодательством."
      },
      istemol: {
        nom: "Права потребителей", organ: "Территориальное управление Комитета по развитию конкуренции и защите прав потребителей",
        kimga: "Начальнику территориального управления Комитета по развитию конкуренции и защите прав потребителей",
        sabab: "Это уполномоченный государственный орган, контролирующий соблюдение прав потребителей: рассматривает обращения о некачественном товаре, невыполнении гарантийных обязательств и неправомерных действиях продавца.",
        qoshimcha: ["Письменная претензия продавцу (изготовителю) — первый обязательный практический шаг", "Суд по гражданским делам — если требование не исполнено добровольно"],
        bosqich: ["Вручите продавцу письменную претензию, получите отметку о принятии на копии.", "При отказе или отсутствии ответа — подайте жалобу в орган по защите прав потребителей.", "При необходимости — обратитесь в суд (для исков потребителей предусмотрены льготы — проверьте на lex.uz)."],
        qonunlar: [
          { nom: "Закон Республики Узбекистан «О защите прав потребителей»", mazmun: "Потребитель вправе получить качественный и безопасный товар; при обнаружении недостатков он может потребовать замены товара, соразмерного уменьшения цены, безвозмездного устранения недостатков или возврата уплаченной суммы; в течение гарантийного срока продавец несёт ответственность." },
          { nom: "Гражданский кодекс Республики Узбекистан", mazmun: "Общие правила о договоре купли-продажи, требованиях к качеству товара и возмещении ущерба при нарушении договорных обязательств." }
        ],
        mavzu: "нарушение моих прав как потребителя в связи с продажей некачественного товара",
        standartTalab: "Принять меры, обязывающие продавца заменить некачественный товар на качественный или полностью вернуть уплаченные денежные средства."
      },
      kommunal: {
        nom: "Коммунальные услуги", organ: "Соответствующее территориальное предприятие (электро-, газо-, водоснабжения)",
        kimga: "Руководителю территориального предприятия коммунального снабжения",
        sabab: "Предприятие, непосредственно оказывающее услугу, отвечает за восстановление снабжения, перерасчёт и исполнение обязательств по договору с абонентом.",
        qoshimcha: ["Хокимият района (города) — координирует качество коммунальных услуг на территории", "Комитет по развитию конкуренции и защите прав потребителей — если нарушены права потребителя", "Отраслевая инспекция (энергетика / газ / вода) — если предприятие не принимает мер (точное название проверьте на lex.uz и официальных сайтах)"],
        bosqich: ["Подайте письменное обращение в колл-центр или районное отделение предприятия.", "Если проблема не решена — обратитесь в хокимият района (города)."],
        qonunlar: [
          { nom: "Закон Республики Узбекистан «О защите прав потребителей»", mazmun: "Потребитель коммунальных услуг вправе получать качественные и бесперебойные услуги и требовать перерасчёта платы за некачественную услугу." },
          { nom: "Гражданский кодекс Республики Узбекистан", mazmun: "Обязательства сторон по договору снабжения (энергией, газом, водой)." }
        ],
        mavzu: "предоставление коммунальных услуг",
        standartTalab: "Незамедлительно восстановить предоставление коммунальной услуги и произвести перерасчёт платы за период её отсутствия."
      },
      talim: {
        nom: "Образование", organ: "Районный (городской) отдел дошкольного и школьного образования (по вопросам высшего образования — руководство вуза)",
        kimga: "Заведующему районным (городским) отделом дошкольного и школьного образования",
        sabab: "Непосредственно управляет и контролирует образовательные учреждения на территории, рассматривает обращения на решения их руководства.",
        qoshimcha: ["Руководитель образовательного учреждения (директор / заведующая) — для первичного обращения", "Министерство дошкольного и школьного образования (в высшем образовании — профильное министерство) — вышестоящий орган"],
        bosqich: [],
        qonunlar: [{ nom: "Закон Республики Узбекистан «Об образовании»", mazmun: "Гарантируются право каждого на образование, обязанности образовательных учреждений и педагогов, права обучающихся." }],
        mavzu: "вопрос, связанный с правом на образование",
        standartTalab: "Изучить изложенную ситуацию и принять меры по устранению нарушения права на образование."
      },
      sogliq: {
        nom: "Здравоохранение", organ: "Районное (городское) медицинское объединение / руководство медицинского учреждения",
        kimga: "Руководителю районного (городского) медицинского объединения",
        sabab: "Управляет государственными медицинскими учреждениями на территории, рассматривает обращения о качестве медицинской помощи и поведении персонала.",
        qoshimcha: ["Областное (г. Ташкента) управление здравоохранения", "Министерство здравоохранения Республики Узбекистан — вышестоящий орган"],
        bosqich: [],
        qonunlar: [{ nom: "Закон Республики Узбекистан «Об охране здоровья граждан»", mazmun: "Установлены право граждан на медицинскую помощь, обязанности медицинских работников и основы защиты прав пациентов." }],
        mavzu: "оказание медицинской помощи",
        standartTalab: "Провести служебную проверку по изложенному факту и обеспечить оказание надлежащей медицинской помощи."
      },
      pensiya: {
        nom: "Социальное обеспечение", organ: "Районный (городской) отдел Национального агентства социальной защиты",
        kimga: "Начальнику районного (городского) отдела Национального агентства социальной защиты",
        sabab: "Уполномоченная система по вопросам назначения и выплаты пенсий, пособий и социальной помощи (точное структурное подразделение уточните на официальных сайтах).",
        qoshimcha: ["Районное отделение Внебюджетного Пенсионного фонда — по вопросам расчёта пенсии", "Хокимият района (города)"],
        bosqich: [],
        qonunlar: [{ nom: "Закон Республики Узбекистан «О государственном пенсионном обеспечении граждан»", mazmun: "Установлены условия назначения пенсии, порядок её исчисления и выплаты." }],
        mavzu: "пенсионное обеспечение и выплата пособий",
        standartTalab: "Повторно рассмотреть вопрос назначения / выплаты пенсии (пособия) в соответствии с законодательством."
      },
      korrupsiya: {
        nom: "Коррупционные проявления", organ: "Агентство по противодействию коррупции Республики Узбекистан",
        kimga: "Директору Агентства по противодействию коррупции Республики Узбекистан",
        sabab: "Специально уполномоченный орган, реализующий государственную политику в сфере противодействия коррупции и рассматривающий сообщения о коррупционных фактах.",
        qoshimcha: ["Органы прокуратуры — при наличии признаков преступления", "Вышестоящий орган соответствующей организации"],
        bosqich: [],
        qonunlar: [{ nom: "Закон Республики Узбекистан «О противодействии коррупции»", mazmun: "Установлены основы предупреждения коррупционных правонарушений и защиты лиц, сообщающих о них." }],
        mavzu: "сообщение о коррупционном факте",
        standartTalab: "Провести проверку по изложенному факту и принять предусмотренные законом меры в отношении виновных лиц."
      },
      obodon: {
        nom: "Благоустройство и местные вопросы", organ: "Хокимият района (города)",
        kimga: "Хокиму района (города)",
        sabab: "Благоустройство территории, дороги, уличное освещение, местная инфраструктура и бытовые проблемы населения относятся к полномочиям местной государственной власти.",
        qoshimcha: ["Сход граждан махалли и помощник хокима махалли — для первичного выяснения", "Хокимият области (г. Ташкента) — вышестоящий орган"],
        bosqich: [],
        qonunlar: [{ nom: "Закон Республики Узбекистан «О государственной власти на местах»", mazmun: "Установлены полномочия хокимов по социально-экономическому развитию и благоустройству территории и решению обращений населения." }],
        mavzu: "благоустройство территории",
        standartTalab: "Изучить указанную проблему, принять меры по её устранению и установить срок."
      },
      umumiy: {
        nom: "Общий вопрос", organ: "Хокимият района (города) или организация, уполномоченная по данному вопросу",
        kimga: "Хокиму района (города)",
        sabab: "Категория проблемы не определена точно. Хокимият района (города) примет обращение и при необходимости направит его в уполномоченный орган. Согласно закону об обращениях, обращение, поступившее в неуполномоченный орган, направляется в соответствующий орган с уведомлением заявителя.",
        qoshimcha: ["Народная приёмная / Виртуальная приёмная Президента (pm.gov.uz) — если другие органы не решили вопрос"],
        bosqich: [], qonunlar: [],
        mavzu: "вопрос, изложенный в обращении",
        standartTalab: "Изучить изложенный вопрос и решить его в соответствии с законодательством."
      }
    }
  };

  /* ============================ ENGLISH ============================ */
  L.en = {
    murojaatQonuni: {
      nom: "Law of the Republic of Uzbekistan “On Appeals of Individuals and Legal Entities”",
      inline: "Law of the Republic of Uzbekistan “On Appeals of Individuals and Legal Entities”",
      mazmun: "Sets the procedure for filing appeals, their requirements (full name, place of residence, substance, and contact details for online appeals), time limits for consideration and the duty to reply. Anonymous appeals are not considered."
    },
    turlar: {
      ariza: { nom: "Application", sarlavha: "APPLICATION", tarif: "A citizen’s request for assistance in exercising their rights, freedoms and legitimate interests." },
      shikoyat: { nom: "Complaint", sarlavha: "COMPLAINT", tarif: "A demand to restore and protect violated rights, freedoms and legitimate interests." },
      taklif: { nom: "Proposal", sarlavha: "PROPOSAL", tarif: "Recommendations for improving the work of the state, society and organizations." }
    },
    dalillar: {
      chek: "Copy of the payment document (receipt / invoice)", shartnoma: "Copy of the contract",
      yozishma: "Copies of correspondence between the parties (letters, messages, replies)", foto: "Photo / video materials"
    },
    cats: {
      mehnat: {
        nom: "Labor relations", organ: "Regional (district) division of the State Labor Inspectorate",
        kimga: "To the Head of the regional division of the State Labor Inspectorate",
        sabab: "The labor inspectorate exercises state supervision over compliance with labor legislation: it inspects late payment of wages, breaches of employment contracts and unlawful dismissal.",
        qoshimcha: ["A written demand to the employer (company head) — often the first and fastest route", "Ministry of Employment and Labor Relations — the higher authority", "Civil court — if the dispute is not settled (labor disputes)"],
        bosqich: ["Send a written appeal to the employer (keep a copy stamped as received).", "If there is no result — file a complaint with the State Labor Inspectorate.", "If the dispute remains unresolved — file a claim with the court."],
        qonunlar: [{ nom: "Labor Code of the Republic of Uzbekistan", mazmun: "The employer must pay wages on time and in full; in case of delay the employee is entitled to protection and compensation; the procedure for resolving labor disputes is established." }],
        mavzu: "the violation of my labor rights through non-payment of wages",
        standartTalab: "Recover the accrued but unpaid wages in full and ensure payment of compensation for the delay as provided by law."
      },
      istemol: {
        nom: "Consumer rights", organ: "Regional office of the Committee for the Development of Competition and Protection of Consumer Rights",
        kimga: "To the Head of the regional office of the Committee for the Development of Competition and Protection of Consumer Rights",
        sabab: "This is the competent state body supervising consumer rights: it handles appeals about defective goods, failure to honor warranty obligations and unlawful actions of sellers.",
        qoshimcha: ["A written claim to the seller (manufacturer) — the first practical step", "Civil court — if the claim is not satisfied voluntarily"],
        bosqich: ["Hand the seller a written claim and get the copy stamped as received.", "If refused or unanswered — file a complaint with the consumer protection authority.", "If necessary — go to court (consumer claims enjoy certain privileges — check on lex.uz)."],
        qonunlar: [
          { nom: "Law of the Republic of Uzbekistan “On Protection of Consumer Rights”", mazmun: "The consumer is entitled to goods of proper quality and safety; if defects are found, they may demand replacement, a proportionate price reduction, free repair or a refund; the seller is liable during the warranty period." },
          { nom: "Civil Code of the Republic of Uzbekistan", mazmun: "General rules on sales contracts, product quality requirements and compensation for damage when contractual obligations are breached." }
        ],
        mavzu: "the violation of my consumer rights through the sale of a defective product",
        standartTalab: "Take measures obliging the seller to replace the defective product with one of proper quality or to refund the money paid in full."
      },
      kommunal: {
        nom: "Utilities", organ: "The relevant regional utility company (electricity / gas / water supply)",
        kimga: "To the Head of the regional utility company",
        sabab: "The company providing the service is responsible for restoring supply, recalculating charges and fulfilling its contract with the subscriber.",
        qoshimcha: ["District (city) khokimiyat — coordinates the quality of utilities in the area", "Committee for the Development of Competition and Protection of Consumer Rights — if consumer rights are violated", "The sector inspectorate (energy / gas / water) — if the utility takes no action (check the exact name on lex.uz and official websites)"],
        bosqich: ["Send a written appeal to the utility’s call center or district branch.", "If the problem is not solved — apply to the district (city) khokimiyat."],
        qonunlar: [
          { nom: "Law of the Republic of Uzbekistan “On Protection of Consumer Rights”", mazmun: "A utility consumer is entitled to quality, uninterrupted services and to a recalculation of charges for poor service." },
          { nom: "Civil Code of the Republic of Uzbekistan", mazmun: "Obligations of the parties under supply contracts (energy, gas, water)." }
        ],
        mavzu: "the provision of utility services",
        standartTalab: "Immediately restore the utility service and recalculate the charges for the period without service."
      },
      talim: {
        nom: "Education", organ: "District (city) department of preschool and school education (for higher education — the university administration)",
        kimga: "To the Head of the district (city) department of preschool and school education",
        sabab: "It directly manages and supervises educational institutions in the area and considers appeals against decisions of their management.",
        qoshimcha: ["Head of the educational institution (principal) — for the first appeal", "Ministry of Preschool and School Education (for higher education — the relevant ministry) — the higher authority"],
        bosqich: [],
        qonunlar: [{ nom: "Law of the Republic of Uzbekistan “On Education”", mazmun: "Guarantees everyone’s right to education, the duties of educational institutions and teachers, and the rights of learners." }],
        mavzu: "a matter concerning the right to education",
        standartTalab: "Examine the situation described and take measures to remedy the violation of the right to education."
      },
      sogliq: {
        nom: "Healthcare", organ: "District (city) medical association / management of the medical institution",
        kimga: "To the Head of the district (city) medical association",
        sabab: "It manages public medical institutions in the area and considers appeals about the quality of care and staff conduct.",
        qoshimcha: ["Regional (Tashkent city) health department", "Ministry of Health of the Republic of Uzbekistan — the higher authority"],
        bosqich: [],
        qonunlar: [{ nom: "Law of the Republic of Uzbekistan “On Protection of Citizens’ Health”", mazmun: "Establishes citizens’ right to medical care, the duties of medical workers and the basis for protecting patients’ rights." }],
        mavzu: "the provision of medical care",
        standartTalab: "Conduct an official inspection of the facts described and ensure that proper medical care is provided."
      },
      pensiya: {
        nom: "Social security", organ: "District (city) office of the National Agency for Social Protection",
        kimga: "To the Head of the district (city) office of the National Agency for Social Protection",
        sabab: "The competent system for granting and paying pensions, allowances and social assistance (check the exact structural unit on official websites).",
        qoshimcha: ["District branch of the Extra-budgetary Pension Fund — for pension calculation issues", "District (city) khokimiyat"],
        bosqich: [],
        qonunlar: [{ nom: "Law of the Republic of Uzbekistan “On State Pension Provision of Citizens”", mazmun: "Establishes the conditions for granting pensions and the procedure for calculating and paying them." }],
        mavzu: "pension and allowance payments",
        standartTalab: "Reconsider the granting / payment of the pension (allowance) in accordance with the law."
      },
      korrupsiya: {
        nom: "Corruption", organ: "Anti-Corruption Agency of the Republic of Uzbekistan",
        kimga: "To the Director of the Anti-Corruption Agency of the Republic of Uzbekistan",
        sabab: "The specially authorized body implementing state anti-corruption policy and considering reports of corruption.",
        qoshimcha: ["Prosecutor’s office — if there are signs of a crime", "The higher body of the organization concerned"],
        bosqich: [],
        qonunlar: [{ nom: "Law of the Republic of Uzbekistan “On Combating Corruption”", mazmun: "Establishes the basis for preventing corruption offences and protecting persons who report them." }],
        mavzu: "a report of a corruption case",
        standartTalab: "Investigate the facts described and take legal measures against those responsible."
      },
      obodon: {
        nom: "Local infrastructure", organ: "District (city) khokimiyat",
        kimga: "To the Khokim of the district (city)",
        sabab: "Landscaping, roads, street lighting, local infrastructure and everyday problems of residents fall within the powers of local state authority.",
        qoshimcha: ["Mahalla citizens’ assembly and the khokim’s assistant in the mahalla — for initial clarification", "Regional (Tashkent city) khokimiyat — the higher authority"],
        bosqich: [],
        qonunlar: [{ nom: "Law of the Republic of Uzbekistan “On State Power in Localities”", mazmun: "Establishes the powers of khokims in socio-economic development and improvement of the territory and in resolving residents’ appeals." }],
        mavzu: "the improvement of local infrastructure",
        standartTalab: "Examine the problem indicated, take measures to eliminate it and set a deadline."
      },
      umumiy: {
        nom: "General matter", organ: "District (city) khokimiyat or the organization competent for the matter",
        kimga: "To the Khokim of the district (city)",
        sabab: "The category was not determined precisely. The district (city) khokimiyat will accept the appeal and forward it to the competent body if necessary. Under the law on appeals, an appeal sent to a non-competent body is forwarded to the relevant one and the applicant is notified.",
        qoshimcha: ["The President’s People’s Reception / Virtual Reception (pm.gov.uz) — if other bodies have not resolved the matter"],
        bosqich: [], qonunlar: [],
        mavzu: "the matter set out in this appeal",
        standartTalab: "Examine the matter described and resolve it in accordance with the law."
      }
    }
  };

  /* ============================ QARAQALPAQSHA ============================ */
  L.kaa = {
    murojaatQonuni: {
      nom: "Ózbekstan Respublikasınıń «Fizikalıq hám yuridikalıq shaxslardıń múrájatları haqqında»ǵı Nızamı",
      inline: "Ózbekstan Respublikasınıń «Fizikalıq hám yuridikalıq shaxslardıń múrájatları haqqında»ǵı Nızamı",
      mazmun: "Múrájat etiw tártibin, oǵan qoyılatuǵın talaplardı (F.A.Á., jasaw ornı, múrájat mazmunı, elektron múrájatta — baylanıs maǵlıwmatları), kórip shıǵıw múddetlerin hám juwap beriw minnetin belgileydi. Anonim múrájatlar kórip shıǵılmaydı."
    },
    turlar: {
      ariza: { nom: "Arza", sarlavha: "ARZA", tarif: "Puqaranıń huqıqları, erkinlikleri hám nızamlı mápleri ámelge asırıwǵa kómeklesiw haqqındaǵı ótinishi." },
      shikoyat: { nom: "Shaǵım", sarlavha: "SHAǴIM", tarif: "Buzılǵan huqıqlar, erkinlikler hám nızamlı máplerdi tiklew hám qorǵaw haqqındaǵı talap." },
      taklif: { nom: "Usınıs", sarlavha: "USINIS", tarif: "Mámleket hám jámiyet xızmetin, shólkemler jumısın jetilistiriw boyınsha usınıslar." }
    },
    dalillar: {
      chek: "Tólemdi tastıyıqlawshı hújjettiń (chek / kvitanciya) nusqası", shartnoma: "Shártnamanıń nusqası",
      yozishma: "Tárepler arasındaǵı jazısıwlardıń (xat, xabar, juwap) nusqaları", foto: "Foto / video materiallar"
    },
    cats: {
      mehnat: {
        nom: "Miynet qatnasıqları", organ: "Mámleketlik miynet inspekciyasınıń aymaqlıq (wálayat / rayon) bólimi",
        kimga: "Mámleketlik miynet inspekciyası aymaqlıq bóliminiń basshısına",
        sabab: "Miynet nızamshılıǵınıń orınlanıwı ústinen mámleketlik qadaǵalawdı miynet inspekciyası ámelge asıradı: is haqınıń óz waqtında tólenbewi, miynet shártnaması shártleriniń buzılıwı hám nızamsız jumıstan bosatıw jaǵdayların tekseredi.",
        qoshimcha: ["Jumıs beriwshiniń óz basshısına jazba talap — kóbinese birinshi hám eń tez jol", "Bántlik hám miynet qatnasıqları ministrligi — joqarı turıwshı organ", "Puqaralıq isleri boyınsha sud — dawa sheshilmese"],
        bosqich: ["Jumıs beriwshige jazba múrájat etiń (qabıl etilgeni haqqında belgi qoyılǵan nusqanı saqlań).", "Nátiyje bolmasa — Mámleketlik miynet inspekciyasına shaǵım jiberiń.", "Dawa sheshilmese — sudqa múrájat etiń."],
        qonunlar: [{ nom: "Ózbekstan Respublikasınıń Miynet kodeksi", mazmun: "Jumıs beriwshi xızmetkerge is haqın belgilengen múddetlerde hám tolıq muǵdarda tólewi shárt; keshiktirilgende xızmetker qorǵalıw hám kompensaciya alıw huqıqına iye; miynet dawların sheshiw tártibi belgilengen." }],
        mavzu: "is haqın tólew menen baylanıslı miynet huqıqlarım máselesi",
        standartTalab: "Esaplanǵan, biraq tólenbegen is haqın tolıq óndirip beriw hám keshiktirilgen dáwir ushın kompensaciya tóleniwin támiyinlew."
      },
      istemol: {
        nom: "Tutınıwshılar huqıqları", organ: "Básekini rawajlandırıw hám tutınıwshılar huqıqların qorǵaw komitetiniń aymaqlıq basqarması",
        kimga: "Básekini rawajlandırıw hám tutınıwshılar huqıqların qorǵaw komiteti aymaqlıq basqarmasınıń baslıǵına",
        sabab: "Tutınıwshılar huqıqlarınıń saqlanıwın qadaǵalawshı wákilatlı mámleketlik organ: sapasız tovar, kepillik minnetlemeleriniń orınlanbawı hám satıwshınıń nızamǵa qayshı háreketleri boyınsha múrájatlardı kórip shıǵadı.",
        qoshimcha: ["Satıwshıǵa jazba talapnama (pretenziya) — birinshi ámeliy qádem", "Puqaralıq isleri boyınsha sud — talap óz erki menen orınlanbasa"],
        bosqich: ["Satıwshıǵa jazba talapnama beriń, nusqasına qabıl belgisin qoydırıń.", "Bas tartılsa yamasa juwap bolmasa — tutınıwshılar huqıqların qorǵaw organına shaǵım etiń.", "Zárúr bolsa — sudqa múrájat etiń (lex.uz da tekseriń)."],
        qonunlar: [
          { nom: "Ózbekstan Respublikasınıń «Tutınıwshılardıń huqıqların qorǵaw haqqında»ǵı Nızamı", mazmun: "Tutınıwshı sapalı hám qáwipsiz tovar alıw huqıqına iye; sapasız tovar anıqlanǵanda onı almastırıwdı, bahasın kemeytiwdi, biypul dúzetiwdi yamasa tólengen puldı qaytarıwdı talap etiwi múmkin." },
          { nom: "Ózbekstan Respublikasınıń Puqaralıq kodeksi", mazmun: "Satıp alıw-satıw shártnaması, tovar sapasına qoyılatuǵın talaplar hám shártnama minnetlemeleri buzılǵanda zıyandı qaplaw boyınsha ulıwma qaǵıydalar." }
        ],
        mavzu: "sapasız tovar menen baylanıslı tutınıwshı huqıqlarım máselesi",
        standartTalab: "Satıwshını sapasız tovardı sapalısına almastırıwǵa yamasa tólengen puldı tolıq qaytarıwǵa májbúrlew ilajların kóriw."
      },
      kommunal: {
        nom: "Kommunal xızmetler", organ: "Tiyisli aymaqlıq támiynat kárxanası (elektr / gaz / suw támiynatı)",
        kimga: "Aymaqlıq kommunal támiynat kárxanasınıń basshısına",
        sabab: "Xızmetti tikkeley kórsetiwshi kárxana támiynattı tiklew, esap-kitaptı qayta kórip shıǵıw hám abonent penen dúzilgen shártnama minnetlemelerin orınlawǵa juwapker.",
        qoshimcha: ["Rayon (qala) hákimligi — aymaqta kommunal xızmetler sapasın muwapıqlastıradı", "Básekini rawajlandırıw hám tutınıwshılar huqıqların qorǵaw komiteti", "Tarawdaǵı qadaǵalaw inspekciyası (anıq atın lex.uz hám rásmiy saytlardan tekseriń)"],
        bosqich: ["Kárxananıń call-orayına yamasa rayon bólimine jazba múrájat etiń.", "Másele sheshilmese — rayon (qala) hákimligine múrájat etiń."],
        qonunlar: [
          { nom: "Ózbekstan Respublikasınıń «Tutınıwshılardıń huqıqların qorǵaw haqqında»ǵı Nızamı", mazmun: "Kommunal xızmet tutınıwshısı sapalı hám úzliksiz xızmet alıw, sapasız xızmet ushın tólemdi qayta esaplawdı talap etiw huqıqına iye." },
          { nom: "Ózbekstan Respublikasınıń Puqaralıq kodeksi", mazmun: "Támiynat (energiya, gaz, suw) shártnaması boyınsha tárepleriniń minnetlemeleri." }
        ],
        mavzu: "kommunal xızmet kórsetiliwi máselesi",
        standartTalab: "Kommunal xızmet kórsetiliwin dárhal tiklew hám xızmet kórsetilmegen dáwir ushın tólemdi qayta esaplaw."
      },
      talim: {
        nom: "Bilimlendiriw", organ: "Rayon (qala) mektepke shekemgi hám mektep bilimlendiriw bólimi",
        kimga: "Rayon (qala) mektepke shekemgi hám mektep bilimlendiriw bóliminiń baslıǵına",
        sabab: "Aymaqtaǵı bilimlendiriw mákemelerin tikkeley basqaradı hám qadaǵalaydı, olardıń basshılıǵınıń sheshimleri ústinen múrájatlardı kórip shıǵadı.",
        qoshimcha: ["Bilimlendiriw mákemesiniń basshısı (direktor) — birinshi múrájat ushın", "Mektepke shekemgi hám mektep bilimlendiriw ministrligi — joqarı turıwshı organ"],
        bosqich: [],
        qonunlar: [{ nom: "Ózbekstan Respublikasınıń «Bilimlendiriw haqqında»ǵı Nızamı", mazmun: "Hár kimniń bilim alıw huqıqı, bilimlendiriw mákemeleri hám pedagoglardıń minnetleri, oqıwshılardıń huqıqları kepillenedi." }],
        mavzu: "bilim alıw huqıqı menen baylanıslı másele",
        standartTalab: "Kórsetilgen jaǵdaydı úyrenip, bilim alıw huqıqınıń buzılıwın saplastırıw ilajların kóriw."
      },
      sogliq: {
        nom: "Densawlıqtı saqlaw", organ: "Rayon (qala) medicinalıq birlespesi / medicinalıq mákeme basshılıǵı",
        kimga: "Rayon (qala) medicinalıq birlespesiniń basshısına",
        sabab: "Aymaqtaǵı mámleketlik medicinalıq mákemelerdi basqaradı, medicinalıq járdem sapası hám xızmetkerlerdiń minez-qulqı boyınsha múrájatlardı kórip shıǵadı.",
        qoshimcha: ["Qaraqalpaqstan Respublikası (wálayat) densawlıqtı saqlaw ministrligi / basqarması", "Ózbekstan Respublikası Densawlıqtı saqlaw ministrligi — joqarı turıwshı organ"],
        bosqich: [],
        qonunlar: [{ nom: "Ózbekstan Respublikasınıń «Puqaralardıń densawlıǵın saqlaw haqqında»ǵı Nızamı", mazmun: "Puqaralardıń medicinalıq járdem alıw huqıqı, medicina xızmetkerleriniń minnetleri hám nawqaslar huqıqların qorǵaw tiykarları belgilengen." }],
        mavzu: "medicinalıq járdem kórsetiliwi máselesi",
        standartTalab: "Kórsetilgen jaǵday boyınsha xızmet tekseriwin ótkeriw hám tiyisli medicinalıq járdem kórsetiliwin támiyinlew."
      },
      pensiya: {
        nom: "Social támiynat", organ: "Social qorǵaw milliy agentliginiń rayon (qala) bólimi",
        kimga: "Social qorǵaw milliy agentligi rayon (qala) bóliminiń baslıǵına",
        sabab: "Pensiya, nápaqa hám social járdem tayınlaw hám tólew máseleleri boyınsha wákilatlı sistema (anıq bólimin rásmiy saytlardan tekseriń).",
        qoshimcha: ["Byudjetten tıs Pensiya fondınıń rayon bólimi", "Rayon (qala) hákimligi"],
        bosqich: [],
        qonunlar: [{ nom: "Ózbekstan Respublikasınıń «Puqaralardı mámleketlik pensiya menen támiyinlew haqqında»ǵı Nızamı", mazmun: "Pensiya tayınlaw shártleri, pensiya muǵdarın esaplaw hám tólew tártibi belgilengen." }],
        mavzu: "pensiya hám nápaqa támiynatı máselesi",
        standartTalab: "Pensiya (nápaqa) tayınlaw / tólew máselesin nızamshılıq tiykarında qayta kórip shıǵıw."
      },
      korrupsiya: {
        nom: "Korrupciya jaǵdayları", organ: "Ózbekstan Respublikası Korrupciyaǵa qarsı gúresiw agentligi",
        kimga: "Ózbekstan Respublikası Korrupciyaǵa qarsı gúresiw agentliginiń direktorına",
        sabab: "Korrupciyaǵa qarsı gúresiw tarawında mámleketlik siyasattı ámelge asırıwshı hám korrupciya jaǵdayları haqqındaǵı xabarlardı kórip shıǵatuǵın arnawlı wákilatlı organ.",
        qoshimcha: ["Prokuratura organları — jınayat belgileri bolsa", "Tiyisli shólkemniń joqarı turıwshı organı"],
        bosqich: [],
        qonunlar: [{ nom: "Ózbekstan Respublikasınıń «Korrupciyaǵa qarsı gúresiw haqqında»ǵı Nızamı", mazmun: "Korrupciyalıq huqıqbuzarlıqlardıń aldın alıw, olar haqqında xabar beriwshi shaxslardı qorǵaw tiykarları belgilengen." }],
        mavzu: "korrupciyalıq jaǵday haqqında xabar",
        standartTalab: "Bayan etilgen jaǵday boyınsha tekseriw ótkeriw hám ayıplı shaxslarǵa qarata nızamlı ilajlar kóriw."
      },
      obodon: {
        nom: "Abadanlastırıw hám jergilikli máseleler", organ: "Rayon (qala) hákimligi",
        kimga: "Rayon (qala) hákimine",
        sabab: "Aymaqtı abadanlastırıw, jollar, kóshe jaqtılandırıwı, jergilikli infrastruktura hám xalıqtıń kúndelikli máselelerin sheshiw jergilikli mámleketlik hákimiyat wákilligine kiredi.",
        qoshimcha: ["Máhálle puqaralar jıyını hám máhálle hákim járdemshisi — dáslepki anıqlaw ushın", "Qaraqalpaqstan Respublikası Ministrler Keńesi / wálayat hákimligi — joqarı turıwshı organ"],
        bosqich: [],
        qonunlar: [{ nom: "Ózbekstan Respublikasınıń «Jergilikli mámleketlik hákimiyat haqqında»ǵı Nızamı", mazmun: "Hákimlerdiń aymaqtı social-ekonomikalıq rawajlandırıw, abadanlastırıw hám xalıq múrájatların sheshiw boyınsha wákillikleri belgilengen." }],
        mavzu: "aymaqtı abadanlastırıw máselesi",
        standartTalab: "Kórsetilgen máseleni úyrenip, onı saplastırıw ilajların kóriw hám múddetin belgilew."
      },
      umumiy: {
        nom: "Ulıwma másele", organ: "Rayon (qala) hákimligi yamasa másele boyınsha wákilatlı shólkem",
        kimga: "Rayon (qala) hákimine",
        sabab: "Másele toparı anıq anıqlanbadı. Rayon (qala) hákimligi múrájattı qabıl etip, zárúr bolsa onı wákilatlı organǵa jiberiwi múmkin.",
        qoshimcha: ["Prezidenttiń Xalıq qabılxanası / Virtual qabılxanası (pm.gov.uz) — basqa organlar máseleni sheshpegen jaǵdayda"],
        bosqich: [], qonunlar: [],
        mavzu: "múrájatımda bayan etilgen másele",
        standartTalab: "Bayan etilgen máseleni úyrenip, nızamshılıqqa muwapıq sheshiw."
      }
    }
  };

  return { KALIT: KALIT, SHIKOYAT: SHIKOYAT, TAKLIF: TAKLIF, L: L };
})();
