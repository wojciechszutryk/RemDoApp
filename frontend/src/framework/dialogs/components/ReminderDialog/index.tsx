import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import dayjs from "dayjs";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IReminder } from "linked-models/reminder/reminder.dto";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { useCreateReminderMutation } from "pages/RemindersPage/mutations/createReminder/createReminder.mutation";
import { useEditReminderMutation } from "pages/RemindersPage/mutations/editReminder/editReminder.mutation";
import { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DateTimePickerWithIcon from "../TaskDilog/components/DatePickerWithIcon";
import EmailAutocomplete from "../TodoListDialog/components/EmailAutocomplete";
import { StyledAutocompleteLabel, StyledForm } from "../TodoListDialog/styles";
import TodoListSelect from "./components/TodoListSelect";
import { IReminderDialogState } from "./helpers/IReminderDialogState";

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
  };

  const methods = useForm<IReminderDialogState>({
    defaultValues: defaultFormValues,
  });

  const createReminderMutation = useCreateReminderMutation();
  const editReminderMutation = useEditReminderMutation();
  const { t } = useTranslation();

  const onSubmit = (data: IReminderDialogState) => {
    const ownersIDs = data.assignedOwners.map((owner) => owner.id);
    const usersIDs = data.assignedUsers.map((user) => user.id);

    if (editReminderData) {
      editReminderMutation.mutate({
        todoListId: editReminderData.todoListId,
        taskId: editReminderData.taskId,
        data: {
          ...data,
          assignedOwners: ownersIDs,
          assignedUsers: usersIDs,
        },
      });
    } else {
      if (!data.startDate || !data.finishDate || !data.text || !data.icon)
        return;
      const createReminderData: IReminder = {
        ...data,
        assignedOwners: ownersIDs,
        assignedUsers: usersIDs,
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

  const [expanded, setExpanded] = useState("edit");

  const handleChange = (panel: string) => () => {
    setExpanded(panel);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Accordion expanded={expanded === "edit"} onChange={handleChange("edit")}>
        <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            I am an accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...methods}>
            <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
              <Typography variant="h4">
                {editReminderData
                  ? `${t(TranslationKeys.EditTask)}: ${editReminderData.text}`
                  : t(TranslationKeys.AddTask)}
              </Typography>

              <ControlledTextField
                name={"text"}
                required
                control={methods.control}
                placeholder={t(TranslationKeys.TaskName)}
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
              <TodoListSelect />
              <Button type="submit">
                {editReminderData
                  ? t(TranslationKeys.Save)
                  : t(TranslationKeys.AddTask)}
              </Button>
            </StyledForm>
          </FormProvider>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "share"}
        onChange={handleChange("share")}
      >
        <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        >
          {t(TranslationKeys.ShareTodoList)}
        </AccordionSummary>
        <AccordionDetails>
          <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <Typography variant="h4">
                {t(TranslationKeys.ShareTodoList)}: {todoListName}
              </Typography>
              <StyledAutocompleteLabel>
                {t(TranslationKeys.CurrentOwners)}
              </StyledAutocompleteLabel>
              <EmailAutocomplete
                name="assignedOwners"
                defaultValues={defaultFormValues.assignedOwners}
              />
              <StyledAutocompleteLabel>
                {t(TranslationKeys.CurrentUsers)}
              </StyledAutocompleteLabel>
              <EmailAutocomplete
                name="assignedUsers"
                defaultValues={defaultFormValues.assignedUsers}
              />
              <Button type="submit">{t(TranslationKeys.Save)}</Button>
            </FormProvider>
          </StyledForm>
        </AccordionDetails>
      </Accordion>
    </Dialog>
  );
};

export default memo(ReminderDialog);
