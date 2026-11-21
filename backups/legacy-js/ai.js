/* =====================================================================
   E-murojaat — REAL AI API ULASH JOYI
   ---------------------------------------------------------------------
   Standart holatda sayt lokal (demo) mantiq bilan ishlaydi.
   AI rejimini yoqish uchun:
     1) Saytdagi "AI sozlamalari" tugmasi orqali API kalitini kiriting, YOKI
     2) Quyidagi AI_CONFIG.apiKey qiymatini to'ldiring.
   Javob kelmasa yoki xato bo'lsa — avtomatik lokal mantiqqa qaytadi.

   XAVFSIZLIK: brauzerda API kalitini saqlash faqat hakaton namoyishi
   uchun. Ishlab chiqarishda so'rovni o'z serveringiz (proxy) orqali
   yuboring va AI_CONFIG.endpoint ni o'sha manzilga almashtiring.
   ===================================================================== */

window.EM_AI = (function () {
  "use strict";

  const AI_CONFIG = {
    endpoint: "https://api.anthropic.com/v1/messages", // yoki o'z proxy serveringiz
    model: "claude-opus-5-5",
    apiVersion: "2023-06-01",
    apiKey: "",            // <-- bu yerga kalit yozish mumkin (tavsiya etilmaydi)
    timeoutMs: 90000
  };

  const LS_KEY = "emurojaat_api_key";

  function getKey() {
    if (AI_CONFIG.apiKey) return AI_CONFIG.apiKey;
    try { return localStorage.getItem(LS_KEY) || ""; } catch (e) { return ""; }
  }
  function setKey(k) {
    try {
      if (k) localStorage.setItem(LS_KEY, k); else localStorage.removeItem(LS_KEY);
    } catch (e) { /* localStorage yo'q — faqat sessiya uchun */ AI_CONFIG.apiKey = k || ""; }
  }
  function isEnabled() { return !!getKey(); }

  const SYSTEM_PROMPT = [
    "Sen O'zbekiston Respublikasi qonunchiligi bo'yicha fuqarolarga rasmiy murojaat tayyorlashda yordam beruvchi huquqiy yordamchisan.",
    "Javobni so'rovdagi \"javob_tili\" maydonida ko'rsatilgan tilda, rasmiy uslubda yoz: uz — o'zbek (lotin, oʻ/gʻ va ʼ belgilari bilan), ru — rus, kaa — qoraqalpoq (lotin), en — ingliz.",
    "QAT'IY QOIDA: qonun moddalari, band yoki qism raqamlarini HECH QACHON yozma. Faqat qonun / kodeks nomlarini va umumiy huquqiy mazmunni keltir.",
    "Ishonchingiz komil bo'lmagan organ yoki qonun nomini o'ylab topma — umumiyroq, ishonchli nomni tanla.",
    "Javob faqat bitta JSON obyekt bo'lsin, boshqa matnsiz. Sxema:",
    "{",
    "  \"turi\": \"ariza\" | \"shikoyat\" | \"taklif\",",
    "  \"organ\": \"asosiy vakolatli organ nomi\",",
    "  \"kimga\": \"hujjatning Kimga qatori, masalan: ... rahbariga\",",
    "  \"sabab\": \"nega aynan shu organ (1-3 gap)\",",
    "  \"qoshimcha\": [\"qo'shimcha yoki yuqori turuvchi organlar\"],",
    "  \"bosqich\": [\"tavsiya etiladigan qadamlar\"],",
    "  \"qonunlar\": [{\"nom\": \"qonun to'liq nomi\", \"mazmun\": \"umumiy huquqiy mazmun\"}],",
    "  \"bayon\": \"fuqaro yozgan muammoning rasmiy uslubdagi bayoni (faqat berilgan faktlar asosida, yangi fakt qo'shma)\",",
    "  \"talablar\": [\"aniq talablar, rasmiy uslubda\"]",
    "}"
  ].join("\n");

  async function analyze(form, lang) {
    const key = getKey();
    if (!key) throw new Error("API kaliti kiritilmagan");

    const ctrl = new AbortController();
    const timer = setTimeout(function () { ctrl.abort(); }, AI_CONFIG.timeoutMs);

    const userContent = JSON.stringify({
      javob_tili: lang || "uz",
      tanlangan_tur: form.tur,
      muammo_tavsifi: form.tavsif,
      aniq_talab: form.talab,
      mavjud_dalillar: form.dalillar,
      boshqa_ilova: form.boshqa
    }, null, 2);

    try {
      const res = await fetch(AI_CONFIG.endpoint, {
        method: "POST",
        signal: ctrl.signal,
        headers: {
          "content-type": "application/json",
          "x-api-key": key,
          "anthropic-version": AI_CONFIG.apiVersion,
          "anthropic-beta": "server-side-fallback-2026-07-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: AI_CONFIG.model,
          max_tokens: 8000,
          output_config: { effort: "low" },
          fallbacks: "default",
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userContent }]
        })
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error("API xatosi " + res.status + ": " + txt.slice(0, 200));
      }
      const data = await res.json();
      if (data.stop_reason === "refusal") throw new Error("Model so'rovni rad etdi");
      const text = (data.content || []).filter(function (b) { return b.type === "text"; })
        .map(function (b) { return b.text; }).join("");
      const s = text.indexOf("{"), e = text.lastIndexOf("}");
      if (s < 0 || e < s) throw new Error("AI javobida JSON topilmadi");
      return JSON.parse(text.slice(s, e + 1));
    } finally {
      clearTimeout(timer);
    }
  }

  return { AI_CONFIG, getKey, setKey, isEnabled, analyze };
})();
