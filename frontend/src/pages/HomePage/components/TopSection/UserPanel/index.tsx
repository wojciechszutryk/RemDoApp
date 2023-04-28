import { Button } from "atomicComponents/atoms/Button";
import { TextField } from "atomicComponents/atoms/TextField";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { Separator } from "pages/HomePage/components/TopSection/UserPanel/Separator";
import { StyledWrapper } from "pages/LoginPage/LoginPanel/styles";
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
      <StyledLoginHeader variant={"h5"}>
        {t(TranslationKeys.LoginPanelHeader)}
      </StyledLoginHeader>
      {/* <Typography>{t(TranslationKeys.LoginPanelHeaderDescription)}</Typography>
      <ButtonsSocial /> */}
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
      <Separator />
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
    </StyledWrapper>
  );
};
