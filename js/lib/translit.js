/* =====================================================================
   translit — yozuvlar orasida qoidaviy oʻgirish (ZAXIRA vosita)
   - uzLatnToCyrl: oʻzbek lotin → kirill (foydalanuvchi matni va AI zaxirasi)
   - uzCyrlToLatn: oʻzbek kirill → lotin (kirillcha yozilgan muammoni tanib olish uchun)
   - kaaLatnToCyrl: qoraqalpoq lotin → kirill
   Statik interfeys matnlari bu yerdan EMAS, qoʻlda tuzilgan lugʻatlardan olinadi.
   URL, e-pochta, {oʻzgaruvchi}, §token va HTML teglar oʻgirilmaydi.
   ===================================================================== */
(function (root) {
  "use strict";
  const UZ = root.EM_UZ;

  const PROTECT = /(<[^>]+>|\{[^}]+\}|§\w|https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.]+|\b[\w-]+(?:\.[\w-]+)*\.(?:uz|com|org|ru|md|js|docx|pdf)\b|\b(?:DOCX|PDF|AI|API|E-murojat|LexHakaton|MVP|STT|URL|ID)\b)/g;

  function mapProtected(text, fn) {
    const s = String(text == null ? "" : text);
    let out = "", last = 0, m;
    PROTECT.lastIndex = 0;
    while ((m = PROTECT.exec(s))) {
      out += fn(s.slice(last, m.index)) + m[0];
      last = m.index + m[0].length;
    }
    return out + fn(s.slice(last));
  }

  function isUpper(ch) { return ch && ch !== ch.toLowerCase() && ch === ch.toUpperCase(); }
  function isLetter(ch) { return !!ch && /[A-Za-zÀ-ɏЀ-ӿʻʼ]/.test(ch); }

  // Soʻz toʻliq katta harfdami (ARIZA, SHIKOYAT)?
  function wordAllCaps(s, i) {
    let a = i, b = i;
    while (a > 0 && isLetter(s[a - 1])) a--;
    while (b < s.length && isLetter(s[b])) b++;
    const w = s.slice(a, b).replace(/[ʻʼ]/g, "");
    return w.length > 1 && w === w.toUpperCase() && w !== w.toLowerCase();
  }

  function applyCase(src, out, s, i) {
    if (!isUpper(src[0])) return out;
    if (wordAllCaps(s, i) || (src.length > 1 && isUpper(src[1]))) return out.toUpperCase();
    return out.charAt(0).toUpperCase() + out.slice(1);
  }

  /* ---------------- Oʻzbek: lotin → kirill ---------------- */
  const UZ_PAIRS = [
    ["sʼh", "сҳ"], ["oʻ", "ў"], ["gʻ", "ғ"], ["sh", "ш"], ["ch", "ч"],
    ["yo", "ё"], ["yu", "ю"], ["ya", "я"], ["ye", "е"]
  ];
  const UZ_SINGLE = {
    a: "а", b: "б", d: "д", f: "ф", g: "г", h: "ҳ", i: "и", j: "ж", k: "к", l: "л", m: "м", n: "н",
    o: "о", p: "п", q: "қ", r: "р", s: "с", t: "т", u: "у", v: "в", x: "х", y: "й", z: "з", c: "ц", w: "в",
    "ʼ": "ъ"
  };

  function uzChunkToCyrl(chunk) {
    const s = UZ ? UZ.normalizeApostrophes(chunk) : chunk;
    let out = "";
    for (let i = 0; i < s.length;) {
      const low = s.slice(i, i + 3).toLowerCase();
      let done = false;
      for (const [lat, cyr] of UZ_PAIRS) {
        if (low.startsWith(lat)) {
          // "yoʻ" = y + oʻ (йў), "yo" emas
          if (lat === "yo" && s[i + 2] === "ʻ") break;
          // undosh + "ye" soʻz ichida (obyekt, subyekt) → "ъе"
          if (lat === "ye" && i > 0 && isLetter(s[i - 1]) && "aeiouʻʼ".indexOf(s[i - 1].toLowerCase()) < 0) out += "ъ";
          out += applyCase(s.slice(i, i + lat.length), cyr, s, i);
          i += lat.length; done = true; break;
        }
      }
      if (done) continue;
      const ch = s[i], lc = ch.toLowerCase();
      if (lc === "e") {
        const prev = s[i - 1];
        out += applyCase(ch, isLetter(prev) ? "е" : "э", s, i);
      } else if (UZ_SINGLE[lc] !== undefined) {
        out += applyCase(ch, UZ_SINGLE[lc], s, i);
      } else if (ch === "ʻ") {
        out += ""; // yakka ʻ (oʻ/gʻ dan tashqari) — tashlab yuboriladi
      } else {
        out += ch;
      }
      i += 1;
    }
    return out;
  }

  function uzLatnToCyrl(text) { return mapProtected(text, uzChunkToCyrl); }

  /* ---------------- Oʻzbek: kirill → lotin ---------------- */
  const CYR_MAP = {
    а: "a", б: "b", в: "v", г: "g", д: "d", ж: "j", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n",
    о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "x", ц: "ts", ч: "ch", ш: "sh", ъ: "ʼ",
    ь: "", э: "e", ю: "yu", я: "ya", ё: "yo", ў: "oʻ", қ: "q", ғ: "gʻ", ҳ: "h", ы: "i", щ: "sh"
  };
  function uzCyrlToLatn(text) {
    const s = String(text == null ? "" : text);
    let out = "";
    for (let i = 0; i < s.length; i++) {
      const ch = s[i], lc = ch.toLowerCase();
      let r;
      if (lc === "е") r = isLetter(s[i - 1]) && !/[аеиоуўэюяё]/i.test(s[i - 1]) ? "e" : "ye";
      else r = CYR_MAP[lc];
      if (r === undefined) { out += ch; continue; }
      if (ch !== lc && r) r = (isUpper(s[i + 1]) ? r.toUpperCase() : r.charAt(0).toUpperCase() + r.slice(1));
      out += r;
    }
    return out;
  }

  /* ---------------- Qoraqalpoq: lotin → kirill ---------------- */
  const KAA_PAIRS = [["sh", "ш"], ["ch", "ч"], ["ya", "я"], ["yu", "ю"], ["yo", "ё"]];
  const KAA_SINGLE = {
    a: "а", "á": "ә", b: "б", d: "д", e: "е", f: "ф", g: "г", "ǵ": "ғ", h: "ҳ", x: "х", "ı": "ы", i: "и",
    j: "ж", k: "к", q: "қ", l: "л", m: "м", n: "н", "ń": "ң", o: "о", "ó": "ө", p: "п", r: "р", s: "с",
    t: "т", u: "у", "ú": "ү", v: "в", w: "ў", y: "й", z: "з", c: "ц", "í": "и"
  };
  function kaaChunkToCyrl(s) {
    let out = "";
    for (let i = 0; i < s.length;) {
      const low = s.slice(i, i + 2).toLowerCase();
      const pair = KAA_PAIRS.find(function (p) { return low === p[0]; });
      if (pair) { out += applyCase(s.slice(i, i + 2), pair[1], s, i); i += 2; continue; }
      const ch = s[i];
      // "I" → и (soʻz boshidagi i koʻp uchraydi: ijara, isbilermen); "ı" → ы
      const lc = ch.toLowerCase();
      const r = KAA_SINGLE[lc];
      out += r === undefined ? ch : applyCase(ch, r, s, i);
      i += 1;
    }
    return out;
  }
  function kaaLatnToCyrl(text) { return mapProtected(text, kaaChunkToCyrl); }

  /* ---------------- Qoraqalpoq: kirill → lotin (faqat matnni tanib olish uchun) ---------------- */
  const KAA_CYR = {
    а: "a", ә: "á", б: "b", в: "v", г: "g", ғ: "ǵ", д: "d", е: "e", ё: "yo", ж: "j", з: "z", и: "i", й: "y", к: "k", қ: "q",
    л: "l", м: "m", н: "n", ң: "ń", о: "o", ө: "ó", п: "p", р: "r", с: "s", т: "t", у: "u", ү: "ú", ў: "w", ф: "f", х: "x",
    ҳ: "h", ц: "c", ч: "ch", ш: "sh", ы: "ı", э: "e", ю: "yu", я: "ya", ъ: "", ь: ""
  };
  function kaaCyrlToLatn(text) {
    return String(text == null ? "" : text).split("").map(function (ch) {
      const r = KAA_CYR[ch.toLowerCase()];
      if (r === undefined) return ch;
      return ch !== ch.toLowerCase() && r ? r.charAt(0).toUpperCase() + r.slice(1) : r;
    }).join("");
  }

  root.EM_TRANSLIT = { uzLatnToCyrl, uzCyrlToLatn, kaaLatnToCyrl, kaaCyrlToLatn };
})(typeof window !== "undefined" ? window : globalThis);
