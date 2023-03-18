import { TodoListLanguages } from "./models/translations.model";

export const changeLanguage = (newLanguage: TodoListLanguages) => {
  localStorage.setItem("theme", newLanguage);
};
