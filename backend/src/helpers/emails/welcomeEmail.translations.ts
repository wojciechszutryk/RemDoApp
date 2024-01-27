import { AppLanguages } from "linked-models/language/languages.enum";

export const getWelcomeEmailSubject = (language?: AppLanguages) => {
  switch (language) {
    case AppLanguages.en:
      return "Welcome in RemDo";
    case AppLanguages.pl:
      return "Witamy w RemDo";
    default:
      return "Welcome in RemDo";
  }
};
