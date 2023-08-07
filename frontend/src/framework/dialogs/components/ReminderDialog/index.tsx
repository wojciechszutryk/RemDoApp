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
import {
  ICreateReminder,
  IEditReminder,
} from "linked-models/reminder/reminder.dto";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { useCreateReminderMutation } from "pages/RemindersPage/mutations/createReminder/createReminder.mutation";
import { useEditReminderMutation } from "pages/RemindersPage/mutations/editReminder/editReminder.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DateTimePickerWithIcon from "../TaskDilog/components/DatePickerWithIcon";
import { StyledForm } from "../TodoListDialog/styles";
import TodoListSelect from "./components/TodoListSelect";

interface FormValues extends Partial<ICreateReminder> {
  todoListId?: string;
  taskId?: string;
}

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

  const defaultFormValues: FormValues = {
    text: editReminderData?.text || "",
    icon: editReminderData?.icon || TodoListIconEnum.Reminder,
    whenShouldBeStarted:
      editReminderData?.whenShouldBeStarted || dayjs().toDate(),
    whenShouldBeFinished:
      editReminderData?.whenShouldBeFinished || dayjs().add(1, "hour").toDate(),
    todoListId: editReminderData?.todoListId,
  };

  const methods = useForm<FormValues>({
    defaultValues: defaultFormValues,
  });

  const createReminderMutation = useCreateReminderMutation();
  const editReminderMutation = useEditReminderMutation();
  const { t } = useTranslation();

  const onSubmit = (data: FormValues) => {
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
            required
            control={methods.control}
            placeholder={t(TranslationKeys.TaskName)}
          />
          {[
            {
              Icon: <HourglassEmptyIcon />,
              tooltipTitle: t(TranslationKeys.PlannedStartDate),
              name: "whenShouldBeStarted" as keyof IEditReminder,
              required: true,
              control: methods.control,
              maxDate: dayjs(methods.getValues("whenShouldBeFinished")),
            },
            {
              Icon: <HourglassFullIcon />,
              tooltipTitle: t(TranslationKeys.PlannedFinishDate),
              name: "whenShouldBeFinished" as keyof IEditReminder,
              required: true,
              control: methods.control,
              minDate: dayjs(methods.getValues("whenShouldBeStarted")),
            },
          ].map((props, index) => (
            <DateTimePickerWithIcon<FormValues> key={index} {...props} />
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
