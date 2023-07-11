import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { LoginPanel } from "pages/LoginPage/LoginPanel";
import { memo, useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const email = searchParams.get("email") || undefined;

  useLayoutEffect(() => {
    const title =
      t(TranslationKeys.PageTitleMain) + t(TranslationKeys.PageTitleHome);
    document.title = title;
  });

  useEffect(() => {
    if (currentUser) navigate(Pages.HomePage.path);
  }, [currentUser, navigate]);

  return (
    <>
      <LoginPanel defaultEmail={email} />
    </>
  );
};

export default memo(LoginPage);
