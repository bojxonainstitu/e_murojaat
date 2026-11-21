/* =====================================================================
   AppealComposer — AI chat qatoriga oʻxshash murojat kiritish (2-qadam)
   + aniqlashtiruvchi savollar oynasi (clarify)
   ===================================================================== */
window.EM_Composer = (function () {
  "use strict";
  const CFG = window.EM_CONFIG, I = window.EM_I18N;
  const esc = function (s) { return window.EM_DOC.esc(s); };
  const EVIDENCE = ["chek", "shartnoma", "yozishma", "foto"];

  function autoGrow(ta) {
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight + 2, Math.round(window.innerHeight * 0.55)) + "px";
  }

  /**
   * @param host
   * @param state   { profile, appeal: { text, docType, evidence[], files[] } }
   * @param h       { onSubmit, onEditProfile, onChange }
   */
  function mount(host, state, h) {
    const ap = state.appeal;
    host.innerHTML =
      window.EM_Applicant.summary(state.profile) +
      '<section class="composer" aria-labelledby="cmp-title">' +
      '<h2 id="cmp-title">' + esc(I.t("comp.title")) + "</h2>" +
      '<p class="cmp-lead">' + esc(I.t("comp.lead")) + "</p>" +
      '<div class="cmp-examples"><span>' + esc(I.t("comp.examples")) + "</span>" +
      [1, 2, 3].map(function (n) { return '<button type="button" class="chip" data-ex="' + n + '">' + esc(I.t("ex." + n)) + "</button>"; }).join("") + "</div>" +
      '<div class="cmp-box">' +
      '<div class="cmp-fields">' +
      '<div class="cmp-main"><label for="cmp-text" class="sr-only">' + esc(I.t("comp.title")) + "</label>" +
      '<textarea id="cmp-text" rows="4" maxlength="' + CFG.TEXT.maxChars + '" placeholder="' + esc(I.t("ph.text")) + '" aria-describedby="cmp-count cmp-privacy"></textarea></div>' +
      '<div class="cmp-extra"><label for="cmp-extra">' + esc(I.t("comp.extra")) + "</label>" +
      '<textarea id="cmp-extra" rows="3" maxlength="' + CFG.TEXT.extraMaxChars + '" placeholder="' + esc(I.t("ph.extra")) + '" aria-describedby="cmp-extra-hint"></textarea>' +
      '<p class="fld-hint" id="cmp-extra-hint">' + esc(I.t("comp.extraHint")) + "</p></div>" +
      "</div>" +
      '<div class="cmp-tools">' +
      '<button type="button" class="mic-btn" id="cmp-mic" aria-label="' + esc(I.t("voice.aria")) + '"><span class="mic-ico" aria-hidden="true">🎤</span><span class="mic-label">' + esc(I.t("voice.start")) + "</span></button>" +
      '<label class="tool-btn" for="cmp-file"><span aria-hidden="true">📎</span> ' + esc(I.t("att.add")) + "</label>" +
      '<input id="cmp-file" type="file" class="sr-only" accept="' + CFG.ATTACHMENTS.accept + '" multiple>' +
      '<label class="tool-btn cam" for="cmp-cam"><span aria-hidden="true">📷</span> ' + esc(I.t("att.camera")) + "</label>" +
      '<input id="cmp-cam" type="file" class="sr-only" accept="image/*" capture="environment">' +
      '<span class="cmp-count" id="cmp-count" aria-live="polite"></span>' +
      '<button type="button" class="btn primary send-btn" id="cmp-send">' + esc(I.t("btn.send")) + " ➤</button>" +
      "</div></div>" +
      '<p class="voice-status" id="cmp-voice" role="status" aria-live="polite"></p>' +
      '<p class="att-errors" id="cmp-att-err" role="alert" hidden></p>' +
      '<div class="att-list" id="cmp-att" hidden></div>' +
      '<p class="cmp-note">📎 ' + esc(I.t("att.hint", { mb: CFG.ATTACHMENTS.maxFileMB, n: CFG.ATTACHMENTS.maxFiles })) + "<br>" + esc(I.t("att.local")) + "</p>" +
      '<details class="cmp-more"><summary>' + esc(I.t("comp.more")) + "</summary>" +
      '<div class="cmp-more-body"><label for="cmp-type">' + esc(I.t("comp.type")) + "</label>" +
      '<select id="cmp-type"><option value="auto">' + esc(I.t("tur.auto")) + '</option><option value="ARIZA">' + esc(I.t("tur.ariza")) + '</option><option value="SHIKOYAT">' + esc(I.t("tur.shikoyat")) + '</option><option value="TAKLIF">' + esc(I.t("tur.taklif")) + "</option></select>" +
      '<fieldset class="ev-set"><legend>' + esc(I.t("comp.evidence")) + "</legend>" +
      EVIDENCE.map(function (k) { return '<label class="check"><input type="checkbox" value="' + k + '"' + (ap.evidence.indexOf(k) >= 0 ? " checked" : "") + "><span>" + esc(I.t("ev." + k)) + "</span></label>"; }).join("") +
      "</fieldset></div></details>" +
      '<p class="cmp-privacy" id="cmp-privacy">🔒 ' + esc(I.t("comp.privacy")) + "</p>" +
      "</section>";

    const $ = function (s) { return host.querySelector(s); };
    const ta = $("#cmp-text"), count = $("#cmp-count"), type = $("#cmp-type"), extra = $("#cmp-extra");
    ta.value = ap.text || "";
    extra.value = ap.extra || "";
    extra.addEventListener("input", function () { ap.extra = extra.value; autoGrow(extra); h.onChange(); });
    type.value = ap.docType || "auto";

    function updCount() {
      const n = ta.value.trim().length;
      count.textContent = n < CFG.TEXT.minChars && n > 0 ? I.t("comp.tooShort", { n: CFG.TEXT.minChars }) : I.t("comp.count", { n: n });
      count.className = "cmp-count" + (n > 0 && n < CFG.TEXT.minChars ? " warn" : "");
      $("#cmp-send").disabled = n < CFG.TEXT.minChars;
    }
    ta.addEventListener("input", function () { ap.text = ta.value; autoGrow(ta); updCount(); h.onChange(); });
    ta.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !$("#cmp-send").disabled) $("#cmp-send").click();
    });
    host.querySelectorAll("[data-ex]").forEach(function (b) {
      b.addEventListener("click", function () {
        const add = I.t("ex." + b.dataset.ex + ".text");
        ta.value = (ta.value.trim() ? ta.value.trim() + " " : "") + add;
        ap.text = ta.value; autoGrow(ta); updCount(); ta.focus(); h.onChange();
      });
    });
    type.addEventListener("change", function () { ap.docType = type.value; h.onChange(); });
    host.querySelectorAll(".ev-set input").forEach(function (c) {
      c.addEventListener("change", function () {
        ap.evidence = Array.prototype.filter.call(host.querySelectorAll(".ev-set input"), function (x) { return x.checked; }).map(function (x) { return x.value; });
        h.onChange();
      });
    });

    // Ovoz: matn faqat yozuv qatoriga qoʻyiladi, avtomatik yuborilmaydi
    window.EM_Voice.create($("#cmp-mic"), $("#cmp-voice"), function (text) {
      ta.value = (ta.value.trim() ? ta.value.trim() + " " : "") + text;
      ap.text = ta.value; autoGrow(ta); updCount(); h.onChange();
      ta.classList.add("just-filled"); setTimeout(function () { ta.classList.remove("just-filled"); }, 1600);
      ta.focus();
    });

    // Fayllar
    const attList = $("#cmp-att"), attErr = $("#cmp-att-err");
    function renderAtt() { window.EM_Attach.render(attList, ap.files, renderAtt); }
    function onFiles(input) {
      const errs = window.EM_Attach.addFiles(ap.files, input.files);
      input.value = "";
      attErr.hidden = !errs.length; attErr.textContent = errs.join(" ");
      renderAtt();
    }
    $("#cmp-file").addEventListener("change", function (e) { onFiles(e.target); });
    $("#cmp-cam").addEventListener("change", function (e) { onFiles(e.target); });
    renderAtt();

    $("#cmp-send").addEventListener("click", function () { h.onSubmit(); });
    host.querySelector('[data-action="edit-profile"]').addEventListener("click", h.onEditProfile);
    autoGrow(ta); autoGrow(extra); updCount();
    return { focus: function () { ta.focus({ preventScroll: true }); } };
  }

  /** Aniqlashtiruvchi savollar (1–3 ta) */
  function mountClarify(host, analysis, answers, h) {
    const qs = analysis.missingInfo.slice(0, 3);
    host.innerHTML =
      '<section class="dialog-card clarify" aria-labelledby="cl-title">' +
      '<header class="dc-head"><span class="dc-ico" aria-hidden="true">❓</span><div><h2 id="cl-title">' + esc(I.t("cl.title")) + "</h2>" +
      '<p class="dc-lead">' + esc(I.t("cl.lead")) + "</p></div></header>" +
      '<form class="dc-body" novalidate>' +
      qs.map(function (q, i) {
        const label = q.question || I.t("q." + q.id);
        return '<div class="fld"><label for="cl-' + i + '">' + (i + 1) + ". " + esc(label) + "</label>" +
          '<textarea id="cl-' + i + '" data-id="' + esc(q.id) + '" rows="2">' + esc(answers[q.id] || "") + "</textarea></div>";
      }).join("") +
      '<div class="dc-foot split"><button type="button" class="btn ghost" id="cl-skip">' + esc(I.t("cl.skip")) + "</button>" +
      '<button type="submit" class="btn primary big">' + esc(I.t("cl.continue")) + " →</button></div>" +
      "</form></section>";
    function collect() {
      host.querySelectorAll("textarea[data-id]").forEach(function (t) { answers[t.dataset.id] = t.value.trim(); });
    }
    host.querySelector("form").addEventListener("submit", function (e) { e.preventDefault(); collect(); h.onDone(); });
    host.querySelector("#cl-skip").addEventListener("click", function () { h.onDone(); });
    const first = host.querySelector("textarea");
    return { focus: function () { if (first) first.focus({ preventScroll: true }); } };
  }

  return { mount: mount, mountClarify: mountClarify };
})();
