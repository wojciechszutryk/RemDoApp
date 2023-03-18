import { TranslationKeys } from "framework/translations/translationKeys";
import { memo, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { LoginPanel } from "./components/LoginSection/LoginPanel";

const HomePage = (): JSX.Element => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const title =
      t(TranslationKeys.PageTitleMain) + t(TranslationKeys.PageTitleHome);
    document.title = title;
  });

  return (
    <div>
      <LoginPanel></LoginPanel>
    </div>
  );
};

export default memo(HomePage);
