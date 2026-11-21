/* =====================================================================
   VoiceInput — ovozli kiritish (tasdiq bosqichi bilan)
   Holatlar: idle → recording → transcribing → ready | error
   QOIDA: oʻgirilgan matn faqat yozuv qatoriga qoʻyiladi; tahlilga
   foydalanuvchi "Tahlil qilish / Yuborish" tugmasini bosgandagina ketadi.
   ===================================================================== */
window.EM_Voice = (function () {
  "use strict";
  const CFG = window.EM_CONFIG, I = window.EM_I18N;

  /**
   * @param btn      mikrofon tugmasi
   * @param statusEl holat matni (aria-live)
   * @param onText   (text) => void — matnni yozuv qatoriga qoʻyish
   */
  function create(btn, statusEl, onText) {
    let state = "idle", rec = null, chunks = [], stream = null, timer = null, started = 0, msgKey = null, msgVars = null;

    function supported() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    }
    function pickMime() {
      if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) return "";
      return CFG.VOICE.mimeCandidates.find(function (m) { return MediaRecorder.isTypeSupported(m); }) || "";
    }
    function setState(s, key, vars) {
      state = s; msgKey = key || null; msgVars = vars || null;
      btn.dataset.state = s;
      btn.setAttribute("aria-pressed", String(s === "recording"));
      const label = btn.querySelector(".mic-label");
      if (label) label.textContent = I.t(s === "recording" ? "voice.stop" : "voice.start");
      btn.disabled = s === "transcribing";
      paint();
    }
    function paint() {
      if (!msgKey) { statusEl.textContent = ""; statusEl.className = "voice-status"; return; }
      statusEl.textContent = I.t(msgKey, msgVars);
      statusEl.className = "voice-status " + state;
    }
    function tick() {
      const sec = Math.floor((Date.now() - started) / 1000);
      const t = Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");
      msgVars = { t: t + " · " + I.t("voice.max", { s: CFG.VOICE.maxSeconds }) };
      paint();
      if (sec >= CFG.VOICE.maxSeconds) stop();
    }
    function cleanup() {
      clearInterval(timer); timer = null;
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      stream = null;
    }

    async function start() {
      if (!supported()) { setState("error", "voice.unsupported"); return; }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e) {
        setState("error", "voice.denied"); return;
      }
      const mime = pickMime();
      try {
        rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      } catch (e) {
        cleanup(); setState("error", "voice.unsupported"); return;
      }
      chunks = [];
      rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      rec.onstop = onStopped;
      rec.start(1000);
      started = Date.now();
      setState("recording", "voice.recording", { t: "0:00" });
      timer = setInterval(tick, 500);
    }

    function stop() { if (rec && rec.state !== "inactive") rec.stop(); cleanup(); }

    async function onStopped() {
      const blob = new Blob(chunks, { type: (rec && rec.mimeType) || "audio/webm" });
      setState("transcribing", "voice.transcribing");
      try {
        const text = await window.EM_STT.transcribe(blob, I.locale);
        if (!text.trim()) throw new Error("empty");
        onText(text.trim());
        setState("ready", "voice.ready");
      } catch (e) {
        setState("error", e.message === "not_configured" ? "voice.notConfigured" : "voice.error");
      }
    }

    btn.addEventListener("click", function () {
      if (state === "recording") stop(); else start();
    });
    document.addEventListener("em:langchange", function () { setState(state, msgKey, msgVars); });
    setState("idle");
    return { stop: stop, get state() { return state; } };
  }

  return { create: create };
})();
