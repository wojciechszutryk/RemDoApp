import { Typography } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translationKeys";
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
    if (currentUser) navigate("/reminders");
  }, [currentUser, navigate]);

  return (
    <StyledWrapper>
      <Typography>{t(TranslationKeys.LoginPanelHeader)}</Typography>
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
