/* =====================================================================
   demos — hakaton namoyishi uchun 3 ta tezkor namuna (toʻqima maʼlumotlar)
   uz-Cyrl — oʻzbek lotin namunasidan, kaa — qoraqalpoq lotin matnidan oʻgiriladi.
   ===================================================================== */
window.EM_DEMOS = (function () {
  "use strict";
  const BASE = {
    "uz-Latn": {
      ishhaqi: { profile: { fish: "Aliyev Akmal Karimovich", regionId: "ts", districtId: "ts-chilonzor", address: "Bunyodkor koʻchasi, 12-uy, 34-xonadon", phone: "+998 90 123 45 67", email: "" },
        text: "Men “Yangi Qurilish Servis” MChJda 2025-yil martidan beri usta boʻlib ishlayman. 2026-yil avgust, sentyabr va oktyabr oylari uchun ish haqim (har oy 6 500 000 soʻm, jami 19 500 000 soʻm) toʻlanmayapti. Rahbariyatga ogʻzaki va Telegram orqali yozma murojat qildim, “keyinroq beramiz” deyishdi, lekin hali ham bermayapti. Kechiktirilgan ish haqimni toʻliq undirib berishingizni soʻrayman.",
        evidence: ["shartnoma", "yozishma"] },
      tovar: { profile: { fish: "Karimova Dilnoza Rustamovna", regionId: "sa", districtId: "sa-samarqand-sh", address: "Registon koʻchasi, 45-uy", phone: "", email: "dilnoza.karimova@example.uz" },
        text: "2026-yil 2-noyabrda “Texno Market” doʻkonidan 7 200 000 soʻmga kir yuvish mashinasi sotib oldim. 10 kundan soʻng mashina ishlamay qoldi, baraban aylanmayapti. Sotuvchi tovarni almashtirib berishdan va pulni qaytarishdan rad etdi. Kafolat muddati 1 yil. Tovarni almashtirib berishni yoki pulimni qaytarishni soʻrayman.",
        evidence: ["chek", "foto"] },
      chala: { profile: { fish: "Karimov", regionId: "", districtId: "", address: "", phone: "", email: "" },
        text: "svet yoʻq, hech kim kelmayapti", evidence: [] }
    },
    ru: {
      ishhaqi: { text: "Я работаю мастером в ООО «Yangi Qurilish Servis» с марта 2025 года. Зарплата за август, сентябрь и октябрь 2026 года (по 6 500 000 сумов, всего 19 500 000 сумов) не выплачивается. Я обращался к руководству устно и через Telegram, мне ответили «выплатим позже», но так и не выплатили. Прошу взыскать задержанную заработную плату в полном объёме." },
      tovar: { text: "2 ноября 2026 года в магазине «Texno Market» я купила стиральную машину за 7 200 000 сумов. Через 10 дней она перестала работать, барабан не вращается. Продавец отказался заменить товар и вернуть деньги. Гарантия — 1 год. Прошу заменить товар или вернуть деньги." },
      chala: { text: "нет света, никто не приходит" }
    },
    en: {
      ishhaqi: { text: "I have been working as a foreman at “Yangi Qurilish Servis” LLC since March 2025. My salary for August, September and October 2026 (6,500,000 soum per month, 19,500,000 soum in total) has not been paid. I asked the management orally and via Telegram; they said “we will pay later” but still have not. I request that my delayed salary be recovered in full." },
      tovar: { text: "On 2 November 2026 I bought a washing machine for 7,200,000 soum at the “Texno Market” shop. After 10 days it stopped working, the drum does not rotate. The seller refused to replace it or refund the money. The warranty is 1 year. Please replace the product or refund my money." },
      chala: { text: "no electricity, nobody comes" }
    },
    kaa: {
      ishhaqi: { text: "Men «Yangi Qurilish Servis» JShJ da 2025-jıldıń mart ayınan beri usta bolıp isleymen. 2026-jıldıń avgust, sentyabr hám oktyabr ayları ushın is haqım (hár ayda 6 500 000 swm, jámi 19 500 000 swm) tólenbey atır. Basshılıqqa awızsha hám Telegram arqalı múrájat ettim, «keyinirek beremiz» dedi, biraq ele de bermey atır. Is haqımdı tolıq óndirip beriwińizdi sorayman." },
      tovar: { text: "2026-jıl 2-noyabrde «Texno Market» dúkánınan 7 200 000 swmǵa kir juwıw mashinası satıp aldım. 10 kúnnen soń mashina islemey qaldı. Satıwshı tovardı almastırıp beriwden hám puldı qaytarıwdan bas tarttı. Kepillik múddeti 1 jıl. Tovardı almastırıwdı yamasa puldı qaytarıwdı sorayman." },
      chala: { text: "svet joq, hesh kim kelmey atır" }
    }
  };

  function get(key, locale) {
    const uz = BASE["uz-Latn"][key];
    const out = { profile: Object.assign({}, uz.profile), evidence: uz.evidence.slice(), text: uz.text };
    const TR = window.EM_TRANSLIT;
    if (locale === "uz-Cyrl" || locale === "kaa") {
      out.profile.fish = TR.uzLatnToCyrl(uz.profile.fish);
      out.profile.address = TR.uzLatnToCyrl(uz.profile.address);
    }
    if (locale === "uz-Cyrl") {
      out.text = TR.uzLatnToCyrl(uz.text);
    } else if (BASE[locale] && BASE[locale][key]) {
      out.text = locale === "kaa" ? TR.kaaLatnToCyrl(BASE[locale][key].text) : BASE[locale][key].text;
    }
    return out;
  }

  return { get: get };
})();
