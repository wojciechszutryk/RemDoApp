import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";

export const dateDiffText = (
  t: (key: TranslationKeys) => string,
  date: Date
) => {
  const timeNow = new Date().getTime();
  const time = new Date(date).getTime();
  const timeDiff = timeNow - time;
  return Math.abs(timeDiff) % (24 * 60 * 60 * 1000);
};
