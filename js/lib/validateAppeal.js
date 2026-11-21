/* =====================================================================
   validateAppeal — rad etilishdan himoya tekshiruvi
   Kirish: { profile, analysis, answers, attachmentsCount, text, history }
   Chiqish: { items: [{id, status: 'pass'|'fix'|'warn'}], status: 'green'|'yellow'|'red', ok, all }
   ===================================================================== */
(function (root) {
  "use strict";

  /** Matndan barqaror xesh (takroriy murojatni aniqlash uchun) */
  function textHash(text) {
    const s = String(text || "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  function validateAppeal(ctx) {
    const V = root.EM_VALID;
    const p = ctx.profile || {};
    const a = ctx.analysis || {};
    const answers = ctx.answers || {};
    const items = [];
    const push = function (id, status) { items.push({ id: id, status: status }); };

    push("fish", V.isValidFish(p.fish) ? "pass" : "fix");
    push("contact", (V.isValidPhone(p.phone) || V.isValidEmail(p.email)) ? "pass" : "fix");
    push("address", (p.regionId && p.districtId && V.isValidAddress(p.address)) ? "pass" : "fix");
    const hasRequest = !!(String(a.requestedAction || "").trim() || String(answers.request || "").trim());
    push("request", hasRequest ? "pass" : (a.documentType === "TAKLIF" ? "warn" : "fix"));
    const missingFacts = (a.missingInfo || []).filter(function (m) {
      return m.id !== "request" && !String(answers[m.id] || "").trim();
    });
    push("facts", missingFacts.length ? "warn" : "pass");
    push("organ", (a.category && a.category !== "other" && (a.confidence == null || a.confidence >= 0.4)) ? "pass" : "warn");
    push("attachments", ctx.attachmentsCount > 0 ? "pass" : "warn");
    push("dateSign", "pass"); // shablon sana va imzo joyini har doim qoʻyadi
    const h = textHash(ctx.text);
    const dup = (ctx.history || []).some(function (x) { return x && x.hash === h && x.at && (Date.now() - x.at) > 60 * 1000; });
    push("duplicate", dup ? "warn" : "pass");

    const fix = items.some(function (x) { return x.status === "fix"; });
    const warn = items.some(function (x) { return x.status === "warn"; });
    return {
      items: items,
      status: fix ? "red" : (warn ? "yellow" : "green"),
      ok: items.filter(function (x) { return x.status === "pass"; }).length,
      all: items.length,
      hash: h
    };
  }

  root.EM_VALIDATE = { validateAppeal: validateAppeal, textHash: textHash };
})(typeof window !== "undefined" ? window : globalThis);
