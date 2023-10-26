import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { locale } from "dayjs";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { use } from "i18next";
import { AppLanguages } from "linked-models/language/languages.enum";
import { useChangePreferencesMutation } from "pages/UserPage/mutations/useChangePreferences.mutation";
import { ReactNode, useCallback, useContext, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { resources } from "../i18.config/resources";
import { TodoListPrefferedLanguageLSKey } from "../models/translations.const";
import { Context } from "./context";
import { ContextProps } from "./models";

interface Props {
  children: ReactNode;
}

const initialLanguage =
  localStorage.getItem(TodoListPrefferedLanguageLSKey) || AppLanguages.en;

use(initReactI18next).init(
  {
    lng: initialLanguage,
    debug: true,
    resources,
  },
  () => {
    if (initialLanguage !== AppLanguages.en) require(`dayjs/locale/pl`);

    locale(initialLanguage);
  }
);

function LocalisationProvider({ children }: Props): JSX.Element {
  const changePreferencesMutation = useChangePreferencesMutation();
  const { currentUser } = useCurrentUser();
  const [language, setLanguage] = useState<AppLanguages>(
    currentUser?.preferences.language || (initialLanguage as AppLanguages)
  );
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(() => {
    const newLanguage =
      language === AppLanguages.en ? AppLanguages.pl : AppLanguages.en;
    setLanguage(newLanguage);
    localStorage.setItem(TodoListPrefferedLanguageLSKey, newLanguage);
    i18n.changeLanguage(newLanguage, () => {});
    if (currentUser)
      changePreferencesMutation.mutate({ language: newLanguage });
  }, [changePreferencesMutation, currentUser, i18n, language]);

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
