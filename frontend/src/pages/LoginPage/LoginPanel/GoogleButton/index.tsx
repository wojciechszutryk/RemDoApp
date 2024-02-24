import GoogleIcon from "@mui/icons-material/Google";
import { CircularProgress } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { URL_GOOGLE, URL_USERS } from "linked-models/user/user.urls";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

const GoogleButton = (): JSX.Element => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (isLoading) return;
    setIsLoading(true);
    const child = window.open(FRONTIFY_URL(URL_USERS, URL_GOOGLE), "_self");

    if (!!child)
      child.onunload = function () {
        setIsLoading(false);
      };
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      <div style={{ display: "flex" }}>
        {!isLoading ? (
          <GoogleIcon />
        ) : (
          <CircularProgress size={20} color="secondary" />
        )}
      </div>
      {t(TranslationKeys.GoogleSignIn)}
    </Button>
  );
};

export default memo(GoogleButton);
