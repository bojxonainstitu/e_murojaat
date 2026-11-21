/* =====================================================================
   resolveOrganizations — soha + hudud boʻyicha organ va boshqaruv zanjiri

   resolveOrganizations({ categoryId, regionId, districtId, locale, text? }) → {
     primary: OrganizationInfo,
     others: OrganizationInfo[],      // masalan, kommunal soha uchun ikkinchi organ
     chain: { role: "quyi"|"orta"|"yuqori", title, level, locality? }[],
     usedLevel: "tuman"|"viloyat"|"respublika",
     isFallback: boolean              // soha uchun organ topilmadi → presidential_portal
   }

   • Tanlov categoryIds boʻyicha; hududga mos yozuv (districtId → regionId) boʻlsa — u ustun,
     boʻlmasa respublika darajasidagisi. Bazaga viloyat/tuman yozuvi qoʻshilsa, kod oʻzgarmaydi.
   • text (ixtiyoriy) — bir soha ichida organni tanlash uchun (org.kw), masalan svet → Energetika.
   • Hududiy organning rasmiy nomi YASALMAYDI: zanjirning tuman/viloyat bosqichlariga faqat
     foydalanuvchi tanlagan hudud nomi `locality` sifatida qoʻshiladi.
   ===================================================================== */
(function (root) {
  "use strict";
  const FALLBACK_ID = "presidential_portal";

  function forMatch(s) {
    const UZ = root.EM_UZ, TR = root.EM_TRANSLIT;
    const raw = String(s || "");
    if (!UZ) return raw.toLowerCase();
    return UZ.forMatch(raw) + " " + (TR ? UZ.forMatch(TR.uzCyrlToLatn(raw)) : "");
  }
  function kwScore(org, t) {
    return (org.kw || []).reduce(function (n, k) { return n + (t.indexOf(k) >= 0 ? 1 : 0); }, 0);
  }

  function resolveOrganizations(q) {
    const ORG = root.EM_ORGS, REG = root.EM_REGIONS;
    const all = ORG.ORGS, locale = q.locale || "uz-Latn";
    const region = REG ? REG.byId(q.regionId) : null;
    const district = REG && region ? REG.district(q.regionId, q.districtId) : null;

    let matches = all.filter(function (o) { return o.categoryIds.indexOf(q.categoryId) >= 0; });
    let isFallback = false;
    if (!matches.length) { matches = [ORG.byId(FALLBACK_ID)]; isFallback = true; }

    // Hudud boʻyicha ustunlik: tuman → viloyat → respublika
    const rank = function (o) {
      if (o.level === "tuman" && district && o.districtId === district.id) return 0;
      if (o.level === "viloyat" && region && o.regionId === region.id && !o.districtId) return 1;
      if (o.level === "respublika") return 2;
      return 9; // boshqa hududga tegishli yozuv
    };
    const t = q.text ? forMatch(q.text) : "";
    const pool = matches.filter(function (o) { return rank(o) < 9; });
    const list = (pool.length ? pool : [ORG.byId(FALLBACK_ID)]).map(function (o, i) { return { o: o, r: rank(o), k: t ? kwScore(o, t) : 0, i: i }; })
      .sort(function (a, b) { return a.r - b.r || b.k - a.k || a.i - b.i; });
    if (!pool.length) isFallback = true;
    const primary = list[0].o;
    const others = list.slice(1).filter(function (x) { return x.r === list[0].r; }).map(function (x) { return x.o; });

    const loc = function (level) {
      if (level === "tuman" && district) return REG.label(district, locale);
      if (level === "viloyat" && region) return REG.label(region, locale);
      return undefined;
    };
    const h = primary.hierarchy;
    const chain = h.map(function (s, i) {
      const role = i === 0 ? "quyi" : (i === h.length - 1 ? "yuqori" : "orta");
      const item = { role: role, title: ORG.localize(s.title, locale), level: s.level };
      const l = loc(s.level);
      if (l) item.locality = l;
      return item;
    });

    return { primary: primary, others: others, chain: chain, usedLevel: primary.level, isFallback: isFallback };
  }

  root.EM_RESOLVE = { resolveOrganizations: resolveOrganizations, FALLBACK_ID: FALLBACK_ID };
})(typeof window !== "undefined" ? window : globalThis);
