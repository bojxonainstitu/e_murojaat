"""
2-topshiriq: manba lugʻatlariga (uz-Latn, ru, en, kaa.latn) kalitlarni qoʻshish/oʻzgartirish/oʻchirish.
Fayl formati saqlanadi (faqat tegishli "kalit": "qiymat" juftlari almashtiriladi).
Keyin kirill lugʻatlari: python -I scripts/gen_i18n.py

  python -I scripts/patch_i18n_v2.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FILES = {"uz-Latn": "js/i18n/uz-Latn.js", "ru": "js/i18n/ru.js", "en": "js/i18n/en.js", "kaa": "i18n-src/kaa.latn.json"}

DELETE = [
    # A — olib tashlangan elementlar
    "land.badge", "land.demo",
    "video.title", "video.soon", "video.soonLead", "video.s1", "video.s2", "video.s3", "video.play", "video.pause",
    "video.mute", "video.unmute", "video.volume", "video.fullscreen", "video.captions", "video.seek", "video.error",
    "mode.local", "mode.ai", "mode.checking", "btn.aiInfo",
    "ai.title", "ai.text", "ai.status.local", "ai.status.ai", "ai.close",
    "an.local", "t.aiOk", "t.aiFail",
    # C — "tasdiqlanmagan / tekshirilsin" belgilari va eski manba yozuvlari
    "r1.verified", "r1.unverified", "r1.notSet", "r1.sources", "r1.role",
    "r1.level.district", "r1.level.region", "r1.level.national", "r1.fallbackRegion", "r1.fallbackNational",
    "r3.articlesUnverified", "r3.source", "r3.verifiedAt", "r3.unverified", "r3.lexHint",
    "r5.note", "w.unverifiedData", "src.todo", "src.lex", "lvl.national", "lvl.region", "lvl.district",
    # D — eskalatsiya endi organ ierarxiyasidan olinadi
    "esc.step.ministry", "esc.step.justice",
]

SET = {
    "uz-Latn": {
        "law.no": "{n}-son", "law.date": "{d} y.", "law.art": "{n}-modda",
        "land.f3d": "DOCX va PDF",
        "foot.links": "Qonunchilik: <a href='https://lex.uz' target='_blank' rel='noopener'>lex.uz</a> · Elektron §m: <a href='https://my.gov.uz' target='_blank' rel='noopener'>my.gov.uz</a>",
        "step.2": "Muammo",
        "comp.extra": "Qoʻshimcha maʼlumotlar (ixtiyoriy)",
        "ph.extra": "Masalan: 2026-yil 15-avgust; 3 500 000 soʻm; shartnoma № 12/45",
        "comp.extraHint": "Sana, summa, shartnoma raqami kabi tafsilotlar. Ismingiz, manzilingiz va telefoningizni yozish shart emas — ular hujjatga avtomatik qoʻshiladi.",
        "t.analyzeErr": "Tahlil qilib boʻlmadi. Sahifani yangilab, qayta urinib koʻring.",
        "r1.address": "Manzil", "r1.website": "Rasmiy veb-sayt", "r1.phone": "Ishonch telefoni",
        "r1.levelOf.respublika": "Respublika darajasidagi organ",
        "r1.levelOf.viloyat": "Viloyat darajasidagi organ",
        "r1.levelOf.tuman": "Tuman (shahar) darajasidagi organ",
        "r1.contacts": "Aloqa maʼlumotlari ({level})",
        "r1.chain": "Boshqaruv tuzilmasi",
        "r1.step.quyi": "Quyi bosqich", "r1.step.orta": "Oʻrta bosqich", "r1.step.yuqori": "Yuqori bosqich",
        "r1.localHint": "Tuman (shahar) boʻlimining aniq manzili va telefonini organning rasmiy saytidan aniqlashtiring.",
        "r1.others": "Shuningdek, mavzuga qarab",
        "r1.fallback": "Bu soha uchun bazada alohida organ yoʻq — umumiy nazorat organi koʻrsatildi.",
        "r5.std": "{n} kun ichida — {date} gacha",
        "r5.ext": "Qoʻshimcha oʻrganish yoki tekshirish talab etilsa — bir oygacha, {date} gacha",
        "r5.dayType": "Muddat §m organga kelib tushgan kundan eʼtiboran hisoblanadi.",
        "r5.basis": "Asos: {law}, {art}.",
        "r5.escUp": "Yuqori turuvchi organga shikoyat qiling: {title}. Avvalgi §m va javob nusxasini ilova qiling.",
        "doc.toHead": "{org} rahbariga",
        "cat.land_property": "Yer va koʻchmas mulk (kadastr)",
        "cat.enforcement": "Sud qarorlari va aliment ijrosi",
        "mavzu.land_property": "yer uchastkasi va koʻchmas mulkka boʻlgan huquqlarim masalasi",
        "mavzu.enforcement": "sud qarori (aliment) ijrosi bilan bogʻliq masala",
        "req.land_property": "Koʻchmas mulkka (yer uchastkasiga) boʻlgan huquqimni qonunchilikda belgilangan tartibda rasmiylashtirishni yoki bu boradagi qonunbuzilishni bartaraf etishni.",
        "req.enforcement": "Sud qarori (ijro hujjati) qonunchilikda belgilangan tartib va muddatlarda ijro etilishini taʼminlashni.",
        "why.land_property": "Yer uchastkalari va koʻchmas mulkka boʻlgan huquqlarni davlat roʻyxatidan oʻtkazish hamda kadastr maʼlumotlari masalalarini kadastr organlari koʻrib chiqadi.",
        "why.enforcement": "Sud hujjatlari va boshqa organlar hujjatlarini, jumladan aliment undirish toʻgʻrisidagi qarorlarni majburiy ijro etishni Majburiy ijro byurosi amalga oshiradi.",
    },
    "ru": {
        "law.no": "№ {n}", "law.date": "от {d}", "law.art": "статья {n}",
        "doc.proc": "Согласно акту законодательства ({law}) моё обращение должно быть рассмотрено в установленном порядке и сроки, а по его результатам мне должен быть дан ответ.",
        "land.f3d": "DOCX и PDF",
        "foot.links": "Законодательство: <a href='https://lex.uz' target='_blank' rel='noopener'>lex.uz</a> · Электронное обращение: <a href='https://my.gov.uz' target='_blank' rel='noopener'>my.gov.uz</a>",
        "step.2": "Проблема",
        "comp.extra": "Дополнительные сведения (необязательно)",
        "ph.extra": "Например: 15 августа 2026 г.; 3 500 000 сумов; договор № 12/45",
        "comp.extraHint": "Даты, суммы, номер договора и другие детали. Имя, адрес и телефон писать не нужно — они попадут в документ автоматически.",
        "t.analyzeErr": "Не удалось выполнить анализ. Обновите страницу и попробуйте ещё раз.",
        "r1.address": "Адрес", "r1.website": "Официальный сайт", "r1.phone": "Телефон доверия",
        "r1.levelOf.respublika": "Орган республиканского уровня",
        "r1.levelOf.viloyat": "Орган областного уровня",
        "r1.levelOf.tuman": "Орган районного (городского) уровня",
        "r1.contacts": "Контакты ({level})",
        "r1.chain": "Структура подчинённости",
        "r1.step.quyi": "Нижнее звено", "r1.step.orta": "Среднее звено", "r1.step.yuqori": "Высшее звено",
        "r1.localHint": "Точный адрес и телефон районного (городского) подразделения уточните на официальном сайте органа.",
        "r1.others": "Также, в зависимости от темы",
        "r1.fallback": "Для этой сферы в базе нет отдельного органа — показан общий орган контроля.",
        "r5.std": "В течение {n} дней — до {date}",
        "r5.ext": "Если требуется дополнительное изучение или проверка — до одного месяца, до {date}",
        "r5.dayType": "Срок исчисляется со дня поступления обращения в орган.",
        "r5.basis": "Основание: {law}, {art}.",
        "r5.escUp": "Подайте жалобу в вышестоящий орган: {title}. Приложите копии прежнего обращения и ответа.",
        "doc.toHead": "Руководителю: {org}",
        "cat.land_property": "Земля и недвижимость (кадастр)",
        "cat.enforcement": "Исполнение судебных решений и алиментов",
        "mavzu.land_property": "вопросу моих прав на земельный участок и недвижимость",
        "mavzu.enforcement": "вопросу исполнения судебного решения (алиментов)",
        "req.land_property": "Оформить моё право на недвижимость (земельный участок) в установленном законодательством порядке либо устранить допущенное нарушение.",
        "req.enforcement": "Обеспечить исполнение судебного решения (исполнительного документа) в установленном законодательством порядке и сроки.",
        "why.land_property": "Вопросы государственной регистрации прав на земельные участки и недвижимость, а также кадастровых сведений рассматривают кадастровые органы.",
        "why.enforcement": "Принудительное исполнение судебных актов и актов других органов, в том числе о взыскании алиментов, осуществляет Бюро принудительного исполнения.",
    },
    "en": {
        "law.no": "No. {n}", "law.date": "dated {d}", "law.art": "Article {n}",
        "doc.proc": "Under the legislation ({law}), my appeal must be considered in the established manner and time limits, and I must receive a reply on its outcome.",
        "land.f3d": "DOCX and PDF",
        "foot.links": "Legislation: <a href='https://lex.uz' target='_blank' rel='noopener'>lex.uz</a> · Online appeals: <a href='https://my.gov.uz' target='_blank' rel='noopener'>my.gov.uz</a>",
        "step.2": "Problem",
        "comp.extra": "Additional details (optional)",
        "ph.extra": "For example: 15 August 2026; 3,500,000 soum; contract No. 12/45",
        "comp.extraHint": "Dates, amounts, contract numbers and similar details. You do not need to enter your name, address or phone — they are added to the document automatically.",
        "t.analyzeErr": "The analysis could not be completed. Reload the page and try again.",
        "r1.address": "Address", "r1.website": "Official website", "r1.phone": "Hotline",
        "r1.levelOf.respublika": "National-level authority",
        "r1.levelOf.viloyat": "Regional-level authority",
        "r1.levelOf.tuman": "District (city) level authority",
        "r1.contacts": "Contacts ({level})",
        "r1.chain": "Chain of authority",
        "r1.step.quyi": "Lower level", "r1.step.orta": "Middle level", "r1.step.yuqori": "Top level",
        "r1.localHint": "Check the exact address and phone of the district (city) office on the authority’s official website.",
        "r1.others": "Also, depending on the topic",
        "r1.fallback": "There is no separate authority for this area in the database — the general oversight body is shown.",
        "r5.std": "Within {n} days — by {date}",
        "r5.ext": "If additional study or review is needed — up to one month, by {date}",
        "r5.dayType": "The period is counted from the day the appeal reaches the authority.",
        "r5.basis": "Basis: {law}, {art}.",
        "r5.escUp": "Complain to the higher authority: {title}. Attach copies of your earlier appeal and the reply.",
        "doc.toHead": "To the head of {org}",
        "cat.land_property": "Land and real estate (cadastre)",
        "cat.enforcement": "Enforcement of court decisions and alimony",
        "mavzu.land_property": "my rights to a land plot and real estate",
        "mavzu.enforcement": "the enforcement of a court decision (alimony)",
        "req.land_property": "To register my right to the real estate (land plot) in the manner established by law or to remedy the violation.",
        "req.enforcement": "To ensure that the court decision (enforcement document) is executed in the manner and within the time limits established by law.",
        "why.land_property": "State registration of rights to land plots and real estate and cadastre records are handled by the cadastre authorities.",
        "why.enforcement": "Compulsory enforcement of court decisions and other bodies’ decisions, including alimony orders, is carried out by the Compulsory Enforcement Bureau.",
    },
    # REVIEW: qoraqalpoq tarjimalari ona tili egasi tomonidan tekshirilsin (docs/I18N_REVIEW.md)
    "kaa": {
        "law.no": "№ {n}", "law.date": "{d} j.", "law.art": "{n}-statya",
        "land.f3d": "DOCX hám PDF",
        "foot.links": "Nızamshılıq: <a href='https://lex.uz' target='_blank' rel='noopener'>lex.uz</a> · Elektron §m: <a href='https://my.gov.uz' target='_blank' rel='noopener'>my.gov.uz</a>",
        "step.2": "Másele",
        "comp.extra": "Qosımsha maǵlıwmatlar (májbúriy emes)",
        "ph.extra": "Mısalı: 2026-jıl 15-avgust; 3 500 000 swm; shártnama № 12/45",
        "comp.extraHint": "Sáne, summa, shártnama nomeri sıyaqlı tafsilatlar. Atıńızdı, mánzilińizdi hám telefonıńızdı jazıw shárt emes — olar hújjetke avtomat túrde qosıladı.",
        "t.analyzeErr": "Talqılaw orınlanbadı. Betti jańalap, qayta urınıp kóriń.",
        "r1.address": "Mánzil", "r1.website": "Rásmiy veb-sayt", "r1.phone": "Isenim telefonı",
        "r1.levelOf.respublika": "Respublika dárejesindegi organ",
        "r1.levelOf.viloyat": "Wálayat dárejesindegi organ",
        "r1.levelOf.tuman": "Rayon (qala) dárejesindegi organ",
        "r1.contacts": "Baylanıs maǵlıwmatları ({level})",
        "r1.chain": "Basqarıw dúzilisi",
        "r1.step.quyi": "Tómengi basqısh", "r1.step.orta": "Orta basqısh", "r1.step.yuqori": "Joqarı basqısh",
        "r1.localHint": "Rayon (qala) bóliminiń anıq mánzili hám telefonın organnıń rásmiy saytınan anıqlań.",
        "r1.others": "Sonıń menen birge, temaǵa qarap",
        "r1.fallback": "Bul taraw ushın bazada bólek organ joq — ulıwma qadaǵalaw organı kórsetildi.",
        "r5.std": "{n} kún ishinde — {date} ge shekem",
        "r5.ext": "Qosımsha úyreniw yamasa tekseriw talap etilse — bir ayǵa shekem, {date} ge shekem",
        "r5.dayType": "Múddet §m organǵa kelip túsken kúnnen baslap esaplanadı.",
        "r5.basis": "Tiykar: {law}, {art}.",
        "r5.escUp": "Joqarı turıwshı organǵa shaǵım etiń: {title}. Aldıńǵı §m hám juwap nusqasın qosıń.",
        "doc.toHead": "{org} basshısına",
        "cat.land_property": "Jer hám kóshpes múlk (kadastr)",
        "cat.enforcement": "Sud qararları hám aliment orınlanıwı",
        "mavzu.land_property": "jer uchastkası hám kóshpes múlkke bolǵan huqıqlarım máselesi",
        "mavzu.enforcement": "sud qararı (aliment) orınlanıwına baylanıslı másele",
        "req.land_property": "Kóshpes múlkke (jer uchastkasına) bolǵan huqıqımdı nızamshılıqta belgilengen tártipte rásmiylestiriwdi yamasa bul boyınsha nızam buzılıwın saplastırıwdı.",
        "req.enforcement": "Sud qararınıń (orınlaw hújjetiniń) nızamshılıqta belgilengen tártip hám múddetlerde orınlanıwın támiyinlewdi.",
        "why.land_property": "Jer uchastkaları hám kóshpes múlkke bolǵan huqıqlardı mámleketlik dizimnen ótkeriw hám kadastr maǵlıwmatları máselelerin kadastr organları kórip shıǵadı.",
        "why.enforcement": "Sud hújjetlerin hám basqa organlar hújjetlerin, sonıń ishinde aliment óndiriw haqqındaǵı qararlardı májbúriy orınlawdı Májbúriy orınlaw byurosı ámelge asıradı.",
    },
}

PAIR = r'"{k}"\s*:\s*"(?:[^"\\]|\\.)*"'


def jstr(v):
    return json.dumps(v, ensure_ascii=False)


def patch(code, path):
    f = ROOT / path
    s = f.read_text(encoding="utf-8")
    for k in DELETE:
        pat = re.compile(r'[ \t]*' + PAIR.format(k=re.escape(k)) + r'\s*,[ \t]*(\n(?=\s*\n))?')
        s, n = pat.subn("", s, count=1)
        if not n:  # oxirgi element (vergulsiz)
            s, n = re.subn(r',\s*' + PAIR.format(k=re.escape(k)) + r'(?=\s*\n?\s*\})', "", s, count=1)
    # boʻsh qolgan qatorlar
    s = re.sub(r'\n[ \t]+\n', "\n", s)
    s = re.sub(r'\n{3,}', "\n\n", s)
    added = []
    for k, v in SET[code].items():
        pat = re.compile(PAIR.format(k=re.escape(k)))
        if pat.search(s):
            s = pat.sub(lambda m: f'"{k}": {jstr(v)}', s, count=1)
        else:
            added.append(f'  "{k}": {jstr(v)},')
    if added:
        anchor = s.index('  "cat.labor"')
        s = s[:anchor] + "\n".join(added) + "\n\n" + s[anchor:]
    f.write_text(s, encoding="utf-8")
    # tekshiruv: JSON sifatida oʻqiladimi
    start = s.index("= {", s.index("EM_LOCALES[")) + 2 if path.endswith(".js") else s.index("{")
    body = s[start: s.rindex("}") + 1]
    data = json.loads(body)
    left = [k for k in DELETE if k in data]
    print(f"{code}: {len(data)} kalit; qolgan oʻchirilishi kerak boʻlganlar: {left}")
    return data


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    keys = {c: set(patch(c, p)) for c, p in FILES.items()}
    base = keys["uz-Latn"]
    for c, k in keys.items():
        if k ^ base:
            print("OGOHLANTIRISH", c, sorted(k ^ base))


if __name__ == "__main__":
    main()
