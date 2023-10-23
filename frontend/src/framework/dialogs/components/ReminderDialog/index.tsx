import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  AccordionDetails,
  AccordionSummary,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { Separator } from "atomicComponents/atoms/Separator";
import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import dayjs from "dayjs";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IReminder } from "linked-models/reminder/reminder.dto";
import { useCreateReminderMutation } from "pages/RemindersPage/mutations/createReminder/createReminder.mutation";
import { useEditReminderMutation } from "pages/RemindersPage/mutations/editReminder/editReminder.mutation";
import { memo, useState } from "react";
import { Control, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DateTimePickerWithIcon from "../TaskDialog/components/DatePickerWithIcon";
import NotifyForm from "../TaskDialog/components/NotifyForm";
import { ITaskDialog } from "../TaskDialog/models/taskDialog.model";
import { StyledForm } from "../TodoListDialog/styles";
import CollaborantAutocomplete from "./components/CollaborantAutocomplete";
import DatesInfo from "./components/DatesInfo";
import TodoListSelect from "./components/TodoListSelect";
import useCreateDefaultReminderDialogData from "./hooks/useCreateDefaultReminderDialogData";
import { IReminderDialog } from "./models/reminderDialog.model";
import { IReminderDialogState } from "./models/reminderDialogState.model";
import { StyledHelpOutlineIcon } from "./styles";

const ReminderDialog = (): JSX.Element => {
  const {
    dialogsState: {
      reminderDialog: { editReminderData, visible, defaultData },
    },
    dialogsActions: { updateReminderDialog },
  } = useDialogs();
  const createReminderMutation = useCreateReminderMutation();
  const editReminderMutation = useEditReminderMutation();
  const { t } = useTranslation();
  const [open, onClose] = useAppDialogState(visible, () =>
    updateReminderDialog(initialTaskDialog)
  );
  const [expandedAccordion, setExpandedAccordion] = useState("general");

  const handleAccordionChange = (panel: string) => () => {
    if (expandedAccordion === panel) setExpandedAccordion("");
    else {
      setExpandedAccordion(panel);
    }
  };

  const defaultFormValues = useCreateDefaultReminderDialogData(
    defaultData,
    editReminderData
  );

  const methods = useForm<IReminderDialog>({
    defaultValues: defaultFormValues,
  });

  const onSubmit = (data: IReminderDialogState) => {
    const ownerEmails = data.assignedOwners.map((owner) => owner.email);
    const userEmails = data.assignedUsers.map((user) => user.email);

    if (editReminderData) {
      editReminderMutation.mutate({
        todoListId: editReminderData.todoListId,
        taskId: editReminderData.taskId,
        data: {
          ...data,
          assignedOwners: ownerEmails,
          assignedUsers: userEmails,
        },
      });
    } else {
      if (!data.startDate || !data.finishDate || !data.text || !data.icon)
        return;
      const createReminderData: IReminder = {
        ...data,
        assignedOwners: ownerEmails,
        assignedUsers: userEmails,
        text: data.text,
        name: data.text,
        icon: data.icon,
        startDate: data.startDate,
        finishDate: data.finishDate,
      };
      createReminderMutation.mutate(createReminderData);
    }

    updateReminderDialog(initialTaskDialog);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider {...methods}>
        <StyledAccordion
          expanded={expandedAccordion === "general"}
          onChange={handleAccordionChange("general")}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Tooltip title={t(TranslationKeys.GeneralInfoReminderDescription)}>
              <div>
                <HelpOutlineIcon sx={{ marginRight: "3px" }} />
              </div>
            </Tooltip>
            <Typography>{t(TranslationKeys.GeneralInfo)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
              <Separator
                text={
                  editReminderData
                    ? `${t(TranslationKeys.EditReminder)}: ${
                        editReminderData.text
                      }`
                    : t(TranslationKeys.CreateReminder)
                }
                spacingBottom={15}
                spacingTop={-5}
              />
              <ControlledTextField
                name={"name"}
                required
                control={methods.control}
                placeholder={t(TranslationKeys.ReminderName)}
              />

              <ControlledTextField
                name={"text"}
                required
                control={methods.control}
                placeholder={t(TranslationKeys.ReminderDescription)}
              />
              {[
                {
                  Icon: <PlayCircleOutlineIcon />,
                  tooltipTitle: t(TranslationKeys.StartDate),
                  name: "startDate" as keyof IReminder,
                  required: true,
                  control: methods.control,
                  maxDate: dayjs(methods.getValues("startDate")),
                },
                {
                  Icon: <FlagCircleIcon />,
                  tooltipTitle: t(TranslationKeys.FinishDate),
                  name: "finishDate" as keyof IReminder,
                  required: true,
                  control: methods.control,
                  minDate: dayjs(methods.getValues("finishDate")),
                },
              ].map((props, index) => (
                <DateTimePickerWithIcon key={index} {...props} />
              ))}
            </StyledForm>
          </AccordionDetails>
        </StyledAccordion>
        {!editReminderData && (
          <StyledAccordion
            expanded={expandedAccordion === "scope"}
            onChange={handleAccordionChange("scope")}
            disableGutters
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Tooltip title={t(TranslationKeys.ScopeDescription)}>
                <div>
                  <StyledHelpOutlineIcon />
                </div>
              </Tooltip>
              {t(TranslationKeys.ScopeChoose)}
            </AccordionSummary>
            <AccordionDetails>
              <TodoListSelect />
            </AccordionDetails>
          </StyledAccordion>
        )}
        <StyledAccordion
          expanded={expandedAccordion === "access"}
          onChange={handleAccordionChange("access")}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Tooltip title={t(TranslationKeys.ManageAccessReminderDescription)}>
              <div>
                <StyledHelpOutlineIcon />
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
        <StyledAccordion
          expanded={expandedAccordion === "notify"}
          onChange={handleAccordionChange("notify")}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Tooltip title={t(TranslationKeys.SetNotificationDescription)}>
              <div>
                <StyledHelpOutlineIcon />
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
                control={methods.control}
                label={t(TranslationKeys.NotifyMe)}
              />
              <NotifyForm
                control={
                  methods.control as unknown as Control<ITaskDialog, any>
                }
              />
            </StyledForm>
          </AccordionDetails>
        </StyledAccordion>
        <Button
          onClick={methods.handleSubmit(onSubmit)}
          sx={{ margin: "0 auto" }}
        >
          {editReminderData
            ? t(TranslationKeys.Save)
            : t(TranslationKeys.CreateReminder)}
        </Button>
      </FormProvider>
    </Dialog>
  );
};

export default memo(ReminderDialog);
