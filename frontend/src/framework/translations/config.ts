import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { enTranslation } from "./en";
import { TodoListLanguages } from "./models/translations.model";
import { plTranslation } from "./pl";

export const resources = {
  en: { translation: enTranslation },
  pl: { translation: plTranslation },
};

i18next.use(initReactI18next).init({
  lng: localStorage.getItem("language") || TodoListLanguages.en,
  debug: true,
  resources,
});
