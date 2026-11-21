/* =====================================================================
   E-murojaat — TARJIMALAR (i18n)
   Tillar: uz (oʻzbek, lotin — yangi imlo), ru (русский),
           kaa (qaraqalpaqsha, latın), en (English)
   Foydalanish: EM_I18N.t("kalit", {oʻzgaruvchi: qiymat})
   HTML: data-i18n="kalit" (matn), data-i18n-html (HTML),
         data-i18n-ph (placeholder), data-i18n-aria (aria-label)
   ===================================================================== */
window.EM_I18N = (function () {
  "use strict";

  const LANGS = [
    { code: "uz", label: "OʻZ", name: "Oʻzbekcha" },
    { code: "ru", label: "РУ", name: "Русский" },
    { code: "kaa", label: "QQ", name: "Qaraqalpaqsha" },
    { code: "en", label: "EN", name: "English" }
  ];

  const D = {};

  /* ============================ OʻZBEKCHA ============================ */
  D.uz = {
    "meta.title": "E-murojaat — tezkor va shaffof murojaatlar tizimi",
    "land.badge": "LexHakaton · MVP",
    "land.tagline": "Tezkor va shaffof murojaatlar tizimi",
    "land.lead": "Muammoingizni oddiy soʻzlar bilan yozing — tizim vakolatli organni aniqlaydi, qaytarilish xavfini tekshiradi va rasmiy murojaat hujjatini tayyorlab beradi.",
    "land.cta": "Murojaat qilish",
    "land.demo": "Namunani koʻrish",
    "land.note": "Bepul · Roʻyxatdan oʻtishsiz · Internetsiz ham ishlaydi",
    "land.f1t": "Kimga murojaat qilish", "land.f1d": "Vakolatli va yuqori turuvchi organni aniqlaydi",
    "land.f2t": "Qaytarilishdan himoya", "land.f2d": "Yetishmayotgan rekvizitlarni oldindan koʻrsatadi",
    "land.f3t": "Tayyor hujjat", "land.f3d": "Tahrirlash, DOCX va PDF shaklida yuklab olish",
    "lang.label": "Til",

    "hdr.sub": "Kimga, qanday shaklda va qaysi qonunga asoslanib murojaat qilishni koʻrsatadi, qaytarilish xavfini tekshiradi va tayyor rasmiy hujjat beradi",
    "hdr.home": "Bosh sahifa",
    "mode.demo": "Demo rejim (lokal mantiq)", "mode.ai": "AI rejimi: yoqilgan",
    "btn.aiSettings": "⚙ AI sozlamalari",
    "demo.label": "Tezkor demo:",
    "demo.ishhaqi": "💼 Ish haqi kechikishi", "demo.tovar": "🛒 Sifatsiz tovar", "demo.chala": "⚠ Chala maʼlumot / Xavf testi",

    "form.title": "Murojaat maʼlumotlari",
    "lg.applicant": "Ariza beruvchi", "lg.appeal": "Murojaat", "lg.evidence": "Mavjud dalillar",
    "f.fish": "F.I.Sh.", "ph.fish": "Masalan: Aliyev Akmal Karimovich",
    "f.manzil": "Yashash manzili", "ph.manzil": "Viloyat, tuman/shahar, koʻcha, uy, xonadon",
    "f.aloqa": "Telefon yoki elektron pochta", "ph.aloqa": "+998 90 123 45 67 yoki ism@pochta.uz",
    "f.tur": "Hujjat turi", "tur.auto": "Avto-aniqlash", "tur.ariza": "Ariza", "tur.shikoyat": "Shikoyat", "tur.taklif": "Taklif",
    "f.tavsif": "Muammo tavsifi", "ph.tavsif": "Oddiy soʻzlar bilan yozing: nima boʻldi, qachon, qayerda, kim bilan. Masalan: “3 oydan beri ish joyimda maosh berishmayapti...”",
    "counter": "{n} belgi",
    "f.talab": "Aniq talab", "ph.talab": "Organdan aniq nima qilishini soʻraysiz? Masalan: ish haqimni undirib berishni",
    "ev.chek": "Chek / kvitansiya", "ev.shartnoma": "Shartnoma", "ev.yozishma": "Yozishmalar", "ev.foto": "Foto / video",
    "f.boshqa": "Boshqa ilova (ixtiyoriy)", "ph.boshqa": "Masalan: kafolat taloni nusxasi",
    "btn.analyze": "Tahlil qilish", "btn.analyzing": "AI tahlil qilmoqda…", "btn.generate": "Murojaatni tayyorlab ber", "btn.reset": "Formani tozalash",

    "c1.title": "Qaysi organga murojaat qilinadi?",
    "c1.ph": "Maʼlumotlarni kiritib, <b>“Tahlil qilish”</b> tugmasini bosing — vakolatli organ shu yerda koʻrsatiladi.",
    "c2.title": "Qanday shaklda murojaat qilinadi?",
    "c2.ph": "Murojaat turi, topshirish usuli va ilova qilinadigan hujjatlar roʻyxati.",
    "c3.title": "Qaysi qonunchilikka asoslanib va qaytarilishdan himoya",
    "c3.ph": "Tegishli qonunchilik va hujjatning toʻliqligi (qaytarilish xavfi) tekshiruvi.",
    "c4.title": "Tayyor rasmiy murojaat matni",
    "badge.green": "Tayyor", "badge.yellow": "Diqqat", "badge.red": "Xavf",
    "tag.ai": "AI tahlili", "tag.local": "Lokal tahlil",
    "c1.organ": "Asosiy vakolatli organ", "c1.why": "Nega aynan shu organ?", "c1.steps": "Tavsiya etiladigan ketma-ketlik", "c1.extra": "Qoʻshimcha / yuqori turuvchi organlar",
    "c2.type": "Murojaat turi", "c2.auto": " (avto-aniqlandi)", "c2.ways": "Topshirish shakli",
    "way.e.t": "Elektron", "way.e.d": "Yagona interaktiv davlat xizmatlari portali (my.gov.uz) yoki organning rasmiy sayti / murojaatlar tizimi orqali. Elektron pochta koʻrsatilishi shart.",
    "way.w.t": "Yozma", "way.w.d": "Organ devonxonasiga shaxsan (2 nusxada — biriga qabul belgisini qoʻydiring) yoki buyurtma xat orqali pochta bilan.",
    "way.o.t": "Ogʻzaki", "way.o.d": "Rahbarning shaxsiy yoki sayyor qabulida — lekin yozma nusxa qoldirish tavsiya etiladi.",
    "c2.evidence": "Ilova qilinadigan hujjatlar / dalillar", "c2.recommended": "(tavsiya etiladi, belgilanmagan)",
    "c2.noEvidence": "Dalil belgilanmagan. Imkon qadar hujjat va foto ilova qiling.",
    "c2.idHint": "Shaxsni tasdiqlovchi hujjat nusxasini ham tayyorlab qoʻying — ayrim organlar uni soʻrashi mumkin.",
    "c3.basis": "Huquqiy asos",
    "c3.lexHint": "⚖ Qonun nomlari va ularning amaldagi tahririni <a href=\"https://lex.uz\" target=\"_blank\" rel=\"noopener\">lex.uz</a> da albatta tekshiring. Bu yerda modda raqamlari ataylab keltirilmagan.",
    "c3.check": "Qaytarilishdan himoya — toʻliqlik tekshiruvi",
    "risk.green": "Past xavf — hujjat toʻliq", "risk.yellow": "Oʻrtacha xavf — toʻldirish tavsiya etiladi", "risk.red": "Yuqori xavf — murojaat qaytarilishi mumkin",
    "c3.allOk": "✓ Barcha majburiy rekvizitlar mavjud: F.I.Sh., manzil, aloqa, mohiyat, aniq talab va dalillar.",
    "doc.hint": "✎ Matnni toʻgʻridan-toʻgʻri ichiga kirib tahrirlashingiz mumkin. Qizil maydonlar — toʻldirilishi shart.",
    "btn.copy": "📋 Nusxa olish", "btn.docx": "📄 DOCX yuklash", "btn.print": "🖨 Chop etish / PDF",
    "doc.empty": "Hujjat hali shakllantirilmagan. “Murojaatni tayyorlab ber” tugmasini bosing.",
    "docMeta.red": "Qizil bilan belgilangan maydonlarni toʻldiring — aks holda murojaat qaytarilishi mumkin.",
    "docMeta.yellow": "Hujjat tayyor, lekin 3-kartochkadagi tavsiyalarni koʻrib chiqing.",
    "docMeta.green": "Hujjat toʻliq. Yuborishdan oldin oʻqib chiqing.",
    "legalBasis": "Huquqiy asos: ",
    "aria.paper": "Rasmiy murojaat matni (tahrirlanadi)",

    "foot.disclaimer": "⚠ Ushbu hujjat loyihasi sunʼiy intellekt yordamida shakllantirildi. Yuborishdan oldin maʼlumotlar, vakolatli organ va qonunchilik talablarini shaxsan tekshirib chiqing.",
    "foot.links": "Qonunchilik hujjatlarining amaldagi tahriri: <a href=\"https://lex.uz\" target=\"_blank\" rel=\"noopener\">lex.uz</a> · Elektron murojaat: <a href=\"https://my.gov.uz\" target=\"_blank\" rel=\"noopener\">my.gov.uz</a> · E-murojaat — LexHakaton MVP",

    "ai.title": "AI sozlamalari",
    "ai.text": "Real AI tahlili uchun Anthropic (Claude) API kalitini kiriting. Kalit faqat shu brauzerda saqlanadi. Kalitsiz sayt lokal (demo) mantiq bilan toʻliq ishlaydi.",
    "ai.key": "API kaliti",
    "ai.hint": "Ishlab chiqarishda kalitni brauzerda saqlamang — <code>js/ai.js</code> dagi <code>AI_CONFIG.endpoint</code> ni oʻz serveringizga (proxy) yoʻnaltiring. Batafsil: README.md.",
    "ai.clear": "Kalitni oʻchirish", "ai.cancel": "Bekor qilish", "ai.save": "Saqlash",

    "t.demo": "Demo maʼlumotlar yuklandi: {name}",
    "t.aiOk": "AI tahlili muvaffaqiyatli bajarildi",
    "t.aiFail": "AI javob bermadi — lokal mantiq ishlatildi ({err})",
    "t.docReady": "Rasmiy murojaat matni tayyorlandi — uni tahrirlashingiz mumkin",
    "t.needDoc": "Avval “Murojaatni tayyorlab ber” tugmasini bosing",
    "t.copied": "Hujjat matni nusxalandi",
    "t.docxOk": "DOCX fayl yuklab olindi", "t.docxErr": "DOCX yaratishda xato: {err}", "t.docxMissing": "DOCX kutubxonasi yuklanmadi (vendor/docx.umd.js)",
    "t.aiOn": "AI rejimi yoqildi", "t.aiOff": "Demo rejimga qaytildi", "t.keyRemoved": "API kaliti oʻchirildi — demo rejim",

    "w.fish_empty.t": "F.I.Sh. koʻrsatilmagan", "w.fish_empty.f": "Familiya, ism va otasining ismini toʻliq yozing. Murojaatlar toʻgʻrisidagi qonunga koʻra anonim murojaatlar koʻrib chiqilmaydi.",
    "w.fish_short.t": "F.I.Sh. toʻliq emas", "w.fish_short.f": "Familiya, ism va otasining ismini toʻliq yozing (masalan: Aliyev Akmal Karimovich).",
    "w.manzil_empty.t": "Yashash manzili koʻrsatilmagan", "w.manzil_empty.f": "Viloyat, tuman/shahar, koʻcha, uy va xonadon raqamini yozing — javob shu manzilga yuboriladi; manzilsiz murojaat qaytarilishi mumkin.",
    "w.manzil_short.t": "Manzil toʻliq emas", "w.manzil_short.f": "Koʻcha nomi, uy (va xonadon) raqamini qoʻshing.",
    "w.aloqa_empty.t": "Aloqa maʼlumoti yoʻq", "w.aloqa_empty.f": "Telefon raqami yoki elektron pochtani kiriting. Elektron murojaatda javob olish uchun elektron pochta manzili talab etiladi.",
    "w.aloqa_bad.t": "Aloqa maʼlumoti notoʻgʻri formatda", "w.aloqa_bad.f": "Telefon: +998 XX XXX XX XX yoki toʻgʻri elektron pochta manzilini kiriting.",
    "w.tavsif_empty.t": "Murojaat mohiyati bayon etilmagan", "w.tavsif_empty.f": "Nima sodir boʻlganini, qachon, qayerda va kim tomonidan — oddiy soʻzlar bilan yozing.",
    "w.tavsif_short.t": "Muammo tavsifi juda qisqa", "w.tavsif_short.f": "Kamida 2–3 gapda yozing: nima boʻldi, qachondan beri, kimga murojaat qilgansiz va qanday javob olgansiz.",
    "w.talab_empty.t": "Aniq talab koʻrsatilmagan", "w.talab_empty.f": "Organdan aniq nima qilishini soʻrayotganingizni yozing. Talabsiz murojaat boʻyicha mazmunli qaror qabul qilish qiyin va u “tushuntirish berildi” deb yopilishi mumkin.",
    "w.sana.t": "Voqea sanasi / muddati koʻrsatilmagan", "w.sana.f": "Holat qachon yuz berganini yoki qachondan beri davom etayotganini yozing.",
    "w.dalil_none.t": "Dalillar ilova qilinmagan", "w.dalil_none.f": "Chek, shartnoma, yozishma yoki foto kabi dalillar murojaatning asoslanganligini oshiradi.",
    "w.dalil_rec.t": "Tavsiya etilgan dalil yoʻq: {name}", "w.dalil_rec.f": "Bu toifadagi murojaatlarda ushbu hujjat odatda soʻraladi. Mavjud boʻlsa — ilova qiling.",
    "w.mehnat_org.t": "Ish beruvchi (tashkilot nomi) koʻrsatilmagan", "w.mehnat_org.f": "Ish beruvchining toʻliq nomini (masalan, “…” MChJ) va manzilini yozing — inspeksiya kimni tekshirishini bilishi kerak.",
    "w.mehnat_sum.t": "Qarz miqdori yoki davri koʻrsatilmagan", "w.mehnat_sum.f": "Necha oylik ish haqi va taxminan qancha summa toʻlanmaganini raqamlarda koʻrsating.",
    "w.istemol_chek.t": "Xarid cheki / kvitansiya belgilanmagan", "w.istemol_chek.f": "Chek yoki toʻlov kvitansiyasi tovar sotib olinganini isbotlovchi asosiy hujjat. Boʻlmasa, bank koʻchirmasi yoki guvohlarni koʻrsating.",
    "w.istemol_seller.t": "Sotuvchi (doʻkon) nomi va manzili aniq emas", "w.istemol_seller.f": "Doʻkon nomi, manzili yoki internet-doʻkon saytini kiriting.",
    "w.istemol_date.t": "Xarid sanasi va narxi koʻrsatilmagan", "w.istemol_date.f": "Tovar qachon va qancha summaga sotib olinganini yozing — kafolat muddatini hisoblash uchun zarur.",
    "w.kommunal_acc.t": "Abonent (shaxsiy hisob) raqami koʻrsatilmagan", "w.kommunal_acc.f": "Kvitansiyadagi abonent / shaxsiy hisob raqamini yozing — korxona sizni aynan shu raqam orqali topadi.",
    "w.talim_school.t": "Taʼlim muassasasi aniq koʻrsatilmagan", "w.talim_school.f": "Muassasa nomi va raqamini yozing (masalan, 45-umumtaʼlim maktabi).",
    "w.korrupsiya_fact.t": "Faktlarga asoslanganlik", "w.korrupsiya_fact.f": "Faqat oʻzingiz bilgan va isbotlay oladigan faktlarni yozing: sana, joy, shaxs lavozimi. Bila turib yolgʻon xabar berish qonun boʻyicha javobgarlikka sabab boʻladi.",
    "w.obodon_place.t": "Muammo joyi aniq koʻrsatilmagan", "w.obodon_place.f": "Koʻcha nomi, uy raqami yoki moʻljalni aniq yozing.",
    "w.umumiy_organ.t": "Vakolatli organ aniq aniqlanmadi", "w.umumiy_organ.f": "Muammoni batafsilroq yozing (kim, qayerda, qanday huquqingiz buzildi) — shunda aniq organ tavsiya qilinadi.",

    "doc.from": "fuqaro {fish}dan",
    "doc.addr": "Yashash manzili: ", "doc.contact": "Tel. / e-pochta: ",
    "doc.about": "({mavzu} yuzasidan)",
    "doc.intro": "Men, {fish}, {mavzu} yuzasidan quyidagilarni maʼlum qilaman.",
    "doc.law": "{laws}ga muvofiq {mazmun}.",
    "doc.lawJoin": " hamda ",
    "doc.proc": "{law}ga muvofiq murojaatim belgilangan tartib va muddatlarda koʻrib chiqilishi hamda uning natijasi yuzasidan menga javob berilishi lozim.",
    "doc.ask": "Yuqoridagilarni inobatga olib, Sizdan quyidagilarni soʻrayman:",
    "doc.askTaklif": "Yuqoridagilardan kelib chiqib, quyidagi taklifimni koʻrib chiqishingizni soʻrayman:",
    "doc.itemShikoyat": "Huquqlarim buzilishiga yoʻl qoʻygan shaxslarga nisbatan qonunchilikda belgilangan choralar koʻrilishini.",
    "doc.itemReply": "Murojaatimni koʻrib chiqish natijalari toʻgʻrisida menga qonunda belgilangan muddatda yozma (elektron) javob berilishini.",
    "doc.noTalab": "Aniq talab kiritilmagan — masalan: {x}",
    "doc.noBayon": "Muammo mohiyati bayon etilmagan",
    "doc.att": "Ilovalar:", "doc.attNone": "Ilovalar: yoʻq.", "doc.attItem": "{x} — 1 nusxada.",
    "doc.date": "Sana: {d}", "doc.dateSuffix": " yil", "doc.sign": "Imzo: ____________ ",
    "ph.d.fish": "F.I.Sh.", "ph.d.manzil": "yashash manzili", "ph.d.aloqa": "telefon yoki e-pochta"
  };

  /* ============================ РУССКИЙ ============================ */
  D.ru = {
    "meta.title": "E-murojaat — система быстрых и прозрачных обращений",
    "land.badge": "LexHakaton · MVP",
    "land.tagline": "Система быстрых и прозрачных обращений",
    "land.lead": "Опишите проблему простыми словами — система определит уполномоченный орган, проверит риск возврата обращения и подготовит официальный документ.",
    "land.cta": "Подать обращение",
    "land.demo": "Посмотреть пример",
    "land.note": "Бесплатно · Без регистрации · Работает без интернета",
    "land.f1t": "Куда обращаться", "land.f1d": "Определяет уполномоченный и вышестоящий орган",
    "land.f2t": "Защита от возврата", "land.f2d": "Заранее показывает недостающие реквизиты",
    "land.f3t": "Готовый документ", "land.f3d": "Редактирование, скачивание в DOCX и PDF",
    "lang.label": "Язык",

    "hdr.sub": "Подсказывает, куда, в какой форме и на основании какого закона обращаться, проверяет риск возврата и готовит официальный документ",
    "hdr.home": "Главная",
    "mode.demo": "Демо-режим (локальная логика)", "mode.ai": "Режим ИИ: включён",
    "btn.aiSettings": "⚙ Настройки ИИ",
    "demo.label": "Быстрое демо:",
    "demo.ishhaqi": "💼 Задержка зарплаты", "demo.tovar": "🛒 Некачественный товар", "demo.chala": "⚠ Неполные данные / Тест риска",

    "form.title": "Данные обращения",
    "lg.applicant": "Заявитель", "lg.appeal": "Обращение", "lg.evidence": "Имеющиеся доказательства",
    "f.fish": "Ф.И.О.", "ph.fish": "Например: Алиев Акмал Каримович",
    "f.manzil": "Адрес проживания", "ph.manzil": "Область, район/город, улица, дом, квартира",
    "f.aloqa": "Телефон или электронная почта", "ph.aloqa": "+998 90 123 45 67 или имя@почта.uz",
    "f.tur": "Вид документа", "tur.auto": "Автоопределение", "tur.ariza": "Заявление", "tur.shikoyat": "Жалоба", "tur.taklif": "Предложение",
    "f.tavsif": "Описание проблемы", "ph.tavsif": "Напишите простыми словами: что произошло, когда, где, с кем. Например: «Уже 3 месяца на работе не выплачивают зарплату...»",
    "counter": "{n} симв.",
    "f.talab": "Конкретное требование", "ph.talab": "Что именно вы просите сделать? Например: взыскать мою заработную плату",
    "ev.chek": "Чек / квитанция", "ev.shartnoma": "Договор", "ev.yozishma": "Переписка", "ev.foto": "Фото / видео",
    "f.boshqa": "Другое приложение (необязательно)", "ph.boshqa": "Например: копия гарантийного талона",
    "btn.analyze": "Анализировать", "btn.analyzing": "ИИ анализирует…", "btn.generate": "Подготовить обращение", "btn.reset": "Очистить форму",

    "c1.title": "В какой орган обращаться?",
    "c1.ph": "Заполните данные и нажмите <b>«Анализировать»</b> — здесь появится уполномоченный орган.",
    "c2.title": "В какой форме обращаться?",
    "c2.ph": "Вид обращения, способ подачи и перечень прилагаемых документов.",
    "c3.title": "Правовое основание и защита от возврата",
    "c3.ph": "Применимое законодательство и проверка полноты документа (риск возврата).",
    "c4.title": "Готовый текст официального обращения",
    "badge.green": "Готово", "badge.yellow": "Внимание", "badge.red": "Риск",
    "tag.ai": "Анализ ИИ", "tag.local": "Локальный анализ",
    "c1.organ": "Основной уполномоченный орган", "c1.why": "Почему именно этот орган?", "c1.steps": "Рекомендуемая последовательность", "c1.extra": "Дополнительные / вышестоящие органы",
    "c2.type": "Вид обращения", "c2.auto": " (определён автоматически)", "c2.ways": "Способ подачи",
    "way.e.t": "Электронно", "way.e.d": "Через Единый портал интерактивных государственных услуг (my.gov.uz) или официальный сайт / систему обращений органа. Укажите электронную почту.",
    "way.w.t": "Письменно", "way.w.d": "Лично в канцелярию органа (в 2 экземплярах — на одном поставьте отметку о принятии) или заказным письмом по почте.",
    "way.o.t": "Устно", "way.o.d": "На личном или выездном приёме руководителя — но рекомендуется оставить письменную копию.",
    "c2.evidence": "Прилагаемые документы / доказательства", "c2.recommended": "(рекомендуется, не отмечено)",
    "c2.noEvidence": "Доказательства не отмечены. По возможности приложите документы и фото.",
    "c2.idHint": "Подготовьте также копию документа, удостоверяющего личность, — некоторые органы могут её запросить.",
    "c3.basis": "Правовое основание",
    "c3.lexHint": "⚖ Обязательно проверьте названия законов и их действующую редакцию на <a href=\"https://lex.uz\" target=\"_blank\" rel=\"noopener\">lex.uz</a>. Номера статей здесь намеренно не приводятся.",
    "c3.check": "Защита от возврата — проверка полноты",
    "risk.green": "Низкий риск — документ полный", "risk.yellow": "Средний риск — рекомендуется дополнить", "risk.red": "Высокий риск — обращение могут вернуть",
    "c3.allOk": "✓ Все обязательные реквизиты есть: Ф.И.О., адрес, контакты, суть, конкретное требование и доказательства.",
    "doc.hint": "✎ Текст можно редактировать прямо здесь. Красные поля — обязательны к заполнению.",
    "btn.copy": "📋 Копировать", "btn.docx": "📄 Скачать DOCX", "btn.print": "🖨 Печать / PDF",
    "doc.empty": "Документ ещё не сформирован. Нажмите «Подготовить обращение».",
    "docMeta.red": "Заполните поля, отмеченные красным, — иначе обращение могут вернуть.",
    "docMeta.yellow": "Документ готов, но просмотрите рекомендации в карточке 3.",
    "docMeta.green": "Документ полный. Перед отправкой прочитайте его.",
    "legalBasis": "Правовое основание: ",
    "aria.paper": "Текст официального обращения (редактируемый)",

    "foot.disclaimer": "⚠ Проект документа сформирован с помощью искусственного интеллекта. Перед отправкой лично проверьте данные, уполномоченный орган и требования законодательства.",
    "foot.links": "Действующая редакция законодательства: <a href=\"https://lex.uz\" target=\"_blank\" rel=\"noopener\">lex.uz</a> · Электронное обращение: <a href=\"https://my.gov.uz\" target=\"_blank\" rel=\"noopener\">my.gov.uz</a> · E-murojaat — LexHakaton MVP",

    "ai.title": "Настройки ИИ",
    "ai.text": "Для анализа с помощью ИИ введите API-ключ Anthropic (Claude). Ключ хранится только в этом браузере. Без ключа сайт полностью работает на локальной (демо) логике.",
    "ai.key": "API-ключ",
    "ai.hint": "В продакшене не храните ключ в браузере — направьте <code>AI_CONFIG.endpoint</code> в <code>js/ai.js</code> на свой сервер (прокси). Подробнее: README.md.",
    "ai.clear": "Удалить ключ", "ai.cancel": "Отмена", "ai.save": "Сохранить",

    "t.demo": "Загружены демо-данные: {name}",
    "t.aiOk": "Анализ ИИ успешно выполнен",
    "t.aiFail": "ИИ не ответил — использована локальная логика ({err})",
    "t.docReady": "Текст официального обращения готов — его можно редактировать",
    "t.needDoc": "Сначала нажмите «Подготовить обращение»",
    "t.copied": "Текст документа скопирован",
    "t.docxOk": "Файл DOCX скачан", "t.docxErr": "Ошибка при создании DOCX: {err}", "t.docxMissing": "Библиотека DOCX не загружена (vendor/docx.umd.js)",
    "t.aiOn": "Режим ИИ включён", "t.aiOff": "Возврат в демо-режим", "t.keyRemoved": "API-ключ удалён — демо-режим",

    "w.fish_empty.t": "Не указаны Ф.И.О.", "w.fish_empty.f": "Укажите полностью фамилию, имя и отчество. Согласно закону об обращениях анонимные обращения не рассматриваются.",
    "w.fish_short.t": "Ф.И.О. указаны не полностью", "w.fish_short.f": "Укажите фамилию, имя и отчество полностью (например: Алиев Акмал Каримович).",
    "w.manzil_empty.t": "Не указан адрес проживания", "w.manzil_empty.f": "Укажите область, район/город, улицу, дом и квартиру — ответ направляется по этому адресу; без адреса обращение могут вернуть.",
    "w.manzil_short.t": "Адрес неполный", "w.manzil_short.f": "Добавьте название улицы, номер дома (и квартиры).",
    "w.aloqa_empty.t": "Нет контактных данных", "w.aloqa_empty.f": "Укажите телефон или электронную почту. Для ответа на электронное обращение требуется адрес электронной почты.",
    "w.aloqa_bad.t": "Контакты в неверном формате", "w.aloqa_bad.f": "Телефон: +998 XX XXX XX XX или корректный адрес электронной почты.",
    "w.tavsif_empty.t": "Суть обращения не изложена", "w.tavsif_empty.f": "Напишите простыми словами: что произошло, когда, где и кем.",
    "w.tavsif_short.t": "Описание слишком короткое", "w.tavsif_short.f": "Напишите хотя бы 2–3 предложения: что случилось, с какого времени, куда вы обращались и какой ответ получили.",
    "w.talab_empty.t": "Не указано конкретное требование", "w.talab_empty.f": "Напишите, что именно вы просите сделать. Без требования трудно принять решение по существу, и обращение могут закрыть с формулировкой «даны разъяснения».",
    "w.sana.t": "Не указана дата / срок события", "w.sana.f": "Укажите, когда произошла ситуация или с какого времени она продолжается.",
    "w.dalil_none.t": "Доказательства не приложены", "w.dalil_none.f": "Чек, договор, переписка или фото повышают обоснованность обращения.",
    "w.dalil_rec.t": "Нет рекомендуемого доказательства: {name}", "w.dalil_rec.f": "В обращениях этой категории такой документ обычно запрашивается. Если он есть — приложите.",
    "w.mehnat_org.t": "Не указан работодатель (название организации)", "w.mehnat_org.f": "Укажите полное название работодателя (например, ООО «…») и его адрес — инспекция должна знать, кого проверять.",
    "w.mehnat_sum.t": "Не указаны сумма или период задолженности", "w.mehnat_sum.f": "Укажите цифрами, за сколько месяцев и примерно какая сумма не выплачена.",
    "w.istemol_chek.t": "Не отмечен чек / квитанция", "w.istemol_chek.f": "Чек или квитанция — основной документ, подтверждающий покупку. Если его нет, укажите банковскую выписку или свидетелей.",
    "w.istemol_seller.t": "Не ясны название и адрес продавца (магазина)", "w.istemol_seller.f": "Укажите название магазина, адрес или сайт интернет-магазина.",
    "w.istemol_date.t": "Не указаны дата и цена покупки", "w.istemol_date.f": "Укажите, когда и за какую сумму куплен товар — это нужно для расчёта гарантийного срока.",
    "w.kommunal_acc.t": "Не указан номер абонента (лицевого счёта)", "w.kommunal_acc.f": "Укажите номер абонента / лицевого счёта из квитанции — по нему вас найдёт предприятие.",
    "w.talim_school.t": "Не указано учебное заведение", "w.talim_school.f": "Укажите название и номер учреждения (например, общеобразовательная школа № 45).",
    "w.korrupsiya_fact.t": "Опора на факты", "w.korrupsiya_fact.f": "Пишите только факты, которые знаете и можете подтвердить: дата, место, должность лица. Заведомо ложное сообщение влечёт ответственность по закону.",
    "w.obodon_place.t": "Не указано точное место проблемы", "w.obodon_place.f": "Укажите название улицы, номер дома или ориентир.",
    "w.umumiy_organ.t": "Уполномоченный орган точно не определён", "w.umumiy_organ.f": "Опишите проблему подробнее (кто, где, какое право нарушено) — тогда будет предложен конкретный орган.",

    "doc.from": "от гражданина(-ки) {fish}",
    "doc.addr": "Адрес проживания: ", "doc.contact": "Тел. / эл. почта: ",
    "doc.about": "(по вопросу: {mavzu})",
    "doc.intro": "Я, {fish}, по вопросу: {mavzu} — сообщаю следующее.",
    "doc.law": "Законодательство ({laws}) устанавливает следующее: {mazmun}.",
    "doc.lawJoin": "; ",
    "doc.proc": "В соответствии с {law} моё обращение должно быть рассмотрено в установленном порядке и сроки, а по его результатам мне должен быть дан ответ.",
    "doc.ask": "На основании изложенного прошу Вас:",
    "doc.askTaklif": "Исходя из изложенного, прошу рассмотреть следующее предложение:",
    "doc.itemShikoyat": "Принять предусмотренные законодательством меры в отношении лиц, допустивших нарушение моих прав.",
    "doc.itemReply": "Дать мне письменный (электронный) ответ о результатах рассмотрения обращения в установленный законом срок.",
    "doc.noTalab": "Требование не указано — например: {x}",
    "doc.noBayon": "Суть проблемы не изложена",
    "doc.att": "Приложения:", "doc.attNone": "Приложения: нет.", "doc.attItem": "{x} — в 1 экз.",
    "doc.date": "Дата: {d}", "doc.dateSuffix": " г.", "doc.sign": "Подпись: ____________ ",
    "ph.d.fish": "Ф.И.О.", "ph.d.manzil": "адрес проживания", "ph.d.aloqa": "телефон или эл. почта"
  };

  /* ============================ QARAQALPAQSHA ============================ */
  D.kaa = {
    "meta.title": "E-murojaat — tez hám ashıq múrájatlar sisteması",
    "land.badge": "LexHakaton · MVP",
    "land.tagline": "Tez hám ashıq múrájatlar sisteması",
    "land.lead": "Máselenizdi ápiwayı sózler menen jazıń — sistema wákilatlı organdı anıqlaydı, qaytarılıw qáwipin tekseredi hám rásmiy múrájat hújjetin tayarlap beredi.",
    "land.cta": "Múrájat etiw",
    "land.demo": "Úlgini kóriw",
    "land.note": "Biypul · Dizimnen ótiwsiz · Internetsiz de isleydi",
    "land.f1t": "Kimge múrájat etiw", "land.f1d": "Wákilatlı hám joqarı turıwshı organdı anıqlaydı",
    "land.f2t": "Qaytarılıwdan qorǵaw", "land.f2d": "Jetispeytuǵın rekvizitlerdi aldınnan kórsetedi",
    "land.f3t": "Tayar hújjet", "land.f3d": "Ózgertiw, DOCX hám PDF formatında júklep alıw",
    "lang.label": "Til",

    "hdr.sub": "Kimge, qanday formada hám qaysı nızamǵa tiykarlanıp múrájat etiwdi kórsetedi, qaytarılıw qáwipin tekseredi hám tayar rásmiy hújjet beredi",
    "hdr.home": "Bas bet",
    "mode.demo": "Demo rejim (lokal logika)", "mode.ai": "JI rejimi: qosılǵan",
    "btn.aiSettings": "⚙ JI sazlawları",
    "demo.label": "Tez demo:",
    "demo.ishhaqi": "💼 Is haqınıń keshigiwi", "demo.tovar": "🛒 Sapasız tovar", "demo.chala": "⚠ Tolıq emes maǵlıwmat / Qáwip testi",

    "form.title": "Múrájat maǵlıwmatları",
    "lg.applicant": "Arza beriwshi", "lg.appeal": "Múrájat", "lg.evidence": "Bar dáliller",
    "f.fish": "F.A.Á.", "ph.fish": "Mısalı: Aliyev Akmal Karimovich",
    "f.manzil": "Jasaw mánzili", "ph.manzil": "Wálayat, rayon/qala, kóshe, úy, xana",
    "f.aloqa": "Telefon yamasa elektron pochta", "ph.aloqa": "+998 90 123 45 67 yamasa at@pochta.uz",
    "f.tur": "Hújjet túri", "tur.auto": "Avto-anıqlaw", "tur.ariza": "Arza", "tur.shikoyat": "Shaǵım", "tur.taklif": "Usınıs",
    "f.tavsif": "Máseleniń táriypi", "ph.tavsif": "Ápiwayı sózler menen jazıń: ne boldı, qashan, qay jerde, kim menen. Mısalı: «3 aydan beri jumıs ornımda aylıq berilmey atır...»",
    "counter": "{n} belgi",
    "f.talab": "Anıq talap", "ph.talab": "Organnan anıq ne islewdi soraysız? Mısalı: is haqımdı óndirip beriwdi",
    "ev.chek": "Chek / kvitanciya", "ev.shartnoma": "Shártnama", "ev.yozishma": "Jazısıwlar", "ev.foto": "Foto / video",
    "f.boshqa": "Basqa qosımsha (májbúriy emes)", "ph.boshqa": "Mısalı: kepillik talonınıń nusqası",
    "btn.analyze": "Talqılaw", "btn.analyzing": "JI talqılap atır…", "btn.generate": "Múrájattı tayarlap ber", "btn.reset": "Formanı tazalaw",

    "c1.title": "Qaysı organǵa múrájat etiledi?",
    "c1.ph": "Maǵlıwmatlardı kiritip, <b>«Talqılaw»</b> túymesin basıń — wákilatlı organ usı jerde kórsetiledi.",
    "c2.title": "Qanday formada múrájat etiledi?",
    "c2.ph": "Múrájat túri, tapsırıw usılı hám qosımsha hújjetler dizimi.",
    "c3.title": "Nızamshılıq tiykarı hám qaytarılıwdan qorǵaw",
    "c3.ph": "Tiyisli nızamshılıq hám hújjettiń tolıqlıǵın (qaytarılıw qáwipin) tekseriw.",
    "c4.title": "Tayar rásmiy múrájat teksti",
    "badge.green": "Tayar", "badge.yellow": "Itibar", "badge.red": "Qáwip",
    "tag.ai": "JI talqılawı", "tag.local": "Lokal talqılaw",
    "c1.organ": "Tiykarǵı wákilatlı organ", "c1.why": "Nege tap usı organ?", "c1.steps": "Usınılatuǵın izbe-izlik", "c1.extra": "Qosımsha / joqarı turıwshı organlar",
    "c2.type": "Múrájat túri", "c2.auto": " (avto-anıqlandı)", "c2.ways": "Tapsırıw forması",
    "way.e.t": "Elektron", "way.e.d": "Mámleketlik interaktiv xızmetlerdiń birden-bir portalı (my.gov.uz) yamasa organnıń rásmiy saytı arqalı. Elektron pochta kórsetiliwi shárt.",
    "way.w.t": "Jazba", "way.w.d": "Organ keńsesine ózińiz (2 nusqada — birewine qabıl etilgeni haqqında belgi qoydırıń) yamasa buyırtpa xat penen pochta arqalı.",
    "way.o.t": "Awızsha", "way.o.d": "Basshınıń jeke yamasa kóshpeli qabılında — biraq jazba nusqa qaldırıw usınıladı.",
    "c2.evidence": "Qosımsha etiletuǵın hújjetler / dáliller", "c2.recommended": "(usınıladı, belgilenbegen)",
    "c2.noEvidence": "Dálil belgilenbegen. Múmkinshiligi bolsa hújjet hám foto qosıń.",
    "c2.idHint": "Shaxstı tastıyıqlawshı hújjettiń nusqasın da tayarlap qoyıń — ayırım organlar onı sorawı múmkin.",
    "c3.basis": "Huqıqıy tiykar",
    "c3.lexHint": "⚖ Nızamlardıń atamaların hám ámeldegi redakciyasın <a href=\"https://lex.uz\" target=\"_blank\" rel=\"noopener\">lex.uz</a> saytında álbette tekseriń. Bul jerde statya nomerleri ádeyi keltirilmegen.",
    "c3.check": "Qaytarılıwdan qorǵaw — tolıqlıqtı tekseriw",
    "risk.green": "Tómen qáwip — hújjet tolıq", "risk.yellow": "Orta qáwip — tolıqtırıw usınıladı", "risk.red": "Joqarı qáwip — múrájat qaytarılıwı múmkin",
    "c3.allOk": "✓ Barlıq májbúriy rekvizitler bar: F.A.Á., mánzil, baylanıs, mazmun, anıq talap hám dáliller.",
    "doc.hint": "✎ Tekstti tikkeley usı jerde ózgertiwińiz múmkin. Qızıl maydanlar — tolıqtırılıwı shárt.",
    "btn.copy": "📋 Nusqa alıw", "btn.docx": "📄 DOCX júklew", "btn.print": "🖨 Basıp shıǵarıw / PDF",
    "doc.empty": "Hújjet ele qáliplestirilmegen. «Múrájattı tayarlap ber» túymesin basıń.",
    "docMeta.red": "Qızıl menen belgilengen maydanlardı tolıqtırıń — bolmasa múrájat qaytarılıwı múmkin.",
    "docMeta.yellow": "Hújjet tayar, biraq 3-kartochkadaǵı usınıslardı kórip shıǵıń.",
    "docMeta.green": "Hújjet tolıq. Jiberiwden aldın oqıp shıǵıń.",
    "legalBasis": "Huqıqıy tiykar: ",
    "aria.paper": "Rásmiy múrájat teksti (ózgertiledi)",

    "foot.disclaimer": "⚠ Bul hújjet joybarı jasalma intellekt járdeminde qáliplestirildi. Jiberiwden aldın maǵlıwmatlardı, wákilatlı organdı hám nızamshılıq talapların ózińiz tekserip shıǵıń.",
    "foot.links": "Nızamshılıq hújjetleriniń ámeldegi redakciyası: <a href=\"https://lex.uz\" target=\"_blank\" rel=\"noopener\">lex.uz</a> · Elektron múrájat: <a href=\"https://my.gov.uz\" target=\"_blank\" rel=\"noopener\">my.gov.uz</a> · E-murojaat — LexHakaton MVP",

    "ai.title": "JI sazlawları",
    "ai.text": "JI talqılawı ushın Anthropic (Claude) API giltin kiritiń. Gilt tek usı brauzerde saqlanadı. Giltsiz sayt lokal (demo) logika menen tolıq isleydi.",
    "ai.key": "API gilti",
    "ai.hint": "Óndiriste giltti brauzerde saqlamań — <code>js/ai.js</code> ishindegi <code>AI_CONFIG.endpoint</code> mánzilin óz serverińizge (proxy) baǵdarlań. Tolıǵıraq: README.md.",
    "ai.clear": "Giltti óshiriw", "ai.cancel": "Biykar etiw", "ai.save": "Saqlaw",

    "t.demo": "Demo maǵlıwmatlar júklendi: {name}",
    "t.aiOk": "JI talqılawı tabıslı orınlandı",
    "t.aiFail": "JI juwap bermedi — lokal logika qollanıldı ({err})",
    "t.docReady": "Rásmiy múrájat teksti tayar — onı ózgertiwińiz múmkin",
    "t.needDoc": "Aldın «Múrájattı tayarlap ber» túymesin basıń",
    "t.copied": "Hújjet teksti nusqalandı",
    "t.docxOk": "DOCX fayl júklep alındı", "t.docxErr": "DOCX jaratıwda qátelik: {err}", "t.docxMissing": "DOCX kitapxanası júklenbedi (vendor/docx.umd.js)",
    "t.aiOn": "JI rejimi qosıldı", "t.aiOff": "Demo rejimge qaytıldı", "t.keyRemoved": "API gilti óshirildi — demo rejim",

    "w.fish_empty.t": "F.A.Á. kórsetilmegen", "w.fish_empty.f": "Familiya, at hám ákesiniń atın tolıq jazıń. Múrájatlar haqqındaǵı nızamǵa muwapıq anonim múrájatlar kórip shıǵılmaydı.",
    "w.fish_short.t": "F.A.Á. tolıq emes", "w.fish_short.f": "Familiya, at hám ákesiniń atın tolıq jazıń (mısalı: Aliyev Akmal Karimovich).",
    "w.manzil_empty.t": "Jasaw mánzili kórsetilmegen", "w.manzil_empty.f": "Wálayat, rayon/qala, kóshe, úy hám xana nomerin jazıń — juwap usı mánzilge jiberiledi; mánzilsiz múrájat qaytarılıwı múmkin.",
    "w.manzil_short.t": "Mánzil tolıq emes", "w.manzil_short.f": "Kóshe atın, úy (hám xana) nomerin qosıń.",
    "w.aloqa_empty.t": "Baylanıs maǵlıwmatı joq", "w.aloqa_empty.f": "Telefon nomerin yamasa elektron pochtanı kiritiń. Elektron múrájatqa juwap alıw ushın elektron pochta mánzili talap etiledi.",
    "w.aloqa_bad.t": "Baylanıs maǵlıwmatı qáte formatta", "w.aloqa_bad.f": "Telefon: +998 XX XXX XX XX yamasa durıs elektron pochta mánzilin kiritiń.",
    "w.tavsif_empty.t": "Múrájattıń mazmunı bayan etilmegen", "w.tavsif_empty.f": "Ne bolǵanın, qashan, qay jerde hám kim tárepinen — ápiwayı sózler menen jazıń.",
    "w.tavsif_short.t": "Máseleniń táriypi júdá qısqa", "w.tavsif_short.f": "Keminde 2–3 gápte jazıń: ne boldı, qashannan beri, kimge múrájat ettińiz hám qanday juwap aldıńız.",
    "w.talab_empty.t": "Anıq talap kórsetilmegen", "w.talab_empty.f": "Organnan anıq ne islewdi sorap atırǵanıńızdı jazıń. Talapsız múrájat boyınsha mazmunlı sheshim qabıl etiw qıyın.",
    "w.sana.t": "Waqıyanıń sánesi / múddeti kórsetilmegen", "w.sana.f": "Jaǵday qashan júz bergenin yamasa qashannan beri dawam etip atırǵanın jazıń.",
    "w.dalil_none.t": "Dáliller qosılmaǵan", "w.dalil_none.f": "Chek, shártnama, jazısıw yamasa foto sıyaqlı dáliller múrájattıń tiykarlılıǵın arttıradı.",
    "w.dalil_rec.t": "Usınılǵan dálil joq: {name}", "w.dalil_rec.f": "Bul toparǵa kiretuǵın múrájatlarda usı hújjet ádette soraladı. Bar bolsa — qosıń.",
    "w.mehnat_org.t": "Jumıs beriwshi (shólkem atı) kórsetilmegen", "w.mehnat_org.f": "Jumıs beriwshiniń tolıq atın (mısalı, «…» JShJ) hám mánzilin jazıń.",
    "w.mehnat_sum.t": "Qarız muǵdarı yamasa dáwiri kórsetilmegen", "w.mehnat_sum.f": "Neshe aylıq is haqı hám shama menen qansha summa tólenbegenin sanlarda kórsetiń.",
    "w.istemol_chek.t": "Satıp alıw cheki / kvitanciya belgilenbegen", "w.istemol_chek.f": "Chek yamasa tólem kvitanciyası tovar satıp alınǵanın dálillewshi tiykarǵı hújjet.",
    "w.istemol_seller.t": "Satıwshınıń (dúkánnıń) atı hám mánzili anıq emes", "w.istemol_seller.f": "Dúkán atın, mánzilin yamasa internet-dúkán saytın kiritiń.",
    "w.istemol_date.t": "Satıp alıw sánesi hám bahası kórsetilmegen", "w.istemol_date.f": "Tovar qashan hám qansha summaǵa satıp alınǵanın jazıń — kepillik múddetin esaplaw ushın kerek.",
    "w.kommunal_acc.t": "Abonent (jeke esap) nomeri kórsetilmegen", "w.kommunal_acc.f": "Kvitanciyadaǵı abonent / jeke esap nomerin jazıń.",
    "w.talim_school.t": "Bilimlendiriw mákemesi anıq kórsetilmegen", "w.talim_school.f": "Mákemeniń atın hám nomerin jazıń (mısalı, 45-ulıwma bilim beriw mektebi).",
    "w.korrupsiya_fact.t": "Faktlerge tiykarlanıw", "w.korrupsiya_fact.f": "Tek ózińiz biletuǵın hám dálilley alatuǵın faktlerdi jazıń: sáne, orın, shaxstıń lawazımı. Bile tura jalǵan xabar beriw juwapkershilikke alıp keledi.",
    "w.obodon_place.t": "Máseleniń ornı anıq kórsetilmegen", "w.obodon_place.f": "Kóshe atın, úy nomerin yamasa mólsherdi anıq jazıń.",
    "w.umumiy_organ.t": "Wákilatlı organ anıq anıqlanbadı", "w.umumiy_organ.f": "Máseleni tolıǵıraq jazıń (kim, qay jerde, qanday huqıqıńız buzıldı) — sonda anıq organ usınıladı.",

    "doc.from": "puqara {fish} tárepinen",
    "doc.addr": "Jasaw mánzili: ", "doc.contact": "Tel. / e-pochta: ",
    "doc.about": "({mavzu} boyınsha)",
    "doc.intro": "Men, {fish}, {mavzu} boyınsha tómendegilerdi málim etemen.",
    "doc.law": "Nızamshılıq ({laws}) boyınsha: {mazmun}.",
    "doc.lawJoin": "; ",
    "doc.proc": "{law} talaplarına muwapıq múrájatım belgilengen tártip hám múddetlerde kórip shıǵılıwı hámde onıń nátiyjesi boyınsha maǵan juwap beriliwi tiyis.",
    "doc.ask": "Joqarıdaǵılardı esapqa alıp, Sizden tómendegilerdi sorayman:",
    "doc.askTaklif": "Joqarıdaǵılardan kelip shıǵıp, tómendegi usınısımdı kórip shıǵıwıńızdı sorayman:",
    "doc.itemShikoyat": "Huqıqlarımnıń buzılıwına jol qoyǵan shaxslarǵa qarata nızamshılıqta belgilengen ilajlar kóriliwin.",
    "doc.itemReply": "Múrájatımdı kórip shıǵıw nátiyjeleri haqqında maǵan nızamda belgilengen múddette jazba (elektron) juwap beriliwin.",
    "doc.noTalab": "Anıq talap kiritilmegen — mısalı: {x}",
    "doc.noBayon": "Máseleniń mazmunı bayan etilmegen",
    "doc.att": "Qosımshalar:", "doc.attNone": "Qosımshalar: joq.", "doc.attItem": "{x} — 1 nusqada.",
    "doc.date": "Sáne: {d}", "doc.dateSuffix": " j.", "doc.sign": "Qol: ____________ ",
    "ph.d.fish": "F.A.Á.", "ph.d.manzil": "jasaw mánzili", "ph.d.aloqa": "telefon yamasa e-pochta"
  };

  /* ============================ ENGLISH ============================ */
  D.en = {
    "meta.title": "E-murojaat — a fast and transparent appeals system",
    "land.badge": "LexHakaton · MVP",
    "land.tagline": "A fast and transparent appeals system",
    "land.lead": "Describe your problem in plain words — the system identifies the competent authority, checks the risk of your appeal being returned and drafts an official document.",
    "land.cta": "Submit an appeal",
    "land.demo": "See an example",
    "land.note": "Free · No registration · Works offline",
    "land.f1t": "Where to apply", "land.f1d": "Identifies the competent and the higher authority",
    "land.f2t": "Return protection", "land.f2d": "Flags missing required details in advance",
    "land.f3t": "Ready document", "land.f3d": "Edit, download as DOCX or PDF",
    "lang.label": "Language",

    "hdr.sub": "Shows where, in what form and under which law to apply, checks the risk of return and produces a ready official document",
    "hdr.home": "Home",
    "mode.demo": "Demo mode (local logic)", "mode.ai": "AI mode: on",
    "btn.aiSettings": "⚙ AI settings",
    "demo.label": "Quick demo:",
    "demo.ishhaqi": "💼 Delayed salary", "demo.tovar": "🛒 Defective product", "demo.chala": "⚠ Incomplete data / Risk test",

    "form.title": "Appeal details",
    "lg.applicant": "Applicant", "lg.appeal": "Appeal", "lg.evidence": "Available evidence",
    "f.fish": "Full name", "ph.fish": "e.g. Akmal Karimovich Aliyev",
    "f.manzil": "Home address", "ph.manzil": "Region, district/city, street, building, apartment",
    "f.aloqa": "Phone or e-mail", "ph.aloqa": "+998 90 123 45 67 or name@mail.uz",
    "f.tur": "Document type", "tur.auto": "Auto-detect", "tur.ariza": "Application", "tur.shikoyat": "Complaint", "tur.taklif": "Proposal",
    "f.tavsif": "Problem description", "ph.tavsif": "Write in plain words: what happened, when, where, with whom. e.g. “My employer has not paid my salary for 3 months...”",
    "counter": "{n} chars",
    "f.talab": "Specific demand", "ph.talab": "What exactly do you ask the authority to do? e.g. recover my unpaid salary",
    "ev.chek": "Receipt / invoice", "ev.shartnoma": "Contract", "ev.yozishma": "Correspondence", "ev.foto": "Photo / video",
    "f.boshqa": "Other attachment (optional)", "ph.boshqa": "e.g. copy of the warranty card",
    "btn.analyze": "Analyze", "btn.analyzing": "AI is analyzing…", "btn.generate": "Prepare the appeal", "btn.reset": "Clear the form",

    "c1.title": "Which authority to apply to?",
    "c1.ph": "Fill in the details and press <b>“Analyze”</b> — the competent authority will appear here.",
    "c2.title": "In what form to apply?",
    "c2.ph": "Appeal type, submission channel and the list of attachments.",
    "c3.title": "Legal basis and protection from return",
    "c3.ph": "Applicable legislation and a completeness check (risk of return).",
    "c4.title": "Ready official appeal text",
    "badge.green": "Ready", "badge.yellow": "Attention", "badge.red": "Risk",
    "tag.ai": "AI analysis", "tag.local": "Local analysis",
    "c1.organ": "Main competent authority", "c1.why": "Why this authority?", "c1.steps": "Recommended sequence", "c1.extra": "Additional / higher authorities",
    "c2.type": "Appeal type", "c2.auto": " (auto-detected)", "c2.ways": "Submission channel",
    "way.e.t": "Online", "way.e.d": "Via the Single Portal of Interactive Public Services (my.gov.uz) or the authority’s official website / appeals system. An e-mail address is required.",
    "way.w.t": "In writing", "way.w.d": "In person at the authority’s office (2 copies — get one stamped as received) or by registered mail.",
    "way.o.t": "In person", "way.o.d": "At the head’s personal or on-site reception — leaving a written copy is still recommended.",
    "c2.evidence": "Documents / evidence to attach", "c2.recommended": "(recommended, not selected)",
    "c2.noEvidence": "No evidence selected. Attach documents and photos where possible.",
    "c2.idHint": "Also prepare a copy of your ID document — some authorities may ask for it.",
    "c3.basis": "Legal basis",
    "c3.lexHint": "⚖ Always check law titles and their current wording on <a href=\"https://lex.uz\" target=\"_blank\" rel=\"noopener\">lex.uz</a>. Article numbers are deliberately not given here.",
    "c3.check": "Protection from return — completeness check",
    "risk.green": "Low risk — the document is complete", "risk.yellow": "Medium risk — completing it is recommended", "risk.red": "High risk — the appeal may be returned",
    "c3.allOk": "✓ All required details are present: full name, address, contact, substance, specific demand and evidence.",
    "doc.hint": "✎ You can edit the text directly here. Red fields must be filled in.",
    "btn.copy": "📋 Copy", "btn.docx": "📄 Download DOCX", "btn.print": "🖨 Print / PDF",
    "doc.empty": "The document has not been generated yet. Press “Prepare the appeal”.",
    "docMeta.red": "Fill in the fields marked in red — otherwise the appeal may be returned.",
    "docMeta.yellow": "The document is ready, but review the recommendations in card 3.",
    "docMeta.green": "The document is complete. Read it before sending.",
    "legalBasis": "Legal basis: ",
    "aria.paper": "Official appeal text (editable)",

    "foot.disclaimer": "⚠ This draft document was generated with the help of artificial intelligence. Before sending, personally verify the details, the competent authority and the legal requirements.",
    "foot.links": "Current legislation: <a href=\"https://lex.uz\" target=\"_blank\" rel=\"noopener\">lex.uz</a> · Online appeals: <a href=\"https://my.gov.uz\" target=\"_blank\" rel=\"noopener\">my.gov.uz</a> · E-murojaat — LexHakaton MVP",

    "ai.title": "AI settings",
    "ai.text": "Enter an Anthropic (Claude) API key for real AI analysis. The key is stored only in this browser. Without a key the site works fully on local (demo) logic.",
    "ai.key": "API key",
    "ai.hint": "In production, do not keep the key in the browser — point <code>AI_CONFIG.endpoint</code> in <code>js/ai.js</code> to your own server (proxy). Details: README.md.",
    "ai.clear": "Remove key", "ai.cancel": "Cancel", "ai.save": "Save",

    "t.demo": "Demo data loaded: {name}",
    "t.aiOk": "AI analysis completed",
    "t.aiFail": "AI did not respond — local logic used ({err})",
    "t.docReady": "The official appeal is ready — you can edit it",
    "t.needDoc": "First press “Prepare the appeal”",
    "t.copied": "Document text copied",
    "t.docxOk": "DOCX file downloaded", "t.docxErr": "DOCX generation error: {err}", "t.docxMissing": "DOCX library not loaded (vendor/docx.umd.js)",
    "t.aiOn": "AI mode enabled", "t.aiOff": "Back to demo mode", "t.keyRemoved": "API key removed — demo mode",

    "w.fish_empty.t": "Full name is missing", "w.fish_empty.f": "Enter your surname, first name and patronymic. Under the law on appeals, anonymous appeals are not considered.",
    "w.fish_short.t": "Full name is incomplete", "w.fish_short.f": "Enter surname, first name and patronymic in full (e.g. Aliyev Akmal Karimovich).",
    "w.manzil_empty.t": "Home address is missing", "w.manzil_empty.f": "Enter region, district/city, street, building and apartment — the reply is sent to this address; without it the appeal may be returned.",
    "w.manzil_short.t": "Address is incomplete", "w.manzil_short.f": "Add the street name and building (and apartment) number.",
    "w.aloqa_empty.t": "No contact details", "w.aloqa_empty.f": "Enter a phone number or e-mail. An e-mail address is required to receive a reply to an online appeal.",
    "w.aloqa_bad.t": "Contact details in wrong format", "w.aloqa_bad.f": "Phone: +998 XX XXX XX XX or a valid e-mail address.",
    "w.tavsif_empty.t": "The substance of the appeal is not stated", "w.tavsif_empty.f": "Describe in plain words what happened, when, where and by whom.",
    "w.tavsif_short.t": "The description is too short", "w.tavsif_short.f": "Write at least 2–3 sentences: what happened, since when, whom you contacted and what answer you received.",
    "w.talab_empty.t": "No specific demand", "w.talab_empty.f": "State exactly what you ask the authority to do. Without a demand it is hard to decide on the merits, and the appeal may be closed as “explanation given”.",
    "w.sana.t": "Date / period of the event is missing", "w.sana.f": "State when the situation occurred or since when it has continued.",
    "w.dalil_none.t": "No evidence attached", "w.dalil_none.f": "Receipts, contracts, correspondence or photos make the appeal better substantiated.",
    "w.dalil_rec.t": "Recommended evidence missing: {name}", "w.dalil_rec.f": "This document is usually requested in appeals of this category. Attach it if you have it.",
    "w.mehnat_org.t": "Employer (organization name) not specified", "w.mehnat_org.f": "Give the employer’s full name (e.g. “…” LLC) and address — the inspectorate must know whom to inspect.",
    "w.mehnat_sum.t": "Amount or period of arrears not specified", "w.mehnat_sum.f": "State in figures how many months and roughly what amount has not been paid.",
    "w.istemol_chek.t": "Receipt / invoice not selected", "w.istemol_chek.f": "A receipt is the main proof of purchase. If you have none, mention a bank statement or witnesses.",
    "w.istemol_seller.t": "Seller (shop) name and address unclear", "w.istemol_seller.f": "Enter the shop name, address or the online store’s website.",
    "w.istemol_date.t": "Purchase date and price missing", "w.istemol_date.f": "State when and for how much the product was bought — needed to calculate the warranty period.",
    "w.kommunal_acc.t": "Subscriber (personal account) number missing", "w.kommunal_acc.f": "Enter the subscriber / personal account number from your bill — the utility identifies you by it.",
    "w.talim_school.t": "Educational institution not specified", "w.talim_school.f": "Give the institution’s name and number (e.g. Secondary School No. 45).",
    "w.korrupsiya_fact.t": "Stick to facts", "w.korrupsiya_fact.f": "Write only facts you know and can prove: date, place, the person’s position. Knowingly false reports entail liability under the law.",
    "w.obodon_place.t": "Location of the problem not specified", "w.obodon_place.f": "Give the street name, building number or a landmark.",
    "w.umumiy_organ.t": "Competent authority not clearly identified", "w.umumiy_organ.f": "Describe the problem in more detail (who, where, which right was violated) to get a specific authority.",

    "doc.from": "from citizen {fish}",
    "doc.addr": "Home address: ", "doc.contact": "Phone / e-mail: ",
    "doc.about": "(regarding {mavzu})",
    "doc.intro": "I, {fish}, hereby inform you of the following regarding {mavzu}.",
    "doc.law": "Under the legislation ({laws}): {mazmun}.",
    "doc.lawJoin": "; ",
    "doc.proc": "In accordance with the {law}, my appeal must be considered in the established manner and time limits, and I must receive a reply on its outcome.",
    "doc.ask": "In view of the above, I kindly request you:",
    "doc.askTaklif": "In view of the above, I kindly ask you to consider the following proposal:",
    "doc.itemShikoyat": "To take the measures provided by law against the persons responsible for violating my rights.",
    "doc.itemReply": "To give me a written (electronic) reply on the outcome of the consideration within the time limit established by law.",
    "doc.noTalab": "No specific demand entered — e.g.: {x}",
    "doc.noBayon": "The substance of the problem is not stated",
    "doc.att": "Attachments:", "doc.attNone": "Attachments: none.", "doc.attItem": "{x} — 1 copy.",
    "doc.date": "Date: {d}", "doc.dateSuffix": "", "doc.sign": "Signature: ____________ ",
    "ph.d.fish": "full name", "ph.d.manzil": "home address", "ph.d.aloqa": "phone or e-mail"
  };

  /* ---------- Demo maʼlumotlar (har bir til uchun) ---------- */
  const DEMOS = {
    uz: {
      ishhaqi: {
        fish: "Aliyev Akmal Karimovich", manzil: "Toshkent shahri, Chilonzor tumani, Bunyodkor koʻchasi, 12-uy, 34-xonadon", aloqa: "+998 90 123 45 67",
        tavsif: "Men “Yangi Qurilish Servis” MChJda 2025-yil martidan beri usta boʻlib ishlayman. 2026-yil avgust, sentyabr va oktyabr oylari uchun ish haqim (har oy 6 500 000 soʻm, jami 19 500 000 soʻm) toʻlanmayapti. Rahbariyatga ogʻzaki va Telegram orqali yozma murojaat qildim, “keyinroq beramiz” deyishdi, lekin hali ham bermayapti.",
        talab: "Kechiktirilgan 3 oylik ish haqimni (19 500 000 soʻm) toʻliq undirib berishni va kechiktirilgan davr uchun kompensatsiya toʻlanishini taʼminlashni.",
        dalillar: ["shartnoma", "yozishma"], boshqa: "Ish haqi hisob varaqasi (raschyotka) nusxasi"
      },
      tovar: {
        fish: "Karimova Dilnoza Rustamovna", manzil: "Samarqand shahri, Registon koʻchasi, 45-uy", aloqa: "dilnoza.karimova@example.uz",
        tavsif: "2026-yil 2-noyabrda “Texno Market” doʻkonidan (Samarqand sh., Amir Temur koʻchasi) 7 200 000 soʻmga kir yuvish mashinasi sotib oldim. 10 kundan soʻng mashina ishlamay qoldi, baraban aylanmayapti. Doʻkonga qaytib bordim, sotuvchi tovarni almashtirib berishdan va pulni qaytarishdan rad etdi. Kafolat muddati 1 yil.",
        talab: "Sifatsiz tovarni yangi, sifatli tovarga almashtirish yoki toʻlangan 7 200 000 soʻmni qaytarish.",
        dalillar: ["chek", "foto"], boshqa: "Kafolat taloni nusxasi"
      },
      chala: { fish: "Karimov", manzil: "", aloqa: "", tavsif: "svet yoʻq, hech kim kelmayapti", talab: "", dalillar: [], boshqa: "" }
    },
    ru: {
      ishhaqi: {
        fish: "Алиев Акмал Каримович", manzil: "г. Ташкент, Чиланзарский район, ул. Бунёдкор, дом 12, кв. 34", aloqa: "+998 90 123 45 67",
        tavsif: "Я работаю мастером в ООО «Yangi Qurilish Servis» с марта 2025 года. Заработная плата за август, сентябрь и октябрь 2026 года (по 6 500 000 сумов в месяц, всего 19 500 000 сумов) не выплачивается. Я обращался к руководству устно и письменно через Telegram, мне ответили «выплатим позже», но до сих пор не выплатили.",
        talab: "Взыскать задержанную заработную плату за 3 месяца (19 500 000 сумов) в полном объёме и обеспечить выплату компенсации за период задержки.",
        dalillar: ["shartnoma", "yozishma"], boshqa: "Копия расчётного листка по заработной плате"
      },
      tovar: {
        fish: "Каримова Дилноза Рустамовна", manzil: "г. Самарканд, ул. Регистан, дом 45", aloqa: "dilnoza.karimova@example.uz",
        tavsif: "2 ноября 2026 года в магазине «Texno Market» (г. Самарканд, ул. Амира Темура) я купила стиральную машину за 7 200 000 сумов. Через 10 дней машина перестала работать, барабан не вращается. Я вернулась в магазин, продавец отказался заменить товар и вернуть деньги. Гарантийный срок — 1 год.",
        talab: "Заменить некачественный товар на новый качественный или вернуть уплаченные 7 200 000 сумов.",
        dalillar: ["chek", "foto"], boshqa: "Копия гарантийного талона"
      },
      chala: { fish: "Каримов", manzil: "", aloqa: "", tavsif: "нет света, никто не приходит", talab: "", dalillar: [], boshqa: "" }
    },
    kaa: {
      ishhaqi: {
        fish: "Aliyev Akmal Karimovich", manzil: "Nókis qalası, Doslıq gúzarı, 12-úy, 34-xana", aloqa: "+998 90 123 45 67",
        tavsif: "Men «Yangi Qurilish Servis» JShJ da 2025-jıldıń mart ayınan beri usta bolıp isleymen. 2026-jıldıń avgust, sentyabr hám oktyabr ayları ushın is haqım (hár ayda 6 500 000 swm, jámi 19 500 000 swm) tólenbey atır. Basshılıqqa awızsha hám Telegram arqalı jazba múrájat ettim, «keyinirek beremiz» dedi, biraq ele de bermey atır.",
        talab: "Keshiktirilgen 3 aylıq is haqımdı (19 500 000 swm) tolıq óndirip beriwdi hám keshiktirilgen dáwir ushın kompensaciya tóleniwin támiyinlewdi.",
        dalillar: ["shartnoma", "yozishma"], boshqa: "Is haqı esap paraǵınıń nusqası"
      },
      tovar: {
        fish: "Karimova Dilnoza Rustamovna", manzil: "Nókis qalası, Qaraqalpaqstan kóshesi, 45-úy", aloqa: "dilnoza.karimova@example.uz",
        tavsif: "2026-jıl 2-noyabrde «Texno Market» dúkánınan 7 200 000 swmǵa kir juwıw mashinası satıp aldım. 10 kúnnen soń mashina islemey qaldı, baraban aylanbay atır. Dúkánǵa qaytıp bardım, satıwshı tovardı almastırıp beriwden hám puldı qaytarıwdan bas tarttı. Kepillik múddeti 1 jıl.",
        talab: "Sapasız tovardı jańa, sapalı tovarǵa almastırıw yamasa tólengen 7 200 000 swmdı qaytarıw.",
        dalillar: ["chek", "foto"], boshqa: "Kepillik talonınıń nusqası"
      },
      chala: { fish: "Karimov", manzil: "", aloqa: "", tavsif: "svet joq, hesh kim kelmey atır", talab: "", dalillar: [], boshqa: "" }
    },
    en: {
      ishhaqi: {
        fish: "Aliyev Akmal Karimovich", manzil: "12 Bunyodkor Street, apt. 34, Chilanzar district, Tashkent", aloqa: "+998 90 123 45 67",
        tavsif: "I have been working as a foreman at “Yangi Qurilish Servis” LLC since March 2025. My salary for August, September and October 2026 (6,500,000 soum per month, 19,500,000 soum in total) has not been paid. I contacted the management orally and in writing via Telegram; they said “we will pay later”, but they still have not paid.",
        talab: "Recover my delayed salary for 3 months (19,500,000 soum) in full and ensure payment of compensation for the delay period.",
        dalillar: ["shartnoma", "yozishma"], boshqa: "Copy of the salary statement (payslip)"
      },
      tovar: {
        fish: "Karimova Dilnoza Rustamovna", manzil: "45 Registan Street, Samarkand", aloqa: "dilnoza.karimova@example.uz",
        tavsif: "On 2 November 2026 I bought a washing machine for 7,200,000 soum at the “Texno Market” shop (Amir Temur Street, Samarkand). After 10 days the machine stopped working, the drum does not rotate. I went back to the shop, but the seller refused to replace the product or refund the money. The warranty period is 1 year.",
        talab: "Replace the defective product with a new one of proper quality or refund the 7,200,000 soum paid.",
        dalillar: ["chek", "foto"], boshqa: "Copy of the warranty card"
      },
      chala: { fish: "Karimov", manzil: "", aloqa: "", tavsif: "no electricity, nobody comes", talab: "", dalillar: [], boshqa: "" }
    }
  };

  /* ---------- Yordamchi funksiyalar ---------- */
  const LS = "emurojaat_lang";
  let lang = "uz";
  try { const s = localStorage.getItem(LS); if (s && D[s]) lang = s; } catch (e) { /* yoʻq */ }

  // Oʻzbek lotin imlosi: o' g' → oʻ gʻ, qolgan tutuq belgisi → ʼ
  function fixUz(s) {
    return String(s == null ? "" : s)
      .replace(/([oOgG])['‘’`ʼ]/g, "$1ʻ")
      .replace(/([A-Za-zʻ])['’`](?=[A-Za-z])/g, "$1ʼ");
  }

  function t(key, vars) {
    let s = (D[lang] && D[lang][key] != null) ? D[lang][key] : (D.uz[key] != null ? D.uz[key] : key);
    if (vars) s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
    return s;
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    root.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    root.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    root.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    document.documentElement.lang = lang === "kaa" ? "kaa" : lang;
    document.title = t("meta.title");
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      const on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setLang(code) {
    if (!D[code]) return;
    lang = code;
    try { localStorage.setItem(LS, code); } catch (e) { /* yoʻq */ }
    apply();
    document.dispatchEvent(new CustomEvent("em:langchange", { detail: { lang: code } }));
  }

  return {
    LANGS: LANGS, DEMOS: DEMOS,
    t: t, apply: apply, setLang: setLang, fixUz: fixUz,
    get lang() { return lang; }
  };
})();
