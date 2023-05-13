import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
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
    whenShouldBeStarted: editTaskData?.whenShouldBeStarted,
    whenShouldBeFinished: editTaskData?.whenShouldBeFinished,
    startDate: editTaskData?.startDate,
    finishDate: editTaskData?.finishDate,
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
              ? `${t(TranslationKeys.EditTodoListDialogHeader)}: ${
                  editTaskData.text
                }`
              : t(TranslationKeys.CreateTodoListDialogHeader)}
          </Typography>
          <ControlledTextField
            name={"text"}
            control={methods.control}
            placeholder={t(TranslationKeys.TodoListDialogInputTitle)}
          />
          <Button type="submit">
            {editTaskData
              ? t(TranslationKeys.Save)
              : t(TranslationKeys.CreateTodoListDialogHeader)}
          </Button>
        </FormProvider>
      </StyledForm>
    </Dialog>
  );
};

export default memo(TaskModal);
