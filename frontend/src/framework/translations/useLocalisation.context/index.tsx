import i18next from "i18next";
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

i18next.use(initReactI18next).init({
  lng:
    localStorage.getItem(TodoListPrefferedLanguageLSKey) ||
    TodoListLanguages.en,
  debug: true,
  resources,
});

function LocalisationProvider({ children }: Props): JSX.Element {
  const [language, setLanguage] = useState<TodoListLanguages>(
    (localStorage.getItem(
      TodoListPrefferedLanguageLSKey
    ) as TodoListLanguages) || TodoListLanguages.en
  );
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(() => {
    const newLanguage =
      language === TodoListLanguages.en
        ? TodoListLanguages.pl
        : TodoListLanguages.en;
    setLanguage(newLanguage);
    localStorage.setItem(TodoListPrefferedLanguageLSKey, newLanguage);
    i18n.changeLanguage(newLanguage);
  }, [i18n, language]);

  const value = {
    language,
    changeLanguage,
    initialized: true,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useLocalisation(): ContextProps {
  const context = useContext(Context);

  if (!context.initialized) {
    throw new Error("Context must be used within a <LocalisationProvider />");
  }

  return context;
}

export { LocalisationProvider, useLocalisation };
