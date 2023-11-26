import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import dayjs from "dayjs";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useCreateTaskMutation } from "pages/SingleTodoListPage/mutations/createTask/createTask.mutation";
import { useEditTaskInTodoListMutation } from "pages/SingleTodoListPage/mutations/editTask/editTask.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "../TodoListDialog/styles";
import CollapsableNotifyForm from "./components/CollapsableNotifyForm";
import DateTimePickerWithIcon from "./components/DatePickerWithIcon";
import { createNotifySelectParams } from "./components/NotifyForm/helpers";
import { ITaskDialog } from "./models/taskDialog.model";
import { StyledCheckboxesWrapper } from "./styles";

const TaskDialog = (): JSX.Element => {
  const {
    dialogsState: {
      taskDialog: { editTaskData, todoListId, visible },
    },
    dialogsActions: { updateTaskDialog },
  } = useDialogs();

  const [open, onClose] = useAppDialogState(visible, () =>
    updateTaskDialog(initialTaskDialog)
  );

  const defaultSelectsValues =
    editTaskData?.notifyDate &&
    createNotifySelectParams(
      new Date(editTaskData?.notifyDate),
      editTaskData?.startDate && new Date(editTaskData?.startDate),
      editTaskData?.finishDate && new Date(editTaskData?.finishDate)
    );

  const defaultFormValues = {
    text: editTaskData?.text || "",
    startDate: editTaskData?.startDate || new Date(Date.now() + 86400000),
    finishDate: editTaskData?.finishDate || null,
    minsAccordingToTimePoint:
      defaultSelectsValues?.minsAccordingToTimePoint || 15,
    beforeOrAfter: defaultSelectsValues?.beforeOrAfter || "Before",
    timePoint: defaultSelectsValues?.timePoint || "Start",
    notifyDate: editTaskData?.notifyDate || new Date(Date.now() + 85500000),
    important: editTaskData?.important,
    notify: !!editTaskData?.notifyDate,
  };

  const methods = useForm<ITaskDialog>({
    defaultValues: defaultFormValues,
  });

  const createTaskMutation = useCreateTaskMutation();
  const editTaskMutation = useEditTaskInTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (data: ITaskDialog) => {
    if (!data.notify) data.notifyDate = null;

    if (editTaskData)
      editTaskMutation.mutate({ todoListId, taskId: editTaskData.id, data });
    else createTaskMutation.mutate({ todoListId, data });
    onClose();
  };

  const { handleSubmit, control, getValues } = methods;

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">
            {editTaskData
              ? `${t(TranslationKeys.EditTask)}: ${editTaskData.text}`
              : t(TranslationKeys.AddTask)}
          </Typography>
          <ControlledTextField
            name={"text"}
            control={control}
            placeholder={t(TranslationKeys.TaskName)}
          />
          {[
            {
              Icon: <PlayCircleOutlineIcon />,
              tooltipTitle: t(TranslationKeys.StartDate),
              name: "startDate" as keyof ITaskDialog,
              control,
              maxDate: dayjs(getValues("startDate")),
            },
            {
              Icon: <FlagCircleIcon />,
              tooltipTitle: t(TranslationKeys.FinishDate),
              name: "finishDate" as keyof ITaskDialog,
              control,
              minDate: dayjs(getValues("finishDate")),
            },
          ].map((props, index) => (
            <DateTimePickerWithIcon key={index} {...props} />
          ))}

          <StyledCheckboxesWrapper>
            <ControlledCheckbox
              name={"notify"}
              control={control}
              label={t(TranslationKeys.NotifyMe)}
            />
            <ControlledCheckbox
              name={"important"}
              control={control}
              label={t(TranslationKeys.TaskImportant)}
            />
          </StyledCheckboxesWrapper>
          <CollapsableNotifyForm control={methods.control} />
          <Button type="submit">
            {editTaskData
              ? t(TranslationKeys.Save)
              : t(TranslationKeys.AddTask)}
          </Button>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default memo(TaskDialog);
