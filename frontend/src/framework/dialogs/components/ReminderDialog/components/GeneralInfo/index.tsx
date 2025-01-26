import EventIcon from "@mui/icons-material/Event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { Separator } from "atomicComponents/atoms/Separator";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import DatesPickers from "framework/dialogs/components/TaskDialog/components/DateForm/DatesPickers";
import CollapsableReccuranceForm from "framework/dialogs/components/TaskDialog/components/DateForm/RecurranceForm/CollapsableReccuranceForm";
import { StyledForm } from "framework/dialogs/components/TodoListDialog/styles";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IReminderDialogState } from "../../models/reminderDialogState.model";

interface Props {
  expandedAccordion: string;
  handleAccordionChange: (panel: string) => () => void;
  editReminderData?: IReminderDialogState;
  onSubmit: (data: IReminderDialogState) => void;
}

const GeneralInfo = ({
  expandedAccordion,
  handleAccordionChange,
  editReminderData,
  onSubmit,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useFormContext<IReminderDialogState>();

  const markAccordionError =
    (!!errors.name || !!errors.text) && expandedAccordion !== "general";

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  return (
    <StyledAccordion
      expanded={expandedAccordion === "general"}
      onChange={handleAccordionChange("general")}
      disableGutters
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Tooltip title={t(TranslationKeys.GeneralInfoReminderDescription)}>
          <div>
            <EventIcon
              sx={{ transform: "translate(-4px, -2px)" }}
              color={markAccordionError ? "error" : undefined}
            />
          </div>
        </Tooltip>
        <Typography>{t(TranslationKeys.GeneralInfo)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Separator
            text={
              editReminderData
                ? t(TranslationKeys.EditReminder)
                : t(TranslationKeys.CreateReminder)
            }
            spacingBottom={15}
            spacingTop={-5}
          />
          <ControlledTextField
            autoFocus
            name={"name"}
            multiline
            maxRows={3}
            required
            error={!!errors.name}
            helperText={
              errors.name?.type === "required" &&
              t(TranslationKeys.FieldRequired)
            }
            control={control}
            placeholder={t(TranslationKeys.ReminderName)}
          />
          <ControlledTextField
            name={"text"}
            multiline
            control={control}
            placeholder={t(TranslationKeys.ReminderDescription)}
          />
          <DatesPickers />
          <CollapsableReccuranceForm />
        </StyledForm>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default memo(GeneralInfo);
