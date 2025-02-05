import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { LoginPanel } from "pages/LoginPage/LoginPanel";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import VerifyAccountPanel from "./VerifyAccountPanel";

interface Props {
  showAccountVerifyPanel?: boolean;
}

const LoginPage = ({ showAccountVerifyPanel }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { currentUser } = useCurrentUser();
  const [isRegistering, setIsRegistering] = useState(
    window.location.href.includes("register")
  );
  const navigate = useNavigate();
  const email = searchParams.get("email") || undefined;

  useLayoutEffect(() => {
    const title = `${t(TranslationKeys.PageTitleMain)} - ${
      isRegistering
        ? t(TranslationKeys.PageTitleSignUp)
        : t(TranslationKeys.PageTitleSignIn)
    }`;
    document.title = title;
  }),
    [];

  useEffect(() => {
    if (currentUser) navigate(Pages.HomePage.path);
  }, [currentUser, navigate]);

  return (
    <LoginPanel
      defaultEmail={email}
      setIsRegistering={setIsRegistering}
      isRegistering={isRegistering}
      disableAutoRedirect={showAccountVerifyPanel}
    >
      {showAccountVerifyPanel && <VerifyAccountPanel />}
    </LoginPanel>
  );
};

export default memo(LoginPage);
