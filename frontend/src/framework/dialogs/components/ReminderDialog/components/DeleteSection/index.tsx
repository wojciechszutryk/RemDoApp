import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { Button } from "atomicComponents/atoms/Button";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { useDeleteReminderMutation } from "pages/RemindersPage/mutations/deleteReminder/deleteReminder.mutation";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { IReminderDialogState } from "../../models/reminderDialogState.model";

interface Props {
  expandedAccordion: string;
  handleAccordionChange: (panel: string) => () => void;
  editReminderData?: IReminderDialogState;
  defaultFormValues: Partial<IReminderDialogState> & {
    assignedUsers: IUserPublicDataDTO[];
    assignedOwners: IUserPublicDataDTO[];
  };
  onClose: () => void;
}

const DeleteSection = ({
  expandedAccordion,
  handleAccordionChange,
  editReminderData,
  defaultFormValues,
  onClose,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const deleteReminderMutation = useDeleteReminderMutation();

  const handleDeleteReminder = () => {
    const todoListId =
      defaultFormValues?.todoListId ?? editReminderData?.todoListId;
    const taskId = editReminderData?.taskId ?? defaultFormValues?.taskId;

    if (todoListId) {
      deleteReminderMutation.mutate({
        todoListId,
        taskId,
      });

      onClose();
    }
  };

  return (
    <StyledAccordion
      expanded={expandedAccordion === "delete"}
      onChange={handleAccordionChange("delete")}
      disableGutters
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Tooltip title={t(TranslationKeys.DeleteReminderDescription)}>
          <div>
            <DeleteForeverIcon sx={{ transform: "translate(-4px, -4px)" }} />
          </div>
        </Tooltip>
        {t(TranslationKeys.DeleteReminder)}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <Typography>{t(TranslationKeys.DeleteReminderWarning)}</Typography>
        <Button onClick={handleDeleteReminder}>
          {t(TranslationKeys.DeleteReminder)}
        </Button>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default memo(DeleteSection);
