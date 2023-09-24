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
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import dayjs from "dayjs";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IReminder } from "linked-models/reminder/reminder.dto";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { useCreateReminderMutation } from "pages/RemindersPage/mutations/createReminder/createReminder.mutation";
import { useEditReminderMutation } from "pages/RemindersPage/mutations/editReminder/editReminder.mutation";
import { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DateTimePickerWithIcon from "../TaskDilog/components/DatePickerWithIcon";
import { StyledAutocompleteLabel, StyledForm } from "../TodoListDialog/styles";
import CollaborantAutocomplete from "./components/CollaborantAutocomplete";
import TodoListSelect from "./components/TodoListSelect";
import { IReminderDialogState } from "./helpers/IReminderDialogState";
import { StyledHelpOutlineIcon } from "./styles";

const ReminderDialog = (): JSX.Element => {
  const {
    dialogsState: {
      reminderDialog: { editReminderData, visible },
    },
    dialogsActions: { updateReminderDialog },
  } = useDialogs();

  const [open, onClose] = useAppDialogState(visible, () =>
    updateReminderDialog(initialTaskDialog)
  );

  const defaultFormValues = {
    text: editReminderData?.text || "",
    name: editReminderData?.name || "",
    icon: editReminderData?.icon || TodoListIconEnum.Reminder,
    startDate: editReminderData?.startDate || dayjs().toDate(),
    finishDate: editReminderData?.finishDate || dayjs().add(1, "hour").toDate(),
    assignedOwners: editReminderData?.assignedOwners || [],
    assignedUsers: editReminderData?.assignedUsers || [],
    todoListId: editReminderData?.todoListId || "reminder",
  };

  const methods = useForm<IReminderAttached>({
    defaultValues: defaultFormValues,
  });

  const createReminderMutation = useCreateReminderMutation();
  const editReminderMutation = useEditReminderMutation();
  const { t } = useTranslation();

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

  const [expanded, setExpanded] = useState("general");

  const handleChange = (panel: string) => () => {
    setExpanded(panel);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <StyledAccordion
        expanded={expanded === "general"}
        onChange={handleChange("general")}
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
          <FormProvider {...methods}>
            <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
              <Typography variant="h4">
                {editReminderData
                  ? `${t(TranslationKeys.EditReminder)}: ${
                      editReminderData.text
                    }`
                  : t(TranslationKeys.CreateReminder)}
              </Typography>

              <ControlledTextField
                name={"text"}
                required
                control={methods.control}
                placeholder={t(TranslationKeys.ReminderName)}
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
              {!editReminderData && <TodoListSelect />}
              <Button type="submit">
                {editReminderData
                  ? t(TranslationKeys.Save)
                  : t(TranslationKeys.CreateReminder)}
              </Button>
            </StyledForm>
          </FormProvider>
        </AccordionDetails>
      </StyledAccordion>
      <StyledAccordion
        expanded={expanded === "access"}
        onChange={handleChange("access")}
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
          <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <Typography variant="h4">
                {t(TranslationKeys.ManageAccess)}
              </Typography>
              <StyledAutocompleteLabel>
                {t(TranslationKeys.CurrentOwners)}
              </StyledAutocompleteLabel>
              <CollaborantAutocomplete
                name="assignedOwners"
                defaultValues={defaultFormValues?.assignedOwners}
              />
              <StyledAutocompleteLabel>
                {t(TranslationKeys.CurrentUsers)}
              </StyledAutocompleteLabel>
              <CollaborantAutocomplete
                name="assignedUsers"
                defaultValues={defaultFormValues?.assignedUsers}
              />
              <Button type="submit">{t(TranslationKeys.Save)}</Button>
            </FormProvider>
          </StyledForm>
        </AccordionDetails>
      </StyledAccordion>
    </Dialog>
  );
};

export default memo(ReminderDialog);
