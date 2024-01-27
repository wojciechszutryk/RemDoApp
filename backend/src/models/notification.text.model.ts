import { AppLanguages } from "linked-models/language/languages.enum";

export interface INotificationsTexts {
  title: Record<AppLanguages, string>;
  description: Record<AppLanguages, string>;
}
