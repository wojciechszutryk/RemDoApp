import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { AccordionDetails, AccordionSummary, Tooltip } from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { Separator } from "atomicComponents/atoms/Separator";
import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import NotifyForm from "framework/dialogs/components/TaskDialog/components/NotifyForm";
import { StyledForm } from "framework/dialogs/components/TodoListDialog/styles";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IReminderDialog } from "../../models/reminderDialog.model";
import DatesInfo from "./DatesInfo";

interface Props {
  expandedAccordion: string;
  handleAccordionChange: (panel: string) => () => void;
}

const NotifySetup = ({
  expandedAccordion,
  handleAccordionChange,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const { control } = useFormContext<IReminderDialog>();
  return (
    <StyledAccordion
      expanded={expandedAccordion === "notify"}
      onChange={handleAccordionChange("notify")}
      disableGutters
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Tooltip title={t(TranslationKeys.SetNotificationDescription)}>
          <div>
            <NotificationsNoneIcon
              sx={{ transform: "translate(-3px, -4px)" }}
            />
          </div>
        </Tooltip>
        {t(TranslationKeys.SetNotification)}
      </AccordionSummary>
      <AccordionDetails>
        <StyledForm>
          <Separator
            text={t(TranslationKeys.SetNotification)}
            spacingBottom={5}
            spacingTop={-5}
          />
          <DatesInfo />
          <ControlledCheckbox
            name={"notify"}
            control={control}
            label={t(TranslationKeys.NotifyMe)}
          />
          <NotifyForm control={control as any} />
        </StyledForm>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default memo(NotifySetup);
