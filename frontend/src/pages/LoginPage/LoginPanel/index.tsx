import { LAST_PAGE_LS_KEY } from "atomicComponents/organisms/Header/helpers/LS.keys.const.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { StyledLoginHeader } from "pages/HomePage/components/TopSection/styles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { StyledWrapper } from "./styles";

export interface LoginPanelProps {
  defaultEmail?: string;
}

export const LoginPanel = ({ defaultEmail }: LoginPanelProps): JSX.Element => {
  const { t } = useTranslation();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const lastPageFromLS = localStorage.getItem(LAST_PAGE_LS_KEY);
    if (currentUser) navigate(lastPageFromLS ?? Pages.RemindersPage.path);
  }, [currentUser, navigate]);

  return (
    <StyledWrapper>
      <StyledLoginHeader>
        {t(TranslationKeys.LoginPanelHeader)}
      </StyledLoginHeader>
      {isRegistering ? (
        <RegisterForm
          setIsRegistering={setIsRegistering}
          defaultEmail={defaultEmail}
        />
      ) : (
        <LoginForm
          setIsRegistering={setIsRegistering}
          defaultEmail={defaultEmail}
        />
      )}
    </StyledWrapper>
  );
};
