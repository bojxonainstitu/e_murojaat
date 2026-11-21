/* =====================================================================
   uzNormalize — oʻzbek lotin imlosini yagona belgilar toʻplamiga keltirish
   Tanlangan toʻplam:  oʻ / gʻ → U+02BB (ʻ),  tutuq belgisi → U+02BC (ʼ)
   Kiruvchi variantlar: '  ‘  ’  ʻ  ʼ  `  ´
   ===================================================================== */
(function (root) {
  "use strict";
  const TURNED = "ʻ"; // ʻ
  const MOD = "ʼ";    // ʼ
  const APOS = "['‘’ʻʼ`´]";
  const LETTER = "A-Za-zÀ-ɏ";

  const reOG = new RegExp("([oOgG])" + APOS, "g");
  // o/g dan keyingisi allaqachon ʻ boʻladi — tutuq faqat boshqa harflardan keyin
  const reTutuq = new RegExp("([A-FH-NP-Za-fh-np-z\\u00C0-\\u024F])" + APOS + "(?=[" + LETTER + "])", "g");
  const reLetter = new RegExp("[" + LETTER + "]");

  /** Apostrof variantlarini yagona toʻplamga keltiradi. */
  function normalizeApostrophes(text) {
    if (text == null) return "";
    let s = String(text);
    // o/g dan keyingi apostrof (soʻz ichida yoki oxirida: "boʻl", "togʻ") → ʻ
    s = s.replace(reOG, function (m, ch, offset, str) {
      const prev = offset > 0 ? str.charAt(offset - 1) : "";
      const next = str.charAt(offset + 2) || "";
      // Yakka "o'" (oldida ham, ortida ham harf yoʻq) — oʻzgartirmaymiz
      if (!reLetter.test(prev) && !reLetter.test(next)) return m;
      return ch + TURNED;
    });
    // Qolgan harf'harf → tutuq belgisi (maʼlum, eʼtibor, sanʼat)
    s = s.replace(reTutuq, "$1" + MOD);
    return s;
  }

  /** Boʻshliqlar va tinish belgilarini tartibga keltiradi. */
  function normalizeSpacing(text) {
    return String(text || "")
      .replace(/[ \t ]+/g, " ")
      .replace(/ +([,.;:!?])/g, "$1")
      .replace(/([,;:])(?=[^\s\d])/g, "$1 ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  /** Gap boshini katta harf bilan, oxirini nuqta bilan yakunlaydi. */
  function sentence(text) {
    let s = normalizeSpacing(text);
    if (!s) return "";
    s = s.charAt(0).toUpperCase() + s.slice(1);
    if (!/[.!?…]$/.test(s)) s += ".";
    return s;
  }

  /** Toʻliq normalizatsiya: apostroflar + boʻshliqlar. */
  function uzNormalize(text) {
    return normalizeSpacing(normalizeApostrophes(text));
  }

  /** Taqqoslash uchun: kichik harf, barcha apostroflar → ' */
  function forMatch(text) {
    return String(text || "").toLowerCase().replace(new RegExp(APOS, "g"), "'");
  }

  root.EM_UZ = { normalizeApostrophes, normalizeSpacing, sentence, uzNormalize, forMatch, TURNED, MOD };
})(typeof window !== "undefined" ? window : globalThis);
