import { Typography } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import GoogleButton from "pages/LoginPage/LoginPanel/GoogleButton";
import { useTranslation } from "react-i18next";
import { StyledWrapper } from "../AvatarChangeForm/styles";

const GoogleIntegrationForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  return (
    <StyledWrapper>
      {currentUser?.integratedWithGoogle ? (
        <Typography>{t(TranslationKeys.UserIntegratedWithGoogle)}</Typography>
      ) : (
        <>
          <Typography>{t(TranslationKeys.IntegrateWithGoogleDesc)}</Typography>
          <GoogleButton />
        </>
      )}
    </StyledWrapper>
  );
};

export default GoogleIntegrationForm;
