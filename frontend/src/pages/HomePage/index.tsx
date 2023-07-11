import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import FeaturesSection from "./components/FeaturesSection";
import TopSection from "./components/TopSection";

const HomePage = (): JSX.Element => {
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
