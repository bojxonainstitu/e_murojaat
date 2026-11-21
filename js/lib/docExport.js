/* =====================================================================
   docExport — nusxa olish, DOCX yuklash, chop etish
   (avvalgi js/app.js dagi ishlayotgan funksiyalar shu yerga koʻchirildi)
   ===================================================================== */
(function (root) {
  "use strict";

  /** Tahrirlangan hujjatdan paragraflar roʻyxati: { text, cls, bold, gap } */
  function paperLines(paper) {
    const out = [];
    paper.childNodes.forEach(function (n) {
      if (n.nodeType === 3) { if (n.textContent.trim()) out.push({ text: n.textContent.trim(), cls: "" }); return; }
      if (n.nodeType !== 1) return;
      const cls = n.className || "";
      const b = n.querySelector("b,strong");
      const bold = !!b && n.textContent.trim() === (b.textContent || "").trim();
      const text = n.innerText.replace(/ /g, " ");
      out.push({ text: text, cls: cls, bold: bold, gap: cls.indexOf("d-gap") >= 0 });
    });
    return out;
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); ta.remove();
    }
  }

  /** DOCX: A4, Times New Roman (kirill va lotin), 14 pt */
  function downloadDocx(paper, fileBase) {
    const D = root.docx;
    if (!D) return Promise.reject(new Error("docx_missing"));
    const FONT = "Times New Roman";
    const paras = paperLines(paper).map(function (l) {
      if (l.gap) return new D.Paragraph({ children: [new D.TextRun({ text: "", font: FONT, size: 28 })] });
      let align = D.AlignmentType.LEFT;
      if (l.cls.indexOf("d-right") >= 0) align = D.AlignmentType.RIGHT;
      else if (l.cls.indexOf("d-center") >= 0) align = D.AlignmentType.CENTER;
      else if (l.cls.indexOf("d-just") >= 0) align = D.AlignmentType.JUSTIFIED;
      const isTitle = l.cls.indexOf("d-title") >= 0;
      const runs = l.text.split("\n").map(function (ln, i) {
        return new D.TextRun({ text: ln, font: { ascii: FONT, hAnsi: FONT, cs: FONT, eastAsia: FONT }, size: isTitle ? 32 : 28, bold: l.bold || isTitle, break: i > 0 ? 1 : 0 });
      });
      return new D.Paragraph({
        alignment: align, children: runs, spacing: { after: 80, line: 300 },
        indent: (l.cls.indexOf("d-just") >= 0 && l.cls.indexOf("d-li") < 0) ? { firstLine: 709 } : (l.cls.indexOf("d-li") >= 0 ? { left: 360 } : undefined)
      });
    });
    const doc = new D.Document({
      creator: root.EM_CONFIG.BRAND_NAME, title: fileBase,
      sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1701, right: 850 } } }, children: paras }]
    });
    return D.Packer.toBlob(doc).then(function (blob) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileBase + "_" + new Date().toISOString().slice(0, 10) + ".docx";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      return a.download;
    });
  }

  function printDoc() {
    document.body.classList.add("printing-doc");
    const done = function () { document.body.classList.remove("printing-doc"); window.removeEventListener("afterprint", done); };
    window.addEventListener("afterprint", done);
    window.print();
    setTimeout(done, 1500);
  }

  root.EM_EXPORT = { paperLines: paperLines, copyText: copyText, downloadDocx: downloadDocx, printDoc: printDoc };
})(typeof window !== "undefined" ? window : globalThis);
