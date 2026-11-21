/* =====================================================================
   validators — maydonlarni tekshirish (F.I.Sh., telefon, e-pochta, manzil)
   ===================================================================== */
(function (root) {
  "use strict";

  /** Faqat raqamlar */
  function digits(s) { return String(s || "").replace(/\D/g, ""); }

  /** +998 dan keyingi 9 ta raqamni ajratadi */
  function phoneLocal(s) {
    let d = digits(s);
    if (d.startsWith("998")) d = d.slice(3);
    return d.slice(0, 9);
  }

  /** +998 XX XXX XX XX maskasi */
  function formatPhone(s) {
    const d = phoneLocal(s);
    if (!d) return "";
    let out = "+998 " + d.slice(0, 2);
    if (d.length > 2) out += " " + d.slice(2, 5);
    if (d.length > 5) out += " " + d.slice(5, 7);
    if (d.length > 7) out += " " + d.slice(7, 9);
    return out;
  }

  function isValidPhone(s) {
    if (!String(s || "").trim()) return false;
    const d = phoneLocal(s);
    return d.length === 9 && /^[1-9]/.test(d);
  }

  function isValidEmail(s) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || "").trim());
  }

  function isValidFish(s) {
    const parts = String(s || "").trim().split(/\s+/).filter(function (w) { return w.replace(/[^\p{L}]/gu, "").length >= 2; });
    return parts.length >= 2;
  }

  function isValidAddress(s) {
    const t = String(s || "").trim();
    return t.length >= 6 && /\d/.test(t);
  }

  /** Profilni toʻliq tekshiradi → { ok, errors: {maydon: kalit} } */
  function validateProfile(p) {
    const e = {};
    if (!isValidFish(p.fish)) e.fish = "err.fish";
    if (!p.regionId) e.region = "err.region";
    if (!p.districtId) e.district = "err.district";
    if (!isValidAddress(p.address)) e.address = "err.address";
    const phoneOk = isValidPhone(p.phone), emailOk = isValidEmail(p.email);
    if (p.phone && !phoneOk) e.phone = "err.phone";
    if (p.email && !emailOk) e.email = "err.email";
    if (!phoneOk && !emailOk && !p.phone && !p.email) e.contact = "err.contact";
    if (!phoneOk && !emailOk && (p.phone || p.email) && !e.phone && !e.email) e.contact = "err.contact";
    return { ok: Object.keys(e).length === 0 && (phoneOk || emailOk), errors: e };
  }

  root.EM_VALID = { digits, phoneLocal, formatPhone, isValidPhone, isValidEmail, isValidFish, isValidAddress, validateProfile };
})(typeof window !== "undefined" ? window : globalThis);
