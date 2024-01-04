import { LAST_PAGE_LS_KEY } from "atomicComponents/organisms/Header/helpers/LS.keys.const.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { StyledLoginHeader } from "pages/HomePage/components/TopSection/styles";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { StyledContentWrapper, StyledOuterWave, StyledWrapper } from "./styles";

interface LoginPanelProps {
  defaultEmail?: string;
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
  isRegistering: boolean;
  disableAutoRedirect?: boolean;
  children?: React.ReactNode;
}

export const LoginPanel = ({
  defaultEmail,
  setIsRegistering,
  isRegistering,
  disableAutoRedirect,
  children,
}: LoginPanelProps): JSX.Element => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const lastPageFromLS = localStorage.getItem(LAST_PAGE_LS_KEY);
    if (currentUser) navigate(lastPageFromLS ?? Pages.RemindersPage.path);
    else if (isRegistering) navigate(Pages.RegisterPage.path);
    else if (!disableAutoRedirect) navigate(Pages.LoginPage.path);
  }, [currentUser, disableAutoRedirect, isRegistering, navigate]);

  return (
    <StyledWrapper>
      <StyledOuterWave></StyledOuterWave>
      <StyledContentWrapper>
        <StyledLoginHeader variant="h5">
          {t(TranslationKeys.LoginPanelHeader)}
        </StyledLoginHeader>
        {children}
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
      </StyledContentWrapper>
    </StyledWrapper>
  );
};
