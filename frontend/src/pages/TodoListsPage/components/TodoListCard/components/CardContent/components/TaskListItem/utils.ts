import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";

export const dateDiffText = (
  t: (key: TranslationKeys) => string,
  date: Date
) => {
  const timeNow = new Date().getTime();
  const time = new Date(date).getTime();
  const timeDiff = Math.abs(time - timeNow);
  const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (timeDiff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );

  return `${days} ${t(TranslationKeys.Days)}, ${hours} ${t(
    TranslationKeys.Hours
  )} ${time - timeNow < 0 ? t(TranslationKeys.Ago) : ""}. (${date
    .toString()
    .slice(0, 10)})`;
};
