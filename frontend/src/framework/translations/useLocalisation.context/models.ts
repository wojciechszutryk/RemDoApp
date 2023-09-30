import { AppLanguages } from "linked-models/language/languages.enum";

export interface ContextProps {
  changeLanguage: () => void;
  language: AppLanguages;
}
