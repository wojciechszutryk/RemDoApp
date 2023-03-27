import { Typography } from "@mui/material";
import { TranslationKeys } from "framework/translations/translationKeys";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { StyledWrapper } from "./styles";

export interface LoginPanelProps {
  defaultEmail?: string;
}

export const LoginPanel = ({ defaultEmail }: LoginPanelProps): JSX.Element => {
  const { t } = useTranslation();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

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
