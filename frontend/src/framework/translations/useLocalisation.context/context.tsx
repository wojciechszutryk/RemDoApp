import { BaseContextProps } from "framework/contexts/base.context.props";
import { AppLanguages } from "linked-models/language/languages.enum";
import { createContext } from "react";
import { TodoListPrefferedLanguageLSKey } from "../models/translations.const";
import { ContextProps } from "./models";

export const Context = createContext<BaseContextProps & ContextProps>({
  changeLanguage: () => {},
  initialized: false,
  language: localStorage.getItem(
    TodoListPrefferedLanguageLSKey
  ) as AppLanguages,
});
