import { Avatar, Typography } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const AvatarChangeForm = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  return (
    <>
      <Typography>{t(TranslationKeys.ChangeAvatar)}</Typography>
      <Avatar>{currentUser?.displayName.substring(1)}</Avatar>
    </>
  );
};

export default memo(AvatarChangeForm);
