import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import { ControlledDatePicker } from "atomicComponents/molecules/ControlledDatePicker";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useDialogs } from "framework/dialogs";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ITask } from "linked-models/task/task.model";
import { useCreateTaskInTodoListMutation } from "pages/TodoListPage/mutations/createTaskInTodoList.mutation";
import { useEditTaskInTodoListMutation } from "pages/TodoListPage/mutations/editTaskInTodoList.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "../TodoListModal/styles";

const TaskModal = (): JSX.Element => {
  const {
    dialogsState: {
      taskDialog: { visible, editTaskData, todoListId },
    },
    dialogsActions: { updateTaskDialog },
  } = useDialogs();

  const defaultFormValues = {
    text: editTaskData?.text || "",
    whenShouldBeStarted: editTaskData?.whenShouldBeStarted || null,
    whenShouldBeFinished: editTaskData?.whenShouldBeFinished || null,
    startDate: editTaskData?.startDate || null,
    finishDate: editTaskData?.finishDate || null,
    important: editTaskData?.important,
  };

  const methods = useForm<ITask>({
    defaultValues: defaultFormValues,
  });

  const createTaskMutation = useCreateTaskInTodoListMutation();
  const editTaskMutation = useEditTaskInTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (data: ITask) => {
    if (editTaskData)
      editTaskMutation.mutate({ todoListId, taskId: editTaskData.id, data });
    else createTaskMutation.mutate({ todoListId, data });

    updateTaskDialog(initialTaskDialog);
  };

  return (
    <Dialog open={visible} onClose={() => updateTaskDialog(initialTaskDialog)}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Typography variant="h4">
            {editTaskData
              ? `${t(TranslationKeys.EditTask)}: ${editTaskData.text}`
              : t(TranslationKeys.AddTask)}
          </Typography>
          <ControlledTextField
            name={"text"}
            control={methods.control}
            placeholder={t(TranslationKeys.TaskName)}
          />
          <ControlledCheckbox
            name={"important"}
            control={methods.control}
            label={"add trans important"}
          />
          <ControlledDatePicker
            control={methods.control}
            name={"whenShouldBeStarted"}
            label={"dsad"}
          />
          <ControlledDatePicker
            control={methods.control}
            name={"whenShouldBeFinished"}
            label={"dsad"}
          />
          <ControlledDatePicker
            control={methods.control}
            name={"startDate"}
            label={"dsad"}
          />
          <ControlledDatePicker
            control={methods.control}
            name={"finishDate"}
            label={"dsad"}
          />
          <Button type="submit">
            {editTaskData
              ? t(TranslationKeys.Save)
              : t(TranslationKeys.AddTask)}
          </Button>
        </FormProvider>
      </StyledForm>
    </Dialog>
  );
};

export default memo(TaskModal);
