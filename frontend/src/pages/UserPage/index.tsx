import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import {
  StyledAccordion,
  StyledExpandMoreIcon,
} from "atomicComponents/atoms/Accordion";
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
      <StyledAccordion>
        <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
          <Typography>{t(TranslationKeys.ChangeAvatar)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AvatarChangeForm />
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
          <Typography> {t(TranslationKeys.ChangeDisplayName)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DisplayNameChangeForm />
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
          <Typography>{t(TranslationKeys.ChangePassword)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PasswordChangeForm />
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};

export default memo(UserPage);
