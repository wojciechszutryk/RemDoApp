import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "atomicComponents/atoms/Button";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { URL_GOOGLE, URL_USERS } from "linked-models/user/user.urls";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const GoogleButton = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Button
      onClick={() => window.open(FRONTIFY_URL(URL_USERS, URL_GOOGLE), "_self")}
    >
      <GoogleIcon />
      {t(TranslationKeys.GoogleSignIn)}
    </Button>
  );
};

export default memo(GoogleButton);
