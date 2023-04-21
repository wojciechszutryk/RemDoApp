import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { LoginPanel } from "pages/LoginPage/LoginPanel";
import { memo, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || undefined;

  useLayoutEffect(() => {
    const title =
      t(TranslationKeys.PageTitleMain) + t(TranslationKeys.PageTitleHome);
    document.title = title;
  });

  return (
    <>
      <LoginPanel defaultEmail={email} />
    </>
  );
};

export default memo(LoginPage);
