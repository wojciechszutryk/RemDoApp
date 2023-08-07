import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Typography } from "@mui/material";
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

  const defaultFormValues: IReminder = {
    text: editReminderData?.data?.text || "",
    name: editReminderData?.data?.name || "",
    icon: editReminderData?.data?.icon || TodoListIconEnum.Reminder,
    startDate: editReminderData?.data?.startDate || dayjs().toDate(),
    finishDate:
      editReminderData?.data?.finishDate || dayjs().add(1, "hour").toDate(),
  };

  const methods = useForm<IReminder>({
    defaultValues: defaultFormValues,
  });

  const createReminderMutation = useCreateReminderMutation();
  const editReminderMutation = useEditReminderMutation();
  const { t } = useTranslation();

  const onSubmit = (data: IReminder) => {
    if (editReminderData) {
      editReminderMutation.mutate({
        todoListId: editReminderData.todoListId,
        taskId: editReminderData.taskId,
        data,
      });
    } else {
      if (!data.startDate || !data.finishDate || !data.text || !data.icon)
        return;
      const createReminderData: IReminder = {
        ...data,
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
        <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
          <Typography variant="h4">
            {editReminderData
              ? `${t(TranslationKeys.EditTask)}: ${editReminderData.data.text}`
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
    </Dialog>
  );
};

export default memo(ReminderDialog);
