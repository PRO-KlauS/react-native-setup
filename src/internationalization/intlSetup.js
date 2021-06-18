import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import store from "../redux/store";
import enTranslation from "./enTranslation";
import hiTranslation from "./hiTranslation";

let state = (store && store.getState()) || {};

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
