import { Typography } from "@mui/material";
import Accordion from "atomicComponents/atoms/Accordion";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import AvatarChangeForm from "./components/AvatarChangeForm";
import DisplayNameChangeForm from "./components/DisplayNameChangeForm";
import PasswordChangeForm from "./components/PasswordChangeForm";
import { StyledWrapper } from "./styles";

const UserPage = (): JSX.Element => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const title =
      t(TranslationKeys.PageTitleMain) +
      t(TranslationKeys.PageTitleUserSettings);
    document.title = title;
  });

  return (
    <StyledWrapper>
      <Typography>{t(TranslationKeys.PageTitleUserSettings)}</Typography>
      <Accordion summaryText={t(TranslationKeys.ChangeAvatar)}>
        <AvatarChangeForm />
      </Accordion>
      <Accordion summaryText={t(TranslationKeys.ChangeDisplayName)}>
        <DisplayNameChangeForm />
      </Accordion>
      <Accordion summaryText={t(TranslationKeys.ChangePassword)}>
        <PasswordChangeForm />
      </Accordion>
    </StyledWrapper>
  );
};

export default memo(UserPage);
