import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { locale } from "dayjs";
import { use } from "i18next";
import { ReactNode, useCallback, useContext, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { resources } from "../i18.config/resources";
import { TodoListPrefferedLanguageLSKey } from "../models/translations.const";
import { TodoListLanguages } from "../models/translations.model";
import { Context } from "./context";
import { ContextProps } from "./models";

interface Props {
  children: ReactNode;
}

const initialLanguage =
  localStorage.getItem(TodoListPrefferedLanguageLSKey) || TodoListLanguages.en;

use(initReactI18next).init(
  {
    lng: initialLanguage,
    debug: true,
    resources,
  },
  () => {
    if (initialLanguage !== TodoListLanguages.en) require(`dayjs/locale/pl`);

    locale(initialLanguage);
  }
);

function LocalisationProvider({ children }: Props): JSX.Element {
  const [language, setLanguage] = useState<TodoListLanguages>(
    initialLanguage as TodoListLanguages
  );
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(() => {
    const newLanguage =
      language === TodoListLanguages.en
        ? TodoListLanguages.pl
        : TodoListLanguages.en;
    setLanguage(newLanguage);
    localStorage.setItem(TodoListPrefferedLanguageLSKey, newLanguage);
    i18n.changeLanguage(newLanguage, () => {});
  }, [i18n, language]);

  const value = {
    language,
    changeLanguage,
    initialized: true,
  };

  return (
    <Context.Provider value={value}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
        {children}
      </LocalizationProvider>
    </Context.Provider>
  );
}

function useLocalisation(): ContextProps {
  const context = useContext(Context);

  if (!context.initialized) {
    throw new Error("Context must be used within a <LocalisationProvider />");
  }

  return context;
}

export { LocalisationProvider, useLocalisation };
