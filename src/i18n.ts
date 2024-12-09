import i18next from "https://deno.land/x/i18next@v24.0.5/index.js";
import enTranslation from "./locales/en.json" with {
  type: "json",
};
import zhTranslation from "./locales/zh.json" with {
  type: "json",
};
import arTranslation from "./locales/ar.json" with {
  type: "json",
};

const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

i18next
  .init({
    // debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    }
  });

let language = "en";
export function setLocale(lng: string) {
  language = lng;
}
export function getLocale() {
  return language;
}
export function to_current_language(key: string) {
  return i18next.t(key, { lng: language });
}
