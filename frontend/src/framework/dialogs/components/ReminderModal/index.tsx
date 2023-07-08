import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import { Button, Typography } from "@mui/material";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import dayjs from "dayjs";
import { useDialogs } from "framework/dialogs";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IReminderDTO } from "linked-models/reminder/reminder.dto";
import { ITask } from "linked-models/task/task.model";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { useCreateReminderMutation } from "pages/RemindersPage/mutations/createReminder/createReminder.mutation";
import { useEditTaskInTodoListMutation } from "pages/SingleTodoListPage/mutations/editTask/editTask.mutation";
import { useEditTodoListMutation } from "pages/SingleTodoListPage/mutations/editTodoList/editTodoList.mutation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DatePickerWithIcon from "../TaskModal/components/DatePickerWithIcon";
import IconPicker from "../TodoListModal/components/IconPicker";
import { StyledForm, StyledInlineInputs } from "../TodoListModal/styles";

const ReminderModal = (): JSX.Element => {
  const {
    dialogsState: {
      reminderDialog: { visible, editReminderData },
    },
    dialogsActions: { updateReminderDialog },
  } = useDialogs();

  const defaultFormValues = {
    text: editReminderData?.text || "",
    icon: editReminderData?.icon || TodoListIconEnum.Reminder,
    whenShouldBeStarted: editReminderData?.whenShouldBeStarted || null,
    whenShouldBeFinished: editReminderData?.whenShouldBeFinished || null,
  };

  const { control, getValues, handleSubmit } = useForm<IReminderDTO>({
    defaultValues: defaultFormValues,
  });

  const createReminderMutation = useCreateReminderMutation();
  const editTodoListMutation = useEditTodoListMutation();
  const editTaskMutation = useEditTaskInTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (data: IReminderDTO) => {
    if (editReminderData) {
      editTaskMutation.mutate({
        todoListId: editReminderData.todoListId,
        taskId: editReminderData.id,
        data,
      });

      if (editReminderData.icon !== data.icon) {
        editTodoListMutation.mutate({
          todoListId: editReminderData.todoListId,
          data: {
            icon: data.icon,
          },
        });
      }
    } else createReminderMutation.mutate(data);

    updateReminderDialog(initialTaskDialog);
  };

  return (
    <Dialog
      open={visible}
      onClose={() => updateReminderDialog(initialTaskDialog)}
    >
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">
          {editReminderData
            ? `${t(TranslationKeys.EditTask)}: ${editReminderData.text}`
            : t(TranslationKeys.AddTask)}
        </Typography>

        <StyledInlineInputs>
          <IconPicker />
          <ControlledTextField
            name={"text"}
            control={control}
            placeholder={t(TranslationKeys.TaskName)}
          />
        </StyledInlineInputs>
        {[
          {
            Icon: <HourglassEmptyIcon />,
            tooltipTitle: t(TranslationKeys.PlannedStartDate),
            name: "whenShouldBeStarted" as keyof ITask,
            control,
            maxDate: dayjs(getValues("whenShouldBeFinished")),
          },
          {
            Icon: <HourglassFullIcon />,
            tooltipTitle: t(TranslationKeys.PlannedFinishDate),
            name: "whenShouldBeFinished" as keyof ITask,
            control,
            minDate: dayjs(getValues("whenShouldBeStarted")),
          },
        ].map((props, index) => (
          <DatePickerWithIcon<IReminderDTO> key={index} {...props} />
        ))}
        <ControlledCheckbox
          name={"important"}
          control={control}
          label={t(TranslationKeys.TaskImportant)}
        />
        <Button type="submit">
          {editReminderData
            ? t(TranslationKeys.Save)
            : t(TranslationKeys.AddTask)}
        </Button>
      </StyledForm>
    </Dialog>
  );
};

export default memo(ReminderModal);
