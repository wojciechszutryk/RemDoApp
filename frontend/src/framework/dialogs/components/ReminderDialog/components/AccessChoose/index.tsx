import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import {
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { Separator } from "atomicComponents/atoms/Separator";
import { StyledForm } from "framework/dialogs/components/TodoListDialog/styles";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { IReminderDialogState } from "../../models/reminderDialogState.model";
import CollaborantAutocomplete from "../CollaborantAutocomplete";

interface Props {
  expandedAccordion: string;
  handleAccordionChange: (panel: string) => () => void;
  defaultFormValues: Partial<IReminderDialogState> & {
    assignedUsers: IUserPublicDataDTO[];
    assignedOwners: IUserPublicDataDTO[];
  };
}

const AccessChoose = ({
  expandedAccordion,
  handleAccordionChange,
  defaultFormValues,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <StyledAccordion
      expanded={expandedAccordion === "access"}
      onChange={handleAccordionChange("access")}
      disableGutters
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Tooltip title={t(TranslationKeys.ManageAccessReminderDescription)}>
          <div>
            <ShareIcon sx={{ transform: "translate(-5px, -3px)" }} />
          </div>
        </Tooltip>
        {t(TranslationKeys.ManageAccess)}
      </AccordionSummary>
      <AccordionDetails>
        <StyledForm>
          <Separator
            text={t(TranslationKeys.ManageAccess)}
            spacingBottom={-5}
            spacingTop={-5}
          />
          <Typography>{t(TranslationKeys.CurrentOwners)}</Typography>
          <CollaborantAutocomplete
            name="assignedOwners"
            defaultValues={defaultFormValues?.assignedOwners}
          />
          <Typography>{t(TranslationKeys.CurrentUsers)}</Typography>
          <CollaborantAutocomplete
            name="assignedUsers"
            defaultValues={defaultFormValues?.assignedUsers}
          />
        </StyledForm>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default memo(AccessChoose);
