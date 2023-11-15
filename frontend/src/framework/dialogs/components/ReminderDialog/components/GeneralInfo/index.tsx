import EventIcon from "@mui/icons-material/Event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { Separator } from "atomicComponents/atoms/Separator";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import dayjs from "dayjs";
import DateTimePickerWithIcon from "framework/dialogs/components/TaskDialog/components/DatePickerWithIcon";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IReminder } from "linked-models/reminder/reminder.dto";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IReminderDialogState } from "../../models/reminderDialogState.model";
import { StyledForm } from "framework/dialogs/components/TodoListDialog/styles";

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
  const { handleSubmit, control, getValues } =
    useFormContext<IReminderDialogState>();

  return (
    <StyledAccordion
      expanded={expandedAccordion === "general"}
      onChange={handleAccordionChange("general")}
      disableGutters
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Tooltip title={t(TranslationKeys.GeneralInfoReminderDescription)}>
          <div>
            <EventIcon sx={{ transform: "translate(-4px, -2px)" }} />
          </div>
        </Tooltip>
        <Typography>{t(TranslationKeys.GeneralInfo)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Separator
            text={
              editReminderData
                ? `${t(TranslationKeys.EditReminder)}: ${editReminderData.text}`
                : t(TranslationKeys.CreateReminder)
            }
            spacingBottom={15}
            spacingTop={-5}
          />
          <ControlledTextField
            name={"name"}
            required
            control={control}
            placeholder={t(TranslationKeys.ReminderName)}
          />

          <ControlledTextField
            name={"text"}
            required
            control={control}
            placeholder={t(TranslationKeys.ReminderDescription)}
          />
          {[
            {
              Icon: <PlayCircleOutlineIcon />,
              tooltipTitle: t(TranslationKeys.StartDate),
              name: "startDate" as keyof IReminder,
              required: true,
              control: control,
              maxDate: dayjs(getValues("startDate")),
            },
            {
              Icon: <FlagCircleIcon />,
              tooltipTitle: t(TranslationKeys.FinishDate),
              name: "finishDate" as keyof IReminder,
              required: true,
              control: control,
              minDate: dayjs(getValues("finishDate")),
            },
          ].map((props, index) => (
            <DateTimePickerWithIcon key={index} {...props} />
          ))}
        </StyledForm>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default memo(GeneralInfo);
