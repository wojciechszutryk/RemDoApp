import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

const UserPage = (): JSX.Element => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const title =
      t(TranslationKeys.PageTitleMain) + t(TranslationKeys.PageTitleHome);
    document.title = title;
  });

  return (
    <>
      <TopSection />
      <FeaturesSection />
    </>
  );
};

export default memo(HomePage);
