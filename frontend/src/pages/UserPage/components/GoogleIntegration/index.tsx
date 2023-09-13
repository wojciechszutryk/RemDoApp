import GoogleIcon from "@mui/icons-material/Google";
import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { URL_GOOGLE, URL_USERS } from "linked-models/user/user.urls";
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
          <Button
            onClick={() =>
              window.open(FRONTIFY_URL(URL_USERS, URL_GOOGLE), "_self")
            }
          >
            <GoogleIcon />
            {t(TranslationKeys.GoogleSignIn)}
          </Button>
        </>
      )}
    </StyledWrapper>
  );
};

export default GoogleIntegrationForm;
