"""
E-murojat — Playwright e2e testlari (Python).

  python -m pip install playwright && python -m playwright install chromium
  python tests/e2e.py

Server avtomatik ishga tushiriladi (AI kalitisiz — lokal rejim; STT_DEMO_TEXT bilan
ovozli kiritish oqimi sinaladi). Natijalar: tests/e2e-report.json, tests/screenshots/.
Tekshiriladi:
  • 5 til × 320/390 px: titul varaq → profil → kiritish (+fayl, +ovoz) → natija → nusxa / DOCX / chop etish
  • 320, 360, 375, 390, 414, 768 px: gorizontal skroll yoʻq, tugma/sarlavha/dialog matni kesilmaydi
  • ЎЗ tanlanganda interfeys va hujjat kirillda; ovoz matni tasdiqsiz yuborilmaydi
  • 2-topshiriq: olib tashlangan elementlar (5 tilda) bosh sahifada va "Murojat qilish" dan keyin yoʻq;
    "Qoʻshimcha maʼlumotlar" maydoni → hujjat; 1-oynada ierarxiya, manzil, telefon (tel:), sayt (https)
"""
import base64
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SHOTS = ROOT / "tests" / "screenshots"
OUT = ROOT / "tests" / "output"
PORT = 8790
BASE = f"http://127.0.0.1:{PORT}"
LOCALES = ["uz-Latn", "uz-Cyrl", "ru", "kaa", "en"]
STT_TEXT = "Uch oydan beri ish haqi berilmayapti"
PNG = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==")
PDF = b"%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n"

# Olib tashlangan elementlar (A boʻlim): har tildagi eski matnlar va DOM tanlagichlari
REMOVED_TEXT = {
    "uz-Latn": ["Namunani koʻrish", "Video qoʻllanma", "Lokal rejim", "AI va maxfiylik", "tasdiqlanmagan", "Muammoim", "Muammoyim", "AI ulanmagan", "Tahrirlash, DOCX", "Lex.uz sayti"],
    "uz-Cyrl": ["Намунани кўриш", "Видео қўлланма", "Локал режим", "СИ ва махфийлик", "тасдиқланмаган", "Муаммоим", "СИ уланмаган"],
    "ru": ["Посмотреть пример", "Видеоинструкция", "Локальный режим", "ИИ и конфиденциальность", "не подтверждены", "Моя проблема", "ИИ не подключён", "Редактирование, DOCX"],
    "kaa": ["Үлгини көриў", "Видео қолланба", "Локал режим", "ЖИ ҳәм қупыялық", "тастыйықланбаған", "Мәселем", "ЖИ қосылмаған"],
    "en": ["See an example", "Video guide", "Local mode", "AI and privacy", "To be verified", "My problem", "AI is not connected", "Edit, DOCX"],
}
COMMON_REMOVED = ["LexHakaton", "MVP", "Lex.uz xodimi", "E-murojaat", "Tahlilda"]
REMOVED_SEL = "#btnLandDemo, .land-badge, [data-video-guide], .video-guide, #aiMode, #btnAi, #aiModal, .mode"
STEP2 = {"uz-Latn": "Muammo", "uz-Cyrl": "Муаммо", "ru": "Проблема", "kaa": "Мәселе", "en": "Problem"}
EXTRA = {"uz-Latn": "Shartnoma № 12/45", "uz-Cyrl": "Шартнома № 12/45", "ru": "Договор № 12/45", "kaa": "Шәртнама № 12/45", "en": "Contract No. 12/45"}


def assert_removed(page, locale, where):
    body = page.inner_text("body")
    hits = [s for s in REMOVED_TEXT[locale] + COMMON_REMOVED if s.lower() in body.lower()]
    assert not hits, f"{where}: olib tashlangan matn topildi: {hits}"
    assert page.locator(REMOVED_SEL).count() == 0, f"{where}: olib tashlangan element DOM da bor"
    assert "E-murojaat" not in page.content(), f"{where}: eski brend shakli HTML da"


CHECK_JS = """() => {
  const sw = document.documentElement.scrollWidth, iw = window.innerWidth;
  const sel = 'button, .btn, label, h1, h2, h3, .dc-status, .fld-err, .chip, .tool-btn, .mic-btn, .rp-head h3, .stepper .st-l, .tag, .badge, .chain b, .kv dd, .law-name';
  const clipped = [];
  document.querySelectorAll(sel).forEach(el => {
    if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return;
    if (el.closest('.sr-only')) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    if (el.scrollWidth - el.clientWidth > 2 || r.right > iw + 1) clipped.push((el.textContent || '').trim().slice(0, 40) + ' [' + Math.round(r.right) + '>' + iw + ']');
  });
  return { hscroll: sw > iw, sw, iw, clipped: clipped.slice(0, 6) };
}"""

PROFILES = {
    "uz-Latn": "Toshmatov Bahodir Ergashevich", "uz-Cyrl": "Тошматов Баҳодир Эргашевич",
    "ru": "Тошматов Баходир Эргашевич", "kaa": "Тошматов Баҳодир Эргашевич", "en": "Toshmatov Bahodir Ergashevich",
}
TEXTS = {
    "uz-Latn": "Ish joyimda 2026-yil avgustdan beri maosh berilmayapti, jami 9 000 000 soʻm. Ish beruvchi “Bunyod” MChJ. Ish haqimni undirib berishni soʻrayman.",
    "uz-Cyrl": "Иш жойимда 2026 йил августдан бери маош берилмаяпти, жами 9 000 000 сўм. Иш берувчи «Бунёд» МЧЖ. Иш ҳақимни ундириб беришни сўрайман.",
    "ru": "С августа 2026 года на работе не выплачивают зарплату, всего 9 000 000 сумов. Работодатель ООО «Бунёд». Прошу взыскать мою заработную плату.",
    "kaa": "Жумыс орнымда 2026-жыл августтан берли айлық берилмей атыр, жәми 9 000 000 сўм. Жумыс бериўши «Бунёд» ЖШЖ. Ис ҳақымды өндирип бериўди сорайман.",
    "en": "Since August 2026 my employer “Bunyod” LLC has not paid my salary, 9,000,000 soum in total. I request that my salary be recovered.",
}


def wait_server():
    for _ in range(50):
        try:
            urllib.request.urlopen(BASE + "/api/health", timeout=1)
            return
        except Exception:
            time.sleep(0.2)
    raise RuntimeError("server ishga tushmadi")


def check(page, report, tag):
    r = page.evaluate(CHECK_JS)
    if r["hscroll"] or r["clipped"]:
        report["layout_issues"].append({"where": tag, **r})
    return r


def full_flow(browser, locale, width, report):
    tag = f"{locale}@{width}"
    ctx = browser.new_context(viewport={"width": width, "height": 820}, accept_downloads=True,
                              permissions=["clipboard-read", "clipboard-write", "microphone"])
    ctx.add_init_script(f"try{{localStorage.setItem('emurojat_locale','{locale}');localStorage.removeItem('emurojat_draft');localStorage.removeItem('emurojat_history')}}catch(e){{}}")
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    res = {"case": tag, "ok": False, "steps": []}
    try:
        page.goto(BASE + "/")
        page.wait_for_selector("#btnStart")
        page.wait_for_timeout(2200)  # kirish animatsiyasi
        assert page.evaluate("document.documentElement.lang") == {"uz-Latn": "uz-Latn", "uz-Cyrl": "uz-Cyrl"}.get(locale, locale)
        check(page, report, tag + " landing")
        assert_removed(page, locale, tag + " landing")
        page.screenshot(path=str(SHOTS / f"{tag}_1_landing.png"))
        res["steps"].append("landing")

        page.click("#btnStart")
        page.wait_for_selector("#ap-fish")
        assert_removed(page, locale, tag + " app")
        assert page.inner_text("#stepper li:nth-child(2) .st-l").strip() == STEP2[locale], "2-qadam nomi"
        assert page.is_disabled("#ap-continue"), "Davom etish boshida faol boʻlmasligi kerak"
        page.fill("#ap-fish", PROFILES[locale])
        page.select_option("#ap-region", "an")
        page.select_option("#ap-district", "an-asaka")
        page.fill("#ap-address", "Navoiy 5-uy" if locale in ("uz-Latn", "en") else "Навоий 5-уй")
        page.fill("#ap-phone", "901234567")
        assert page.input_value("#ap-phone") == "+998 90 123 45 67", "telefon maskasi"
        assert not page.is_disabled("#ap-continue"), "Davom etish faollashishi kerak"
        check(page, report, tag + " profile")
        page.screenshot(path=str(SHOTS / f"{tag}_2_profile.png"), full_page=True)
        page.click("#ap-continue")
        page.wait_for_selector("#cmp-text")
        res["steps"].append("profile")

        # Fayl biriktirish
        page.set_input_files("#cmp-file", [
            {"name": "chek.png", "mimeType": "image/png", "buffer": PNG},
            {"name": "shartnoma.pdf", "mimeType": "application/pdf", "buffer": PDF},
        ])
        assert page.locator("#cmp-att li").count() == 2, "2 ta fayl roʻyxatda"
        page.set_input_files("#cmp-file", [{"name": "virus.exe", "mimeType": "application/x-msdownload", "buffer": b"MZ"}])
        assert page.is_visible("#cmp-att-err"), "notoʻgʻri fayl turi xatosi"
        res["steps"].append("attachments")

        # Ovoz: matn qoʻshiladi, lekin avtomatik yuborilmaydi
        page.click("#cmp-mic")
        page.wait_for_timeout(1500)
        page.click("#cmp-mic")
        page.wait_for_function("document.querySelector('#cmp-mic').dataset.state === 'ready' || document.querySelector('#cmp-mic').dataset.state === 'error'", timeout=8000)
        voice_state = page.get_attribute("#cmp-mic", "data-state")
        if voice_state == "ready":
            assert STT_TEXT in page.input_value("#cmp-text"), "ovoz matni yozuv qatorida"
        assert page.evaluate("EM_APP.state.step") == "compose", "ovozdan soʻng avtomatik yuborilmadi"
        res["voice"] = voice_state
        if locale == "uz-Cyrl":
            vs = page.inner_text("#cmp-voice")
            assert not re.findall(r"[A-Za-z]{4,}", vs), f"ovoz xabarida lotin: {vs}"
        res["steps"].append("voice")

        page.fill("#cmp-text", TEXTS[locale])
        page.fill("#cmp-extra", EXTRA[locale])
        assert page.is_visible("#cmp-extra") and page.is_visible("#cmp-mic") and page.is_visible("#cmp-send"), "qatordagi elementlar koʻrinadi"
        check(page, report, tag + " compose")
        page.screenshot(path=str(SHOTS / f"{tag}_3_compose.png"), full_page=True)
        page.click("#cmp-send")
        page.wait_for_function("['clarify','result'].includes(EM_APP.state.step)", timeout=10000)
        if page.evaluate("EM_APP.state.step") == "clarify":
            check(page, report, tag + " clarify")
            page.click("#cl-skip")
        page.wait_for_selector(".rp >> nth=4")
        page.wait_for_timeout(1000)
        assert page.locator(".rp").count() == 5, "5 ta natija oynasi"
        res["category"] = page.evaluate("EM_APP.state.analysis.category")
        doc = page.inner_text("#docPaper")
        assert "chek.png" in doc and "shartnoma.pdf" in doc, "fayllar Ilovalar boʻlimida"
        assert "12/45" in doc, "qoʻshimcha maʼlumot hujjatga tushdi"
        assert_removed(page, locale, tag + " result")
        # 1-oyna: nom, ierarxiya, manzil, telefon (tel:), sayt (https, noopener)
        assert page.locator("#rp-org-name").inner_text().strip(), "organ nomi"
        assert page.locator("#rp-chain li").count() >= 2, "ierarxiya bosqichlari"
        assert page.locator(".rp >> nth=0").locator("a[href^='tel:']").count() >= 1, "telefon havolasi"
        site = page.locator(".rp >> nth=0").locator("a[target=_blank]").first
        assert site.get_attribute("href").startswith("https://") and "noopener" in site.get_attribute("rel"), "sayt havolasi"
        # 3-oyna: qonun nomi havola, "Lex.uz sayti" yoʻq
        law = page.locator("li[data-law=appeals] .law-name a")
        assert law.count() == 1 and law.get_attribute("href").startswith("https://lex.uz/"), "qonun nomi ustida havola"
        if locale == "uz-Cyrl":
            stripped = re.sub(r"[\w.+-]+@[\w.-]+|chek\.png|shartnoma\.pdf|E-murojat|\+998[\d ]+", "", doc)
            latin = re.findall(r"[A-Za-z]{3,}", stripped)
            assert not latin, f"kirill hujjatda lotin soʻzlar: {latin[:5]}"
            ui = page.inner_text("#appShell")
            ui = re.sub(r"Oʻzbekcha|English", "", ui)  # til roʻyxatidagi oʻz nomlari
            ui_latin = re.findall(r"\b[A-Za-z]{4,}\b", re.sub(r"[\w.+-]+@[\w.-]+|[\w-]+\.(uz|pdf|png|docx)|gov\.uz/\w+|E-murojat|DOCX|PDF|chek|shartnoma", "", ui))
            assert not ui_latin, f"kirill interfeysda lotin: {ui_latin[:5]}"
        check(page, report, tag + " result")
        page.screenshot(path=str(SHOTS / f"{tag}_4_result.png"), full_page=True)
        res["steps"].append("result")

        # Nusxa olish
        page.click("[data-act=copy]")
        page.wait_for_timeout(300)
        clip = page.evaluate("navigator.clipboard.readText()")
        assert PROFILES[locale].split()[0] in clip, "nusxa olingan matnda F.I.Sh."
        # DOCX
        with page.expect_download() as dl:
            page.click("[data-act=docx]")
        d = dl.value
        OUT.mkdir(parents=True, exist_ok=True)
        target = OUT / f"{tag}.docx"
        d.save_as(str(target))
        assert target.stat().st_size > 2000 and target.read_bytes()[:2] == b"PK", "haqiqiy DOCX"
        # Chop etish
        page.evaluate("window.__printed = 0; window.__ps = []; window.print = () => { window.__printed++; window.__ps.push(new Error().stack.split('\\n').slice(2,4).join(' | ')); }; 0")
        page.click("[data-act=print]")
        page.wait_for_timeout(300)
        printed = page.evaluate("window.__printed")
        assert printed == 1, f"chop etish chaqirildi (soni: {printed}; {page.evaluate('window.__ps')})"
        res["steps"].append("copy/docx/print")
        res["ok"] = True
    except Exception as e:
        res["error"] = str(e)[:400]
        page.screenshot(path=str(SHOTS / f"{tag}_ERROR.png"), full_page=True)
    res["pageErrors"] = errors[:3]
    ctx.close()
    return res


def width_sweep(browser, report):
    for locale in ("ru", "uz-Cyrl", "kaa"):
        for w in (320, 360, 375, 390, 414, 768):
            ctx = browser.new_context(viewport={"width": w, "height": 760})
            ctx.add_init_script(f"try{{localStorage.setItem('emurojat_locale','{locale}')}}catch(e){{}}")
            page = ctx.new_page()
            page.goto(BASE + "/")
            page.wait_for_timeout(2300)
            check(page, report, f"sweep {locale}@{w} landing")
            if w in (320, 768):
                page.screenshot(path=str(SHOTS / f"sweep_{locale}_{w}_landing.png"))
            page.click("#btnStart")
            page.wait_for_selector("#ap-fish")
            check(page, report, f"sweep {locale}@{w} profile")
            page.evaluate("EM_APP.runDemo('tovar')")
            page.wait_for_selector(".rp >> nth=4")
            page.wait_for_timeout(900)
            check(page, report, f"sweep {locale}@{w} result")
            page.evaluate("EM_APP.go('compose')")
            page.wait_for_selector("#cmp-extra")
            check(page, report, f"sweep {locale}@{w} compose")
            if w == 320:
                page.screenshot(path=str(SHOTS / f"sweep_{locale}_{w}_compose.png"), full_page=True)
            ctx.close()


def print_pdf(browser, report):
    ctx = browser.new_context()
    ctx.add_init_script("try{localStorage.setItem('emurojat_locale','uz-Latn')}catch(e){}")
    page = ctx.new_page()
    page.goto(BASE + "/#murojat")
    page.evaluate("EM_APP.runDemo('ishhaqi')")
    page.wait_for_selector(".rp >> nth=4")
    page.wait_for_timeout(900)
    page.emulate_media(media="print")
    page.evaluate("document.body.classList.add('printing-doc')")
    visible = page.evaluate("""() => ({
      doc: !!document.querySelector('#docPaper').offsetParent,
      others: [...document.querySelectorAll('.rp:not(.doc-panel), .site-header, .stepper, .doc-actions')].filter(e => e.offsetParent).length })""")
    OUT.mkdir(parents=True, exist_ok=True)
    page.pdf(path=str(OUT / "print-preview.pdf"), format="A4", print_background=False)
    report["print"] = visible
    ctx.close()


def main():
    SHOTS.mkdir(parents=True, exist_ok=True)
    env = dict(os.environ, PORT=str(PORT), ANTHROPIC_API_KEY="", STT_DEMO_TEXT=STT_TEXT, PYTHONIOENCODING="utf-8")
    srv = subprocess.Popen([sys.executable, str(ROOT / "server" / "server.py")], env=env, cwd=str(ROOT),
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    report = {"flows": [], "layout_issues": []}
    try:
        wait_server()
        with sync_playwright() as p:
            browser = p.chromium.launch(args=["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
            for locale in LOCALES:
                for w in (320, 390):
                    r = full_flow(browser, locale, w, report)
                    report["flows"].append(r)
                    print(("OK  " if r["ok"] else "XATO") + f" {r['case']:<14} {r.get('category', '')} voice={r.get('voice')} {r.get('error', '')}", flush=True)
            width_sweep(browser, report)
            print_pdf(browser, report)
            browser.close()
    finally:
        srv.terminate()
    (ROOT / "tests" / "e2e-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    ok = sum(1 for f in report["flows"] if f["ok"])
    print(f"\nOqimlar: {ok}/{len(report['flows'])} oʻtdi; maket muammolari: {len(report['layout_issues'])}; chop etish: {report.get('print')}")
    sys.exit(0 if ok == len(report["flows"]) and not report["layout_issues"] else 1)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
