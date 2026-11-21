/* =====================================================================
   E-murojat — i18n yuklagichi
   Lugʻatlar: js/i18n/<locale>.js  (window.EM_LOCALES[locale])
   Tokenlar:  §B → brend nomi (EM_CONFIG.BRAND_NAME), §m/§M → glossariy atamasi
   HTML:      data-i18n (matn), data-i18n-html (HTML), data-i18n-ph (placeholder),
              data-i18n-aria (aria-label), data-i18n-title (title)
   Hodisa:    til almashganda document'da "em:langchange"
   ===================================================================== */
window.EM_I18N = (function () {
  "use strict";
  const CFG = window.EM_CONFIG;
  const GL = window.EM_GLOSSARY;
  const LOC = window.EM_LOCALES || {};
  const CODES = CFG.LOCALES.map(function (l) { return l.code; });
  const LEGACY = { uz: "uz-Latn", ru: "ru", kaa: "kaa", en: "en" };

  let locale = CFG.DEFAULT_LOCALE;
  try {
    const saved = localStorage.getItem(CFG.STORAGE_KEYS.locale) || LEGACY[localStorage.getItem("emurojaat_lang")];
    if (saved && CODES.indexOf(saved) >= 0) locale = saved;
  } catch (e) { /* localStorage yoʻq */ }

  function tokens(s, loc) {
    const g = GL[loc] || GL["uz-Latn"];
    return String(s).replace(/§B/g, CFG.BRAND_NAME).replace(/§M/g, g.Appeal).replace(/§m/g, g.appeal);
  }

  /** Tarjima: joriy til → oʻzbek lotin → kalitning oʻzi */
  function t(key, vars) {
    const d = LOC[locale] || {};
    let s = d[key] != null ? d[key] : (LOC["uz-Latn"] && LOC["uz-Latn"][key] != null ? LOC["uz-Latn"][key] : key);
    s = tokens(s, locale);
    if (vars) s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
    return s;
  }

  function has(key) { return !!(LOC[locale] && LOC[locale][key] != null); }

  /** Maʼlumotlar bazasidagi koʻp tilli qiymat: {"uz-Latn": "...", "ru": "..."} */
  function pick(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return locale === "uz-Cyrl" ? window.EM_TRANSLIT.uzLatnToCyrl(obj) : obj;
    if (obj[locale]) return tokens(obj[locale], locale);
    // Zaxira: kirill yozuvli tillar uchun oʻzbek lotin matnining kirillchasi, qolganlar uchun oʻzbek lotin
    if ((locale === "uz-Cyrl" || locale === "kaa") && obj["uz-Latn"]) return tokens(window.EM_TRANSLIT.uzLatnToCyrl(obj["uz-Latn"]), locale);
    return tokens(obj["uz-Latn"] || obj.ru || obj.en || "", locale);
  }

  /** Foydalanuvchi yoki AI matnini joriy yozuvga keltirish (zaxira) */
  function script(text) {
    if (!text) return "";
    if ((locale === "uz-Cyrl" || locale === "kaa") && /[A-Za-z]/.test(text) && !/[Ѐ-ӿ]/.test(text)) return window.EM_TRANSLIT.uzLatnToCyrl(text);
    if (locale === "uz-Latn") return window.EM_UZ.uzNormalize(text);
    return text;
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    root.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    root.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    root.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    root.querySelectorAll("[data-i18n-title]").forEach(function (el) { el.setAttribute("title", t(el.getAttribute("data-i18n-title"))); });
    if (root === document) {
      const meta = CFG.LOCALES.find(function (l) { return l.code === locale; });
      document.documentElement.lang = meta ? meta.htmlLang : locale;
      document.title = t("meta.title");
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", t("meta.desc"));
      const ogt = document.querySelector('meta[property="og:title"]');
      if (ogt) ogt.setAttribute("content", t("meta.title"));
      const ogd = document.querySelector('meta[property="og:description"]');
      if (ogd) ogd.setAttribute("content", t("meta.desc"));
    }
  }

  function setLocale(code) {
    if (CODES.indexOf(code) < 0) return;
    locale = code;
    try { localStorage.setItem(CFG.STORAGE_KEYS.locale, code); } catch (e) { /* yoʻq */ }
    apply();
    document.dispatchEvent(new CustomEvent("em:langchange", { detail: { locale: code } }));
  }

  return {
    t: t, has: has, pick: pick, script: script, apply: apply, setLocale: setLocale,
    get locale() { return locale; },
    glossary: function () { return GL[locale]; }
  };
})();
