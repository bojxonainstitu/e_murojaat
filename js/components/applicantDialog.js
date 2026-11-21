/* =====================================================================
   ApplicantDialog — "Murojat qiluvchi maʼlumotlari" oynasi (1-qadam)
   Maydonlar: F.I.Sh., viloyat → tuman/shahar, manzil, telefon (+998) / e-pochta
   "Davom etish" faqat hammasi toʻgʻri boʻlganda faol.
   ===================================================================== */
window.EM_Applicant = (function () {
  "use strict";
  const I = window.EM_I18N, REG = window.EM_REGIONS, V = window.EM_VALID;
  const esc = function (s) { return window.EM_DOC.esc(s); };

  function field(id, labelKey, inner, hintKey, required) {
    return '<div class="fld" data-field="' + id + '">' +
      '<label for="ap-' + id + '">' + esc(I.t(labelKey)) + (required ? ' <span class="req" aria-hidden="true">*</span><span class="sr-only"> (' + esc(I.t("req")) + ")</span>" : "") + "</label>" +
      inner +
      (hintKey ? '<p class="fld-hint" id="ap-' + id + '-hint">' + esc(I.t(hintKey)) + "</p>" : "") +
      '<p class="fld-err" id="ap-' + id + '-err" role="alert" hidden></p></div>';
  }

  /**
   * @param host     konteyner
   * @param profile  state.profile (oʻzgaradi)
   * @param onDone   "Davom etish" bosilganda
   * @param onChange har oʻzgarishda (saqlash uchun)
   */
  function mount(host, profile, onDone, onChange) {
    const touched = {};
    const L = I.locale;
    const regionOpts = '<option value="">' + esc(I.t("ph.region")) + "</option>" + REG.REGIONS.map(function (r) {
      return '<option value="' + r.id + '"' + (profile.regionId === r.id ? " selected" : "") + ">" + esc(REG.label(r, L)) + "</option>";
    }).join("");

    host.innerHTML =
      '<section class="dialog-card" aria-labelledby="ap-title">' +
      '<header class="dc-head"><span class="dc-ico" aria-hidden="true">👤</span><div><h2 id="ap-title">' + esc(I.t("prof.title")) + "</h2>" +
      '<p class="dc-lead">🔒 ' + esc(I.t("prof.lead")) + "</p></div></header>" +
      '<form class="dc-body" novalidate>' +
      field("fish", "f.fish", '<input id="ap-fish" name="fish" type="text" autocomplete="name" required aria-describedby="ap-fish-err" placeholder="' + esc(I.t("ph.fish")) + '">', null, true) +
      '<div class="fld-row">' +
      field("region", "f.region", '<select id="ap-region" name="region" required aria-describedby="ap-region-err">' + regionOpts + "</select>", null, true) +
      field("district", "f.district", '<select id="ap-district" name="district" required aria-describedby="ap-district-err"></select>', null, true) +
      "</div>" +
      field("address", "f.address", '<input id="ap-address" name="address" type="text" autocomplete="street-address" required aria-describedby="ap-address-err" placeholder="' + esc(I.t("ph.address")) + '">', null, true) +
      '<fieldset class="fld-contact"><legend>' + esc(I.t("h.contact")) + "</legend>" +
      '<div class="fld-row">' +
      field("phone", "f.phone", '<input id="ap-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" aria-describedby="ap-phone-err" placeholder="' + esc(I.t("ph.phone")) + '">', null, false) +
      field("email", "f.email", '<input id="ap-email" name="email" type="email" inputmode="email" autocomplete="email" aria-describedby="ap-email-err" placeholder="' + esc(I.t("ph.email")) + '">', null, false) +
      "</div>" +
      '<p class="fld-err" id="ap-contact-err" role="alert" hidden></p></fieldset>' +
      '<div class="dc-foot"><p class="dc-status" id="ap-status" aria-live="polite"></p>' +
      '<button type="submit" class="btn primary big" id="ap-continue">' + esc(I.t("btn.continue")) + " →</button></div>" +
      "</form></section>";

    const $ = function (s) { return host.querySelector(s); };
    const els = { fish: $("#ap-fish"), region: $("#ap-region"), district: $("#ap-district"), address: $("#ap-address"), phone: $("#ap-phone"), email: $("#ap-email") };
    els.fish.value = profile.fish || ""; els.address.value = profile.address || "";
    els.phone.value = profile.phone || ""; els.email.value = profile.email || "";

    function fillDistricts() {
      const r = REG.byId(els.region.value);
      els.district.disabled = !r;
      els.district.innerHTML = '<option value="">' + esc(I.t(r ? "ph.district" : "ph.districtFirst")) + "</option>" +
        (r ? r.districts.map(function (d) {
          return '<option value="' + d.id + '"' + (profile.districtId === d.id ? " selected" : "") + ">" + esc(REG.label(d, I.locale)) + "</option>";
        }).join("") : "");
    }
    fillDistricts();

    function read() {
      profile.fish = els.fish.value.trim();
      profile.regionId = els.region.value;
      profile.districtId = els.district.value;
      profile.address = els.address.value.trim();
      profile.phone = els.phone.value.trim();
      profile.email = els.email.value.trim();
    }

    function showErr(name, key) {
      const e = host.querySelector("#ap-" + name + "-err");
      const input = els[name];
      if (!e) return;
      if (key) { e.textContent = I.t(key); e.hidden = false; if (input) input.setAttribute("aria-invalid", "true"); }
      else { e.hidden = true; e.textContent = ""; if (input) input.removeAttribute("aria-invalid"); }
    }

    function update(forceAll) {
      read();
      const v = V.validateProfile(profile);
      ["fish", "region", "district", "address", "phone", "email", "contact"].forEach(function (n) {
        const show = forceAll || touched[n] || (n === "contact" && (touched.phone || touched.email));
        showErr(n, show ? v.errors[n] : null);
      });
      const btn = $("#ap-continue");
      btn.disabled = !v.ok;
      btn.setAttribute("aria-disabled", String(!v.ok));
      const labels = { fish: "lbl.fish", region: "lbl.region", district: "lbl.district", address: "lbl.address", phone: "lbl.contact", email: "lbl.contact", contact: "lbl.contact" };
      const miss = Array.from(new Set(Object.keys(v.errors).map(function (k) { return I.t(labels[k]); })));
      const st = $("#ap-status");
      st.textContent = v.ok ? "✓ " + I.t("prof.ready") : I.t("prof.missing", { list: miss.join(", ") });
      st.className = "dc-status " + (v.ok ? "ok" : "");
      if (onChange) onChange();
      return v;
    }

    els.region.addEventListener("change", function () { profile.districtId = ""; fillDistricts(); touched.region = true; update(); });
    els.district.addEventListener("change", function () { touched.district = true; update(); });
    // +998 maskasi
    els.phone.addEventListener("input", function () {
      const before = els.phone.value;
      if (V.digits(before).length) els.phone.value = V.formatPhone(before);
      update();
    });
    els.phone.addEventListener("focus", function () { if (!els.phone.value) els.phone.value = "+998 "; });
    els.phone.addEventListener("blur", function () { if (V.digits(els.phone.value) === "998") els.phone.value = ""; touched.phone = true; update(); });
    ["fish", "address", "email"].forEach(function (n) {
      els[n].addEventListener("input", function () { update(); });
      els[n].addEventListener("blur", function () { touched[n] = true; update(); });
    });
    $("form").addEventListener("submit", function (e) {
      e.preventDefault();
      const v = update(true);
      if (!v.ok) {
        const first = ["fish", "region", "district", "address", "phone", "email"].find(function (n) { return v.errors[n]; }) || (v.errors.contact ? "phone" : null);
        if (first) els[first].focus();
        return;
      }
      if (onDone) onDone();
    });
    update();
    return { focus: function () { els.fish.focus({ preventScroll: true }); } };
  }

  /** Ixcham profil satri (2-qadamda) */
  function summary(profile) {
    const L = I.locale;
    const r = REG.byId(profile.regionId), d = REG.district(profile.regionId, profile.districtId);
    const parts = [r ? REG.label(r, L) : "", d ? REG.label(d, L) : ""].filter(Boolean).join(", ");
    const contact = [profile.phone, profile.email].filter(Boolean).join(" · ");
    return '<div class="profile-bar"><span class="pb-ico" aria-hidden="true">👤</span><div class="pb-text"><b>' + esc(I.script(profile.fish)) + "</b>" +
      "<span>" + esc(parts) + (contact ? " · " + esc(contact) : "") + "</span></div>" +
      '<button type="button" class="btn ghost sm" data-action="edit-profile">✎ ' + esc(I.t("prof.edit")) + "</button></div>";
  }

  return { mount: mount, summary: summary };
})();
