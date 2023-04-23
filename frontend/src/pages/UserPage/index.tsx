import { Typography } from "@mui/material";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import AvatarChangeForm from "./components/AvatarChangeForm";
import DisplayNameChangeForm from "./components/DisplayNameChangeForm";
import PasswordChangeForm from "./components/PasswordChangeForm";

const UserPage = (): JSX.Element => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const title =
      t(TranslationKeys.PageTitleMain) +
      t(TranslationKeys.PageTitleUserSettings);
    document.title = title;
  });

  return (
    <>
      <Typography>{t(TranslationKeys.PageTitleUserSettings)}</Typography>
      <AvatarChangeForm />
      <DisplayNameChangeForm />
      <PasswordChangeForm />
    </>
  );
};

export default memo(UserPage);
