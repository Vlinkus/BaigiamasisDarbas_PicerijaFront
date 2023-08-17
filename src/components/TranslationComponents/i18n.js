import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files

import translationEN from "../../locales/en/translation.json";
import translationLT from "../../locales/lt/translation.json";

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN
  },
  lt: {
    translation: translationLT
  }
};

//i18N Initialization
let defaultLanguage = localStorage.getItem("lang") || "lt";
i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage, //default language
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
