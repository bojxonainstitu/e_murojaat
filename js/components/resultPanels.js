/* =====================================================================
   ResultPanels — 5 ta natija oynasi (3-qadam)
   1) Organ  2) Shakl va ilovalar  3) Qonunchilik + rad etilishdan himoya
   4) Tayyor hujjat  5) Keyingi qadamlar va nazorat
   ===================================================================== */
window.EM_Results = (function () {
  "use strict";
  const I = window.EM_I18N, ORG = window.EM_ORGS, LAWS = window.EM_LAWS, CATS = window.EM_CATEGORIES;
  const esc = function (s) { return window.EM_DOC.esc(s); };

  function panel(n, titleKey, body, extraCls) {
    return '<article class="rp ' + (extraCls || "") + '" style="--i:' + n + '" aria-labelledby="rp' + n + '-t">' +
      '<header class="rp-head"><span class="num">' + n + '</span><h3 id="rp' + n + '-t">' + esc(I.t(titleKey)) + "</h3></header>" +
      '<div class="rp-body">' + body + "</div></article>";
  }
  function kv(labelKey, html) {
    return html ? '<div class="kv"><dt>' + esc(I.t(labelKey)) + "</dt><dd>" + html + "</dd></div>" : "";
  }
  /** Faqat https: havola (tashqi) */
  function siteLink(url) {
    if (!/^https:\/\/[^\s"'<>]+$/.test(String(url || ""))) return "";
    return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(url.replace(/^https:\/\//, "")) + "</a>";
  }
  /** "1008 / +998 (71) 207-04-43" → tel: havolalar (3–4 xonali qisqa raqamlar ham) */
  function phoneLinks(phone) {
    const parts = String(phone || "").split(/\s+\/\s+/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (!parts.length) return "";
    return '<span class="tel-list">' + parts.map(function (p) {
      const m = p.match(/^(\+?[\d\s()-]*\d)(.*)$/);
      if (!m) return esc(p);
      const num = m[1].replace(/[^\d+]/g, "");
      return '<a href="tel:' + esc(num) + '">' + esc(m[1].trim()) + "</a>" + (m[2] ? esc(m[2]) : "");
    }).join("") + "</span>";
  }
  function stepText(s) { return s.title + (s.locality ? " — " + s.locality : ""); }
  function addDays(dateStr, n) {
    const d = new Date(dateStr + "T00:00:00");
    d.setDate(d.getDate() + n);
    const p = function (x) { return (x < 10 ? "0" : "") + x; };
    return p(d.getDate()) + "." + p(d.getMonth() + 1) + "." + d.getFullYear();
  }
  function addMonths(dateStr, n) {
    const d = new Date(dateStr + "T00:00:00"), day = d.getDate();
    d.setDate(1); d.setMonth(d.getMonth() + n);
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(day, last));
    const p = function (x) { return (x < 10 ? "0" : "") + x; };
    return p(d.getDate()) + "." + p(d.getMonth() + 1) + "." + d.getFullYear();
  }
  function isoToday() { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }

  function attachmentNames(appeal) {
    return appeal.files.map(function (x) { return x.file.name; })
      .concat(appeal.evidence.map(function (k) { return I.t("ev." + k) + " (" + I.t("r2.paperOnly") + ")"; }));
  }

  /**
   * @param host
   * @param s   state: { profile, appeal, analysis, answers, docType, history }
   * @param h   { toast, onHistory }
   */
  function render(host, s, h) {
    const L = I.locale, a = s.analysis, cat = CATS.byId(a.category);
    const res = window.EM_RESOLVE.resolveOrganizations({ categoryId: a.category, regionId: s.profile.regionId, districtId: s.profile.districtId, locale: L, text: s.appeal.text });
    const org = res.primary;
    const atts = attachmentNames(s.appeal);
    const check = window.EM_VALIDATE.validateAppeal({
      profile: s.profile, analysis: a, answers: s.answers, attachmentsCount: atts.length, text: s.appeal.text, history: s.history
    });

    /* ---- 1. Organ ---- */
    const levelLbl = I.t("r1.levelOf." + org.level);
    const contacts = function (o) {
      return '<dl class="kvs">' + kv("r1.address", o.address ? esc(ORG.localize(o.address, L)) : "") + kv("r1.phone", phoneLinks(o.phone)) + kv("r1.website", siteLink(o.website)) + "</dl>";
    };
    const p1 =
      '<div class="tag-row"><span class="tag">' + esc(I.t("r1.category")) + ": " + esc(I.t("cat." + a.category)) + "</span>" +
      (a.confidence != null ? '<span class="tag muted">' + esc(I.t("r1.confidence", { p: Math.round(a.confidence * 100) })) + "</span>" : "") + "</div>" +
      ((a.secondaryCategories || []).length ? '<p class="small muted">' + esc(I.t("r1.also")) + ": " + a.secondaryCategories.map(function (c) { return esc(I.t("cat." + c)); }).join(", ") + "</p>" : "") +
      '<div class="organ-main"><div class="val" id="rp-org-name">' + esc(ORG.label(org, L)) + '</div><span class="org-level">' + esc(levelLbl) + "</span></div>" +
      (res.isFallback ? '<p class="note">ℹ ' + esc(I.t("r1.fallback")) + "</p>" : "") +
      '<div class="sub">' + esc(I.t("r1.chain")) + '</div><ol class="chain" id="rp-chain">' + res.chain.map(function (c, i) {
        return '<li data-role="' + c.role + '"><div class="ch-text"><span class="ch-role">' + esc(I.t("r1.step." + c.role)) + "</span><b>" + esc(stepText(c)) + "</b>" +
          (i === 0 && c.level !== "respublika" ? '<span class="ch-hint">' + esc(I.t("r1.localHint")) + "</span>" : "") + "</div></li>";
      }).join("") + "</ol>" +
      '<div class="sub">' + esc(I.t("r1.contacts", { level: levelLbl })) + "</div>" + contacts(org) +
      (res.others.length ? '<div class="also"><div class="sub">' + esc(I.t("r1.others")) + "</div><ul>" + res.others.map(function (o) {
        return "<li><b>" + esc(ORG.label(o, L)) + "</b>" + contacts(o) + "</li>";
      }).join("") + "</ul></div>" : "") +
      '<p class="why"><b>' + esc(I.t("r1.why")) + "</b> " + esc(I.t("why." + a.category)) + "</p>" +
      (I.has("first." + a.category) ? '<p class="note"><b>' + esc(I.t("r1.first")) + "</b> " + esc(I.t("first." + a.category)) + "</p>" : "");

    /* ---- 2. Shakl va ilovalar ---- */
    const docTypeKey = { ARIZA: "tur.ariza", SHIKOYAT: "tur.shikoyat", TAKLIF: "tur.taklif" }[s.docType];
    const ways = (org.channels || ["online", "paper", "reception"]).map(function (w) {
      return '<div class="way"><b>' + esc(I.t("way." + w + ".t")) + "</b><span>" + esc(I.t("way." + w + ".d")) + "</span></div>";
    }).join("");
    const p2 =
      '<div class="type-box"><div><div class="lbl">' + esc(I.t("r2.type")) + (s.appeal.docType === "auto" ? esc(I.t("r2.auto")) : "") + "</div>" +
      '<div class="val big">' + esc(I.t(docTypeKey)) + "</div></div></div>" +
      '<div class="sub">' + esc(I.t("r2.ways")) + '</div><div class="ways">' + ways + "</div>" +
      '<div class="sub">' + esc(I.t("r2.att")) + "</div>" +
      (atts.length ? '<ol class="evidence">' + atts.map(function (n, i) { return "<li>" + esc(I.t("doc.attItem", { n: i + 1, x: n })) + "</li>"; }).join("") + "</ol>"
        : '<p class="muted-p">' + esc(I.t("r2.noAtt")) + "</p>") +
      '<p class="hint">' + esc(I.t("r2.idHint")) + "</p>";

    /* ---- 3. Qonunchilik va tekshiruv ---- */
    const laws = LAWS.forCategory("*").concat(LAWS.forCategory(a.category));
    const p3 =
      '<div class="sub first">' + esc(I.t("r3.basis")) + '</div><ul class="laws">' + laws.map(function (l) {
        const title = esc(LAWS.pickTitle(l, L));
        const req = [l.actNumber ? I.t("law.no", { n: LAWS.actNo(l, L) }) : "", l.actDate ? I.t("law.date", { d: l.actDate }) : ""].filter(Boolean).join(", ");
        return '<li data-law="' + esc(l.id) + '"><div class="law-name">' + (/^https:\/\//.test(l.url) ? '<a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + title + "</a>" : title) + "</div>" +
          (req ? '<div class="law-meta">' + esc(req) + "</div>" : "") +
          (l.articles.length ? '<ul class="law-arts">' + l.articles.map(function (x) {
            const note = LAWS.articleNote(x, L);
            return "<li>" + esc(I.t("law.art", { n: LAWS.articleNum(x) })) + (note ? " — " + esc(note) : "") + "</li>";
          }).join("") + "</ul>" : "") +
          '<div class="law-txt">' + esc(I.pick(l.summary)) + "</div></li>";
      }).join("") + "</ul>" +
      '<div class="sub">' + esc(I.t("r3.check")) + ' <span class="badge ' + check.status + '">' + esc(I.t("r3.score", { ok: check.ok, all: check.all })) + "</span></div>" +
      '<ul class="checklist">' + check.items.map(function (x) {
        const icon = x.status === "pass" ? "✓" : (x.status === "fix" ? "✕" : "!");
        const tag = I.t(x.status === "pass" ? "r3.pass" : (x.status === "fix" ? "r3.fix" : "r3.warn"));
        return '<li class="' + x.status + '"><span class="ck-ico" aria-hidden="true">' + icon + '</span><div><b>' + esc(I.t("va." + x.id)) + '</b> <span class="ck-tag">' + esc(tag) + "</span>" +
          (x.status !== "pass" ? '<div class="ck-fix">' + esc(I.t("va." + x.id + ".fix")) + "</div>" : "") + "</div></li>";
      }).join("") + "</ul>" +
      '<p class="note">⚖ ' + esc(I.t("r3.notAdvice")) + "</p>";

    /* ---- 4. Hujjat ---- */
    const paras = window.EM_DOC.build({ profile: s.profile, analysis: a, answers: s.answers, attachments: atts, org: org, chain: res.chain, docType: s.docType });
    const p4 =
      '<div class="doc-meta"><span class="badge ' + check.status + '">' + esc(I.t(docTypeKey)) + "</span> " + esc(I.t("docMeta." + check.status)) + "</div>" +
      '<div class="doc-actions"><button type="button" class="btn ghost sm" data-act="copy">' + esc(I.t("btn.copy")) + "</button>" +
      '<button type="button" class="btn ghost sm" data-act="docx">' + esc(I.t("btn.docx")) + "</button>" +
      '<button type="button" class="btn ghost sm" data-act="print">' + esc(I.t("btn.print")) + "</button></div>" +
      '<p class="edit-hint">' + esc(I.t("doc.hint")) + "</p>" +
      '<div id="docPaper" class="paper" contenteditable="true" spellcheck="false" role="textbox" aria-multiline="true" aria-label="' + esc(I.t("aria.paper")) + '">' + window.EM_DOC.toHtml(paras) + "</div>";

    /* ---- 5. Keyingi qadamlar ---- */
    const dl = LAWS.DEADLINE, dlLaw = LAWS.LAWS[dl.lawId];
    // Eskalatsiya: zanjirning yuqori bosqichlari → Prokuratura → Virtual qabulxona (+ soha qoʻshimchalari)
    const escSteps = res.chain.slice(1).map(function (c) { return I.t("r5.escUp", { title: stepText(c) }); });
    if (org.id !== "prokuratura" && org.id !== "mib") escSteps.push(I.t("esc.step.prosecutor"));
    if (org.id !== "presidential_portal") escSteps.push(I.t("esc.step.virtual"));
    (cat.escalation || []).forEach(function (k) { escSteps.push(I.t("esc.step." + k)); });
    const p5 =
      '<div class="fld inline"><label for="rp-sent">' + esc(I.t("r5.sent")) + '</label><input type="date" id="rp-sent" value="' + isoToday() + '"></div>' +
      '<div class="sub">' + esc(I.t("r5.deadline")) + '</div><ul class="deadlines" id="rp-dl"></ul>' +
      '<p class="small muted">' + esc(I.t("r5.dayType")) + " " + esc(I.t("r5.basis", { law: LAWS.pickTitle(dlLaw, L), art: I.t("law.art", { n: parseInt(dl.article, 10) }) })) + "</p>" +
      '<div class="sub">' + esc(I.t("r5.esc")) + '</div><ol class="steps" id="rp-esc">' + escSteps.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol>" +
      '<div class="sub">' + esc(I.t("r5.repeat")) + "</div>" +
      '<p class="repeat-text" id="rp-repeat"></p>' +
      '<button type="button" class="btn ghost sm" data-act="copy-repeat">' + esc(I.t("btn.copyText")) + "</button>";

    host.innerHTML =
      panel(1, "r1.title", p1, "no-print") + panel(2, "r2.title", p2, "no-print") + panel(3, "r3.title", p3, "no-print") +
      panel(4, "r4.title", p4, "doc-panel") + panel(5, "r5.title", p5, "no-print");

    /* ---- Hodisalar ---- */
    const paper = host.querySelector("#docPaper");
    const sent = host.querySelector("#rp-sent");
    function updDeadlines() {
      const v = sent.value || isoToday();
      host.querySelector("#rp-dl").innerHTML =
        "<li>" + esc(I.t("r5.std", { n: dl.standardDays, date: addDays(v, dl.standardDays) })) + "</li>" +
        "<li>" + esc(I.t("r5.ext", { date: addMonths(v, dl.extendedMonths) })) + "</li>";
      const p = function (x) { return x.split("-").reverse().join("."); };
      host.querySelector("#rp-repeat").textContent = I.t("r5.repeatText", { date: p(v), organ: ORG.label(org, L), topic: I.t("mavzu." + a.category) });
    }
    sent.addEventListener("change", updDeadlines);
    updDeadlines();

    host.querySelector('[data-act="copy"]').addEventListener("click", function () {
      window.EM_EXPORT.copyText(paper.innerText).then(function () { h.toast(I.t("t.copied"), "ok"); });
    });
    host.querySelector('[data-act="copy-repeat"]').addEventListener("click", function () {
      window.EM_EXPORT.copyText(host.querySelector("#rp-repeat").textContent).then(function () { h.toast(I.t("t.copied"), "ok"); });
    });
    host.querySelector('[data-act="docx"]').addEventListener("click", function () {
      window.EM_EXPORT.downloadDocx(paper, I.glossary().appeal).then(function () { h.toast(I.t("t.docxOk"), "ok"); })
        .catch(function (e) { h.toast(e.message === "docx_missing" ? I.t("t.docxMissing") : I.t("t.docxErr", { err: e.message }), "warn"); });
    });
    host.querySelector('[data-act="print"]').addEventListener("click", function () { window.EM_EXPORT.printDoc(); });

    if (h.onHistory) h.onHistory(check.hash);
    return { paper: paper, check: check, org: org, resolved: res };
  }

  return { render: render, attachmentNames: attachmentNames, phoneLinks: phoneLinks, siteLink: siteLink };
})();
