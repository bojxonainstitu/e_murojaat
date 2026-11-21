/* =====================================================================
   AttachmentList — dalil fayllarini biriktirish (rasm / PDF)
   Tekshiruv: MIME + kengaytma, har bir fayl hajmi, umumiy hajm va soni
   (qiymatlar EM_CONFIG.ATTACHMENTS da). Fayllar hech qayerga yuborilmaydi.
   ===================================================================== */
window.EM_Attach = (function () {
  "use strict";
  const CFG = window.EM_CONFIG.ATTACHMENTS, I = window.EM_I18N;
  const esc = function (s) { return window.EM_DOC.esc(s); };

  function sizeStr(b) {
    if (b < 1024) return b + " B";
    if (b < 1024 * 1024) return (b / 1024).toFixed(0) + " KB";
    return (b / 1024 / 1024).toFixed(1) + " MB";
  }
  function typeOk(f) {
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    const mimeOk = CFG.mimeExact.indexOf(f.type) >= 0 || CFG.mimePrefixes.some(function (p) { return (f.type || "").indexOf(p) === 0; });
    return mimeOk && CFG.extensions.indexOf(ext) >= 0;
  }

  /** Fayllarni tekshirib qoʻshadi → xato matnlari roʻyxati */
  function addFiles(list, files) {
    const errors = [];
    Array.prototype.forEach.call(files, function (f) {
      if (!typeOk(f)) { errors.push(I.t("att.errType", { name: f.name })); return; }
      if (f.size > CFG.maxFileMB * 1024 * 1024) { errors.push(I.t("att.errSize", { name: f.name, mb: CFG.maxFileMB })); return; }
      if (list.length >= CFG.maxFiles) { errors.push(I.t("att.errCount", { n: CFG.maxFiles })); return; }
      const total = list.reduce(function (s, x) { return s + x.file.size; }, 0) + f.size;
      if (total > CFG.maxTotalMB * 1024 * 1024) { errors.push(I.t("att.errTotal", { mb: CFG.maxTotalMB })); return; }
      list.push({ id: Math.random().toString(36).slice(2), file: f, url: f.type.indexOf("image/") === 0 ? URL.createObjectURL(f) : null });
    });
    return Array.from(new Set(errors));
  }

  function render(listEl, list, onRemove) {
    if (!list.length) { listEl.innerHTML = ""; listEl.hidden = true; return; }
    listEl.hidden = false;
    listEl.innerHTML = '<p class="att-title">' + esc(I.t("att.list")) + " (" + list.length + ")</p><ul>" + list.map(function (x, i) {
      return '<li><span class="att-thumb">' + (x.url ? '<img src="' + x.url + '" alt="">' : '<span aria-hidden="true">📄</span>') + "</span>" +
        '<span class="att-name"><b>' + (i + 1) + ". " + esc(x.file.name) + "</b><small>" + sizeStr(x.file.size) + "</small></span>" +
        '<button type="button" class="att-del" data-id="' + x.id + '" aria-label="' + esc(I.t("att.remove") + ": " + x.file.name) + '">✕</button></li>';
    }).join("") + "</ul>";
    listEl.querySelectorAll(".att-del").forEach(function (b) {
      b.addEventListener("click", function () {
        const idx = list.findIndex(function (x) { return x.id === b.dataset.id; });
        if (idx >= 0) { if (list[idx].url) URL.revokeObjectURL(list[idx].url); list.splice(idx, 1); }
        onRemove();
      });
    });
  }

  return { addFiles: addFiles, render: render, sizeStr: sizeStr, typeOk: typeOk };
})();
