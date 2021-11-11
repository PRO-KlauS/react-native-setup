import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import store from "./store";
import enTranslation from "../translations/enTranslation";
import hiTranslation from "../translations/hiTranslation";

const state = (store && store.getState()) || {};

i18n.use(initReactI18next).init({
  lng: state.language || "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        ...enTranslation,
      },
    },
    hi: {
      translation: {
        ...hiTranslation,
      },
    },
  },
});

export default i18n;
