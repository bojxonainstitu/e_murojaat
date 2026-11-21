/* =====================================================================
   ai/client — tasniflash: server (AI) yoki lokal qoidalar
   - Serverga faqat muammo matni yuboriladi; profil maʼlumotlari (F.I.Sh.,
     manzil, telefon, e-pochta) va ularga oʻxshash qismlar matndan olib tashlanadi.
   - Server javobi sxema boʻyicha tekshiriladi (validateClassification).
   - AI kaliti brauzerda YOʻQ: u faqat server/.env da.
   ===================================================================== */
window.EM_AI = (function () {
  "use strict";
  const CFG = window.EM_CONFIG;
  const CATS = window.EM_CATEGORIES;
  const UZ = window.EM_UZ;
  const TR = window.EM_TRANSLIT;

  let serverInfo = null; // { ai: bool, stt: bool }

  /* ---------------- Server holati ---------------- */
  async function detectServer() {
    if (serverInfo) return serverInfo;
    if (location.protocol === "file:") { serverInfo = { ai: false, stt: false, offline: true }; return serverInfo; }
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(function () { ctrl.abort(); }, 2500);
      const res = await fetch(CFG.API_BASE + "/api/health", { signal: ctrl.signal, cache: "no-store" });
      clearTimeout(timer);
      if (!res.ok) throw new Error(String(res.status));
      const j = await res.json();
      serverInfo = { ai: !!j.ai, stt: !!j.stt, model: j.model || null };
    } catch (e) {
      serverInfo = { ai: false, stt: false, offline: true };
    }
    return serverInfo;
  }

  /* ---------------- Shaxsiy maʼlumotlarni olib tashlash ---------------- */
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  // Yuborishdan oldin niqoblanadi: e-pochta → [EPOCHTA], telefon → [TELEFON],
  // pasport seriyasi/raqami, JSHSHIR (14 raqam) va karta raqami (16 raqam) → [RAQAM]
  function redact(text, profile) {
    let s = String(text || "");
    s = s.replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "[EPOCHTA]");
    s = s.replace(/\b[A-ZА-ЯЎҚҒҲ]{2}\s?№?\s?\d{7}\b/g, "[RAQAM]");
    s = s.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, "[RAQAM]");
    s = s.replace(/\b\d{14}\b/g, "[RAQAM]");
    s = s.replace(/(\+?998[\s-]?)?\(?\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}\b/g, "[TELEFON]");
    if (profile) {
      const parts = [profile.address].concat(String(profile.fish || "").split(/\s+/)).filter(function (p) { return p && p.length >= 3; });
      parts.forEach(function (p) { s = s.replace(new RegExp(escapeRe(p), "gi"), "[…]"); });
    }
    return s;
  }

  /* ---------------- Sxema tekshiruvi (zod oʻrnida) ---------------- */
  const DOC_TYPES = ["ARIZA", "SHIKOYAT", "TAKLIF"];
  function isStr(x, max) { return typeof x === "string" && x.length <= (max || 4000); }
  function strArr(x, maxItems, maxLen) {
    return Array.isArray(x) && x.length <= maxItems && x.every(function (s) { return isStr(s, maxLen); });
  }
  function validateClassification(o) {
    const errors = [];
    if (!o || typeof o !== "object") return { ok: false, errors: ["not_object"] };
    if (CATS.IDS.indexOf(o.category) < 0) errors.push("category");
    if (o.secondaryCategories != null && !(Array.isArray(o.secondaryCategories) && o.secondaryCategories.every(function (c) { return CATS.IDS.indexOf(c) >= 0; }))) errors.push("secondaryCategories");
    if (DOC_TYPES.indexOf(o.documentType) < 0) errors.push("documentType");
    if (!isStr(o.summary, 4000)) errors.push("summary");
    if (!strArr(o.keyFacts, 20, 500)) errors.push("keyFacts");
    if (!isStr(o.requestedAction, 1500)) errors.push("requestedAction");
    if (!strArr(o.missingInfo, 3, 300)) errors.push("missingInfo");
    if (typeof o.confidence !== "number" || o.confidence < 0 || o.confidence > 1) errors.push("confidence");
    return { ok: errors.length === 0, errors: errors };
  }

  /* ---------------- Lokal tasniflash ---------------- */
  function matchText(text) {
    const raw = String(text || "");
    // Oʻzbek kirill matnini lotinga oʻgirib, rus kalitlari uchun asl matnni ham saqlaymiz
    return UZ.forMatch(raw) + " \n " + UZ.forMatch(TR.uzCyrlToLatn(raw)) + " \n " + UZ.forMatch(TR.kaaCyrlToLatn(raw));
  }

  function detectDocType(t) {
    let sh = 0, tk = 0;
    CATS.DOC_TYPE_KW.SHIKOYAT.forEach(function (k) { if (t.indexOf(k) >= 0) sh++; });
    CATS.DOC_TYPE_KW.TAKLIF.forEach(function (k) { if (t.indexOf(k) >= 0) tk++; });
    if (tk > sh) return "TAKLIF";
    if (sh > 0) return "SHIKOYAT";
    return "ARIZA";
  }

  function extractRequest(text) {
    const sentences = String(text || "").split(/(?<=[.!?])\s+/);
    const re = CATS.FACT_RE.request;
    const hit = sentences.filter(function (s) { return re.test(UZ.forMatch(s)); });
    return hit.join(" ").trim();
  }

  /** Qoʻshimcha maʼlumotlar maydonidan faktlar roʻyxati (qator yoki ";" boʻyicha) */
  function factsFromExtra(extra) {
    return String(extra || "").split(/[\n;]+/).map(function (x) { return x.trim().replace(/[.,]+$/, ""); })
      .filter(function (x) { return x.length >= 2; }).slice(0, 10);
  }

  function classifyLocal(text, extraInfo) {
    const t = matchText(String(text || "") + (extraInfo ? "\n" + extraInfo : ""));
    const scores = CATS.LIST.map(function (c) {
      let s = 0;
      c.kw.forEach(function (k) { if (t.indexOf(k) >= 0) s += k.length > 5 ? 2 : 1; });
      return { id: c.id, s: s };
    }).sort(function (a, b) { return b.s - a.s; });
    const top = scores[0].s > 0 ? scores[0] : { id: "other", s: 0 };
    const cat = CATS.byId(top.id);
    const missing = [];
    cat.facts.forEach(function (f) { if (!CATS.FACT_RE[f].test(t)) missing.push(f); });
    const requestedAction = extractRequest(text);
    if (!requestedAction) missing.unshift("request");
    return {
      source: "local",
      category: cat.id,
      secondaryCategories: scores.filter(function (x) { return x.s > 0 && x.id !== cat.id; }).slice(0, 2).map(function (x) { return x.id; }),
      documentType: detectDocType(t),
      summary: String(text || "").trim(),
      keyFacts: factsFromExtra(extraInfo),
      requestedAction: requestedAction,
      missingInfo: missing.slice(0, 3).map(function (id) { return { id: id }; }),
      confidence: top.s > 0 ? Math.min(0.9, 0.4 + top.s * 0.1) : 0.2
    };
  }

  /* ---------------- Asosiy funksiya ---------------- */
  async function classify(text, opts) {
    opts = opts || {};
    const info = await detectServer();
    const extra = String(opts.extraInfo || "").trim();
    if (!info.ai) return classifyLocal(text, extra);
    const ctrl = new AbortController();
    const timer = setTimeout(function () { ctrl.abort(); }, 60000);
    try {
      const res = await fetch(CFG.API_BASE + "/api/classify", {
        method: "POST", signal: ctrl.signal,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: redact(text, opts.profile).slice(0, CFG.TEXT.maxChars), extraInfo: redact(extra, opts.profile).slice(0, CFG.TEXT.extraMaxChars), targetLocale: opts.locale || "uz-Latn" })
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const j = await res.json();
      const v = validateClassification(j);
      if (!v.ok) throw new Error("schema: " + v.errors.join(","));
      return {
        source: "ai",
        category: j.category,
        secondaryCategories: j.secondaryCategories || [],
        documentType: j.documentType,
        summary: j.summary,
        keyFacts: j.keyFacts,
        requestedAction: j.requestedAction,
        missingInfo: j.missingInfo.map(function (q, i) { return { id: "ai" + i, question: q }; }),
        confidence: j.confidence
      };
    } catch (e) {
      console.warn("AI tasniflash xatosi, lokal qoidalarga oʻtildi:", e.message);
      const r = classifyLocal(text, extra);
      r.aiFailed = true;
      return r;
    } finally {
      clearTimeout(timer);
    }
  }

  return { detectServer: detectServer, classify: classify, classifyLocal: classifyLocal, redact: redact, factsFromExtra: factsFromExtra, validateClassification: validateClassification, matchText: matchText };
})();
