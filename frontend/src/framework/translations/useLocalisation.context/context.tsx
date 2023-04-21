import { BaseContextProps } from "framework/contexts/base.context.props";
import { createContext } from "react";
import { TodoListLanguages } from "../models/translations.model";
import { ContextProps } from "./models";

export const Context = createContext<BaseContextProps & ContextProps>({
  changeLanguage: () => {},
  initialized: false,
  language: localStorage.getItem("todoListLanguage") as TodoListLanguages,
});
