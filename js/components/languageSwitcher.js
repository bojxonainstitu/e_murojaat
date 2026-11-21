/* =====================================================================
   LanguageSwitcher — 5 ta til tugmasi; tor ekranda ixcham ochiladigan roʻyxat
   Joylash: <div data-lang-switch></div>  (data-variant="dark" — toʻq fon uchun)
   ===================================================================== */
window.EM_LangSwitcher = (function () {
  "use strict";
  const CFG = window.EM_CONFIG, I = window.EM_I18N;

  function render(host) {
    const dark = host.getAttribute("data-variant") === "dark";
    const cur = I.locale;
    const btns = CFG.LOCALES.map(function (l) {
      const on = l.code === cur;
      return '<button type="button" lang="' + l.htmlLang + '" data-lang="' + l.code + '" aria-pressed="' + on + '" class="' + (on ? "active" : "") + '" title="' + l.name + '">' + l.label + "</button>";
    }).join("");
    const opts = CFG.LOCALES.map(function (l) {
      return '<option value="' + l.code + '"' + (l.code === cur ? " selected" : "") + ">" + l.label + " · " + l.name + "</option>";
    }).join("");
    host.innerHTML =
      '<div class="lang-switch' + (dark ? " dark" : "") + '" role="group" aria-label="' + I.t("lang.menu") + '">' + btns + "</div>" +
      '<label class="lang-select' + (dark ? " dark" : "") + '"><span class="sr-only">' + I.t("lang.menu") + "</span>" +
      '<span class="lang-globe" aria-hidden="true">🌐</span><select aria-label="' + I.t("lang.menu") + '">' + opts + "</select></label>";
    host.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { I.setLocale(b.getAttribute("data-lang")); });
    });
    host.querySelector("select").addEventListener("change", function (e) { I.setLocale(e.target.value); });
  }

  function mountAll(root) {
    (root || document).querySelectorAll("[data-lang-switch]").forEach(render);
  }

  document.addEventListener("em:langchange", function () { mountAll(); });
  return { mountAll: mountAll };
})();
