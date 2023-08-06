import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import dayjs from "dayjs";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ICreateReminder } from "linked-models/reminder/reminder.dto";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { ITask } from "linked-models/task/task.model";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { useCreateReminderMutation } from "pages/RemindersPage/mutations/createReminder/createReminder.mutation";
import { useEditTaskInTodoListMutation } from "pages/SingleTodoListPage/mutations/editTask/editTask.mutation";
import { useEditTodoListMutation } from "pages/SingleTodoListPage/mutations/editTodoList/editTodoList.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DateTimePickerWithIcon from "../TaskDilog/components/DatePickerWithIcon";
import { StyledForm } from "../TodoListDialog/styles";
import TodoListSelect from "./components/TodoListSelect";

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

  const defaultFormValues: ICreateReminder = {
    text: editReminderData?.text || "",
    icon: editReminderData?.icon || TodoListIconEnum.Reminder,
    whenShouldBeStarted: editReminderData.whenShouldBeStarted,
    whenShouldBeFinished: editReminderData.whenShouldBeFinished,
    todoListId: editReminderData.todoListId,
  };

  const methods = useForm<ICreateReminder>({
    defaultValues: defaultFormValues,
  });

  const createReminderMutation = useCreateReminderMutation();
  const editTodoListMutation = useEditTodoListMutation();
  const editTaskMutation = useEditTaskInTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (data: ICreateReminder) => {
    console.log(data);

    // if (editReminderData) {
    //   editTaskMutation.mutate({
    //     todoListId: editReminderData.todoListId,
    //     taskId: editReminderData.id,
    //     data,
    //   });

    //   if (editReminderData.icon !== data.icon) {
    //     editTodoListMutation.mutate({
    //       todoListId: editReminderData.todoListId,
    //       data: {
    //         icon: data.icon,
    //       },
    //     });
    //   }
    // } else createReminderMutation.mutate(data);

    // updateReminderDialog(initialTaskDialog);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider {...methods}>
        <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
          <Typography variant="h4">
            {editReminderData
              ? `${t(TranslationKeys.EditTask)}: ${editReminderData.text}`
              : t(TranslationKeys.AddTask)}
          </Typography>

          <ControlledTextField
            name={"text"}
            control={methods.control}
            placeholder={t(TranslationKeys.TaskName)}
          />
          {[
            {
              Icon: <HourglassEmptyIcon />,
              tooltipTitle: t(TranslationKeys.PlannedStartDate),
              name: "whenShouldBeStarted" as keyof ITask,
              control: methods.control,
              maxDate: dayjs(methods.getValues("whenShouldBeFinished")),
            },
            {
              Icon: <HourglassFullIcon />,
              tooltipTitle: t(TranslationKeys.PlannedFinishDate),
              name: "whenShouldBeFinished" as keyof ITask,
              control: methods.control,
              minDate: dayjs(methods.getValues("whenShouldBeStarted")),
            },
          ].map((props, index) => (
            <DateTimePickerWithIcon<IReminderAttached> key={index} {...props} />
          ))}
          <TodoListSelect />
          <Button type="submit">
            {editReminderData
              ? t(TranslationKeys.Save)
              : t(TranslationKeys.AddTask)}
          </Button>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default memo(ReminderDialog);
