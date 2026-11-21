/* =====================================================================
   ai/stt — nutqni matnga oʻgirish (Speech-to-Text) mijoz interfeysi
   transcribe(blob, locale): Promise<string>
   Audio serverning /api/transcribe manziliga yuboriladi; haqiqiy provayder
   server/stt.py da ulanadi (docs va server/.env.example ga qarang).
   Provayder ulanmagan boʻlsa: Error("not_configured").
   ===================================================================== */
window.EM_STT = (function () {
  "use strict";
  const CFG = window.EM_CONFIG;

  async function transcribe(blob, locale) {
    const info = await window.EM_AI.detectServer();
    if (!info.stt) throw new Error("not_configured");
    const res = await fetch(CFG.API_BASE + "/api/transcribe", {
      method: "POST",
      headers: { "content-type": blob.type || "application/octet-stream", "x-locale": locale || "uz-Latn" },
      body: blob
    });
    if (res.status === 501) throw new Error("not_configured");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const j = await res.json();
    if (!j || typeof j.text !== "string") throw new Error("bad_response");
    return j.text;
  }

  return { transcribe: transcribe };
})();
