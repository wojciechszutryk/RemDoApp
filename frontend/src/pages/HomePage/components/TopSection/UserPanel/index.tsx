import { Button } from "atomicComponents/atoms/Button";
import { Separator } from "atomicComponents/atoms/Separator";
import { TextField } from "atomicComponents/atoms/TextField";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import GoogleButton from "pages/LoginPage/LoginPanel/GoogleButton";
import {
  StyledContentWrapper,
  StyledOuterWave,
  StyledWrapper,
} from "pages/LoginPage/LoginPanel/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { StyledLoginHeader } from "../styles";

export const UserPanel = (): JSX.Element => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <StyledWrapper>
      <StyledOuterWave/>
      <StyledContentWrapper>
        <StyledLoginHeader variant={"h5"}>
          {t(TranslationKeys.LoginPanelHeader)}
        </StyledLoginHeader>
        <TextField
          placeholder={t(TranslationKeys.Email)}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
        />
        <Button
          onClick={() =>
            navigate(
              email
                ? Pages.LoginPage.path + "?email=" + email
                : Pages.LoginPage.path
            )
          }
        >
          {t(TranslationKeys.LoginButtonText)}
        </Button>
        <Separator
          text={t(TranslationKeys.LoginPanelSeparatorText)}
          variant="secondary"
        />
        <Button
          onClick={() =>
            navigate(
              email
                ? Pages.RegisterPage.path + "?email=" + email
                : Pages.RegisterPage.path
            )
          }
        >
          {t(TranslationKeys.RegisterButtonText)}
        </Button>
        <GoogleButton />
      </StyledContentWrapper>
    </StyledWrapper>
  );
};
