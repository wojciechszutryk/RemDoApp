import { TodoListLanguages } from "../models/translations.model";

export interface ContextProps {
  changeLanguage: () => void;
  language: TodoListLanguages;
}
