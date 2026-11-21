/* =====================================================================
   docTemplate — rasmiy murojat hujjatining deterministik shabloni
   7 boʻlim: 1) Kimga  2) Kimdan  3) Hujjat turi  4) Bayon va faktlar
             5) Qonuniy asos va talab  6) Ilovalar  7) Sana va imzo
   AI faqat 4- va 5-boʻlim matnini beradi (summary, keyFacts, requestedAction).
   Qonunlar AI xotirasidan emas, legal_basis_db dan olinadi.
   Natija: [{ cls, html, section }] — html ichida foydalanuvchi matni ekranlangan.
   ===================================================================== */
(function (root) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ph(v, label) { return v ? esc(v) : '<span class="missing">[' + esc(label) + "]</span>"; }
  function lowerFirst(s) { s = String(s || ""); return s.charAt(0).toLowerCase() + s.slice(1); }
  function shortName(fish) {
    const p = String(fish || "").trim().split(/\s+/).filter(Boolean);
    if (p.length < 2) return fish || "";
    return p[0] + " " + p.slice(1).map(function (x) { return x.charAt(0).toUpperCase() + "."; }).join("");
  }
  function today(suffix) {
    const d = new Date();
    const p = function (n) { return (n < 10 ? "0" : "") + n; };
    return p(d.getDate()) + "." + p(d.getMonth() + 1) + "." + d.getFullYear() + (suffix || "");
  }

  /**
   * @param ctx { profile, analysis, answers, attachments: string[], org, chain, docType }
   */
  function build(ctx) {
    const I = root.EM_I18N, T = I.t, L = I.locale;
    const REG = root.EM_REGIONS, ORG = root.EM_ORGS, LAWS = root.EM_LAWS, UZ = root.EM_UZ;
    const p = ctx.profile || {}, a = ctx.analysis || {}, answers = ctx.answers || {};
    const out = [];
    const add = function (section, cls, html) { out.push({ section: section, cls: cls, html: html }); };

    const fish = I.script(p.fish || "");
    const region = REG.byId(p.regionId), district = REG.district(p.regionId, p.districtId);
    const placeParts = [region ? REG.label(region, L) : "", district ? REG.label(district, L) : "", I.script(p.address || "")].filter(Boolean);
    const contact = [p.phone, p.email].filter(Boolean).join(", ");

    // 1) Kimga — eng quyi bosqich + hudud + "rahbariga" (lavozim boʻlsa — lavozim). Shaxs ismi yozilmaydi.
    const low = ctx.chain && ctx.chain[0];
    const lowText = low ? low.title + (low.locality ? " (" + low.locality + ")" : "") : (ctx.org ? ORG.label(ctx.org, L) : "");
    const role = ctx.org && ctx.org.responsibleRole ? ORG.localize(ctx.org.responsibleRole, L) : "";
    add(1, "d-right", "<b>" + (lowText ? esc(role ? lowText + " — " + role : T("doc.toHead", { org: lowText })) : ph("", T("ph.d.organ"))) + "</b>");
    add(1, "d-gap", "");
    // 2) Kimdan
    add(2, "d-right", T("doc.from", { fish: ph(fish, T("ph.d.fish")) }));
    add(2, "d-right", esc(T("doc.addr")) + ph(placeParts.join(", "), T("ph.d.address")));
    add(2, "d-right", esc(T("doc.contact")) + ph(contact, T("ph.d.contact")));
    add(2, "d-gap", "");
    // 3) Hujjat turi
    const typeKey = { ARIZA: "tur.ariza", SHIKOYAT: "tur.shikoyat", TAKLIF: "tur.taklif" }[ctx.docType] || "tur.ariza";
    add(3, "d-center d-title", "<b>" + esc(T(typeKey).toUpperCase()) + "</b>");
    const mavzu = T("mavzu." + a.category);
    add(3, "d-center", "<i>" + esc(T("doc.about", { mavzu: mavzu })) + "</i>");
    add(3, "d-gap", "");
    // 4) Bayon va faktlar
    add(4, "d-just", T("doc.intro", { fish: ph(fish, T("ph.d.fish")), mavzu: esc(mavzu) }));
    const bayon = a.source === "ai" ? a.summary : I.script(a.summary || "");
    add(4, "d-just", bayon ? esc(UZ.sentence(bayon)) : '<span class="missing">[' + esc(T("doc.noBayon")) + "]</span>");
    (a.keyFacts || []).forEach(function (f) { add(4, "d-just d-li", "— " + esc(UZ.sentence(a.source === "ai" ? f : I.script(f)))); });
    const extra = Object.keys(answers).filter(function (k) { return k !== "request" && String(answers[k] || "").trim(); })
      .map(function (k) {
        const label = I.has("fact." + k) ? T("fact." + k) : "";
        return (label ? label + ": " : "") + I.script(String(answers[k]).trim());
      });
    if (extra.length) add(4, "d-just", esc(T("doc.extra", { x: extra.join("; ") })));
    // 5) Qonuniy asos va talab
    const laws = LAWS.forCategory(a.category);
    if (laws.length) {
      add(5, "d-just", esc(T("doc.law", {
        laws: laws.map(function (l) { return LAWS.pickTitle(l, L); }).join(T("doc.lawJoin")),
        mazmun: lowerFirst(I.pick(laws[0].summary).replace(/\.$/, ""))
      })));
    }
    add(5, "d-just", esc(T("doc.proc", { law: LAWS.pickTitle(LAWS.appeals, L) })));
    add(5, "d-just", esc(ctx.docType === "TAKLIF" ? T("doc.askTaklif") : T("doc.ask")));
    const req = String(answers.request || "").trim() || String(a.requestedAction || "").trim();
    const items = [];
    if (req) items.push(esc(UZ.sentence(a.source === "ai" && !answers.request ? req : I.script(req))));
    else items.push('<span class="missing">[' + esc(T("doc.noTalab", { x: T("req." + a.category) })) + "]</span>");
    if (ctx.docType === "SHIKOYAT") items.push(esc(T("doc.itemShikoyat")));
    items.push(esc(T("doc.itemReply")));
    items.forEach(function (it, i) { add(5, "d-just d-li", (i + 1) + ". " + it); });
    add(5, "d-gap", "");
    // 6) Ilovalar
    const att = ctx.attachments || [];
    if (att.length) {
      add(6, "", "<b>" + esc(T("doc.att")) + "</b>");
      att.forEach(function (name, i) { add(6, "d-li", esc(T("doc.attItem", { n: i + 1, x: name }))); });
    } else {
      add(6, "", esc(T("doc.attNone")));
    }
    add(6, "d-gap", "");
    // 7) Sana va imzo
    add(7, "d-sign", esc(T("doc.date", { d: today(T("doc.dateSuffix")) })));
    add(7, "d-sign", esc(T("doc.sign")) + "&nbsp;&nbsp; " + ph(shortName(fish), T("ph.d.fish")));
    return out;
  }

  function toHtml(paras) {
    return paras.map(function (x) { return '<p class="' + x.cls + '" data-section="' + x.section + '">' + x.html + "</p>"; }).join("\n");
  }

  root.EM_DOC = { build: build, toHtml: toHtml, esc: esc, shortName: shortName, today: today };
})(typeof window !== "undefined" ? window : globalThis);
