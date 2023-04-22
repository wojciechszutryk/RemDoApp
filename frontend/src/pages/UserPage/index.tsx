import { Avatar, Typography } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

const UserPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();

  useLayoutEffect(() => {
    const title =
      t(TranslationKeys.PageTitleMain) +
      t(TranslationKeys.PageTitleUserSettings);
    document.title = title;
  });

  return (
    <>
      <Typography>{t(TranslationKeys.PageTitleUserSettings)}</Typography>
      <Avatar>{currentUser?.displayName.substring(1)}</Avatar>
    </>
  );
};

export default memo(UserPage);
