/* =====================================================================
   E-murojat — ASOSIY BOSHQARUV (holat mashinasi)
   Qadamlar:  profile → compose → (clarify) → result
   Orqaga qaytilganda kiritilgan maʼlumotlar saqlanadi (xotirada + localStorage).
   Titul varaq va uning motion effektlari avvalgi versiyadan saqlangan.
   ===================================================================== */
(function () {
  "use strict";
  const CFG = window.EM_CONFIG, I = window.EM_I18N, T = I.t;
  const $ = function (id) { return document.getElementById(id); };
  const esc = function (s) { return window.EM_DOC.esc(s); };
  const KEYS = CFG.STORAGE_KEYS;

  /* ---------- Holat ---------- */
  const state = {
    step: "profile",
    profile: { fish: "", regionId: "", districtId: "", address: "", phone: "", email: "" },
    appeal: { text: "", extra: "", docType: "auto", evidence: [], files: [] },
    analysis: null,
    answers: {},
    docType: "ARIZA",
    history: [],
    busy: false
  };

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEYS.draft) || "null");
      if (d && d.profile) Object.assign(state.profile, d.profile);
      if (d && d.appeal) { state.appeal.text = d.appeal.text || ""; state.appeal.extra = d.appeal.extra || ""; state.appeal.docType = d.appeal.docType || "auto"; state.appeal.evidence = d.appeal.evidence || []; }
      state.history = JSON.parse(localStorage.getItem(KEYS.history) || "[]");
    } catch (e) { /* localStorage yoʻq yoki buzilgan */ }
  }
  function save() {
    try {
      localStorage.setItem(KEYS.draft, JSON.stringify({ profile: state.profile, appeal: { text: state.appeal.text, extra: state.appeal.extra, docType: state.appeal.docType, evidence: state.appeal.evidence } }));
    } catch (e) { /* jim */ }
  }
  function clearData() {
    try { localStorage.removeItem(KEYS.draft); localStorage.removeItem(KEYS.history); } catch (e) { /* jim */ }
    state.profile = { fish: "", regionId: "", districtId: "", address: "", phone: "", email: "" };
    state.appeal = { text: "", extra: "", docType: "auto", evidence: [], files: [] };
    state.analysis = null; state.answers = {}; state.history = [];
    go("profile");
    toast(T("t.cleared"), "ok");
  }

  /* ---------- Xabarlar ---------- */
  function toast(msg, kind) {
    const t = document.createElement("div");
    t.className = "toast " + (kind || "");
    t.textContent = msg;
    $("toasts").appendChild(t);
    setTimeout(function () { t.classList.add("hide"); }, 3200);
    setTimeout(function () { t.remove(); }, 3700);
  }

  /* ---------- Qadamlar ---------- */
  const STEP_NUM = { profile: 1, compose: 2, clarify: 2, result: 3 };

  function renderStepper() {
    const cur = STEP_NUM[state.step];
    const steps = [{ n: 1, k: "step.1", go: "profile" }, { n: 2, k: "step.2", go: "compose" }, { n: 3, k: "step.3", go: "result" }];
    $("stepper").innerHTML = '<ol aria-label="' + esc(T("step.nav")) + '">' + steps.map(function (s) {
      const done = s.n < cur, active = s.n === cur;
      const can = (s.go === "compose" && profileOk()) || s.go === "profile" || (s.go === "result" && state.analysis);
      return '<li class="' + (done ? "done " : "") + (active ? "active" : "") + '">' +
        '<button type="button" data-go="' + s.go + '"' + (active ? ' aria-current="step"' : "") + (can && !active ? "" : " disabled") + ">" +
        '<span class="st-n">' + (done ? "✓" : s.n) + '</span><span class="st-l">' + esc(T(s.k)) + "</span></button></li>";
    }).join("") + "</ol>";
    $("stepper").querySelectorAll("[data-go]").forEach(function (b) { b.addEventListener("click", function () { go(b.dataset.go); }); });
  }

  function profileOk() { return window.EM_VALID.validateProfile(state.profile).ok; }

  function go(step, opts) {
    if (step === "compose" && !profileOk()) step = "profile";
    if (step === "result" && !state.analysis) step = "compose";
    state.step = step;
    renderStepper();
    const stage = $("stage");
    stage.className = "stage step-" + step;
    let api = null;
    if (step === "profile") {
      api = window.EM_Applicant.mount(stage, state.profile, function () { save(); go("compose", { focus: true }); }, save);
      stage.insertAdjacentHTML("beforeend", '<p class="stage-foot"><button type="button" class="link-btn" id="btnClear">' + esc(T("btn.clearData")) + "</button></p>");
      $("btnClear").addEventListener("click", clearData);
    } else if (step === "compose") {
      api = window.EM_Composer.mount(stage, state, { onSubmit: submit, onEditProfile: function () { go("profile", { focus: true }); }, onChange: save });
    } else if (step === "clarify") {
      api = window.EM_Composer.mountClarify(stage, state.analysis, state.answers, { onDone: function () { go("result"); } });
    } else if (step === "result") {
      stage.innerHTML = window.EM_Applicant.summary(state.profile) +
        '<div class="result-top"><button type="button" class="btn ghost sm" id="btnBackCompose">← ' + esc(T("btn.back")) + "</button></div>" +
        '<div class="results" id="results"></div>';
      stage.querySelector('[data-action="edit-profile"]').addEventListener("click", function () { go("profile"); });
      $("btnBackCompose").addEventListener("click", function () { go("compose"); });
      window.EM_Results.render($("results"), state, { toast: toast, onHistory: recordHistory });
    }
    if (opts && opts.focus && api && api.focus) api.focus();
    if (!opts || !opts.keepScroll) {
      const top = $("appShell").getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: "smooth" });
    }
  }

  function recordHistory(hash) {
    if (!state.history.some(function (x) { return x.hash === hash; })) {
      state.history.push({ hash: hash, at: Date.now() });
      state.history = state.history.slice(-50);
      try { localStorage.setItem(KEYS.history, JSON.stringify(state.history)); } catch (e) { /* jim */ }
    }
  }

  /* ---------- Tahlil ---------- */
  function showLoading(on) {
    state.busy = on;
    const btn = document.querySelector("#cmp-send");
    if (btn) { btn.disabled = on; btn.innerHTML = on ? '<span class="spin"></span> ' + esc(T("an.loading")) : esc(T("btn.send")) + " ➤"; }
  }

  // Rejim (AI yoki lokal) haqida belgi interfeysda koʻrsatilmaydi; zaxira (lokal) tasniflash
  // jim ishlaydi. Server oʻz rejimini ishga tushganda logga yozadi (shaxsiy maʼlumotsiz).
  async function analyze() {
    const a = await window.EM_AI.classify(state.appeal.text, { profile: state.profile, locale: I.locale, extraInfo: state.appeal.extra });
    state.analysis = a;
    state.answers = {};
    state.docType = state.appeal.docType !== "auto" ? state.appeal.docType : a.documentType;
    return a;
  }

  async function submit() {
    if (state.busy) return;
    if (state.appeal.text.trim().length < CFG.TEXT.minChars) { toast(T("t.needText"), "warn"); return; }
    showLoading(true);
    try {
      const a = await analyze();
      go(a.missingInfo && a.missingInfo.length ? "clarify" : "result", { focus: true });
      if (state.step === "result") toast(T("t.docReady"), "ok");
    } catch (e) {
      console.error("Tahlil xatosi:", e && e.message);
      toast(T("t.analyzeErr"), "warn");
    } finally {
      showLoading(false);
    }
  }

  /* ---------- Demolar ---------- */
  async function runDemo(key) {
    const d = window.EM_DEMOS.get(key, I.locale);
    state.profile = d.profile;
    state.appeal.text = d.text; state.appeal.extra = ""; state.appeal.docType = "auto"; state.appeal.evidence = d.evidence; state.appeal.files = [];
    save();
    await analyze();
    go("result");
    toast(T("t.demo", { name: T("demo." + key) }), "ok");
  }

  /* ---------- Titul varaq (avvalgi versiyadan) ---------- */
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function splitTitle() {
    const el = document.querySelector(".land-title .lt");
    if (!el || el.getAttribute("data-split")) return;
    el.innerHTML = el.textContent.split("").map(function (ch, i) {
      return '<span class="ch" aria-hidden="true" style="--i:' + i + '">' + esc(ch) + "</span>";
    }).join("");
    el.setAttribute("data-split", "1");
  }
  function replayLanding() {
    const l = $("landing");
    l.classList.remove("leaving");
    const clone = l.cloneNode(true);
    l.parentNode.replaceChild(clone, l);
    bindLanding();
  }
  function enterApp(after) {
    const land = $("landing"), app = $("appShell");
    const show = function () {
      land.hidden = true;
      document.body.classList.remove("on-landing");
      app.hidden = false;
      app.classList.remove("entering"); void app.offsetWidth; app.classList.add("entering");
      window.scrollTo(0, 0);
      try { history.replaceState(null, "", "#murojat"); } catch (e) { /* file:// */ }
      go("profile", { focus: true });
      if (after) after();
    };
    if (reduceMotion) { show(); return; }
    land.classList.add("leaving");
    setTimeout(show, 650);
  }
  function goHome() {
    $("appShell").hidden = true;
    $("landing").hidden = false;
    document.body.classList.add("on-landing");
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* file:// */ }
    replayLanding();
    window.scrollTo(0, 0);
  }
  function bindLanding() {
    $("btnStart").addEventListener("click", function () { enterApp(); });
    window.EM_LangSwitcher.mountAll($("landing"));
    const art = document.querySelector("#landing .arch-art");
    if (art && !reduceMotion) {
      $("landing").addEventListener("mousemove", function (e) {
        if ($("landing").classList.contains("leaving")) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 14, y = (e.clientY / window.innerHeight - 0.5) * 10;
        art.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
    }
    I.apply($("landing"));
  }

  /* ---------- Ishga tushirish ---------- */
  document.addEventListener("em:langchange", function () {
    if (!$("appShell").hidden) go(state.step, { keepScroll: true });
  });

  document.addEventListener("DOMContentLoaded", function () {
    load();
    I.apply();
    splitTitle();
    bindLanding();
    window.EM_LangSwitcher.mountAll();
    $("btnHome").addEventListener("click", goHome);
    $("btnHome2").addEventListener("click", goHome);
    document.querySelectorAll("[data-demo]").forEach(function (b) { b.addEventListener("click", function () { runDemo(b.dataset.demo); }); });
    if (location.hash === "#murojat" || location.hash === "#murojaat") {
      $("landing").hidden = true; document.body.classList.remove("on-landing"); $("appShell").hidden = false;
      go("profile");
    }
  });

  // Testlar va demo uchun
  window.EM_APP = { state: state, go: go, runDemo: runDemo, submit: submit };
})();
