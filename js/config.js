/* =====================================================================
   E-murojat — YAGONA KONFIGURATSIYA
   Brend nomi, tillar va cheklovlar shu yerda.
   ===================================================================== */
window.EM_CONFIG = Object.freeze({
  BRAND_NAME: "E-murojat",

  // Server API (bir xil manbadan). file:// orqali ochilganda server boʻlmaydi → lokal rejim.
  API_BASE: "",

  LOCALES: [
    { code: "uz-Latn", label: "OʻZ", name: "Oʻzbekcha", htmlLang: "uz-Latn" },
    { code: "uz-Cyrl", label: "ЎЗ", name: "Ўзбекча", htmlLang: "uz-Cyrl" },
    { code: "ru", label: "РУ", name: "Русский", htmlLang: "ru" },
    { code: "kaa", label: "ҚҚ", name: "Қарақалпақша", htmlLang: "kaa" },
    { code: "en", label: "EN", name: "English", htmlLang: "en" }
  ],
  DEFAULT_LOCALE: "uz-Latn",

  ATTACHMENTS: {
    maxFileMB: 10,
    maxFiles: 10,
    maxTotalMB: 50,
    accept: "image/*,application/pdf",
    mimePrefixes: ["image/"],
    mimeExact: ["application/pdf"],
    extensions: ["jpg", "jpeg", "png", "webp", "heic", "heif", "gif", "pdf"]
  },

  VOICE: {
    maxSeconds: 120,
    mimeCandidates: ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/aac"]
  },

  TEXT: { minChars: 20, maxChars: 6000, extraMaxChars: 1500 },

  STORAGE_KEYS: { locale: "emurojat_locale", draft: "emurojat_draft", history: "emurojat_history" }
});
