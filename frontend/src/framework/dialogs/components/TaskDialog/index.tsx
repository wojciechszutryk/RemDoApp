import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { useCreateTaskMutation } from "pages/SingleTodoListPage/mutations/createTask/createTask.mutation";
import { useEditTaskInTodoListMutation } from "pages/SingleTodoListPage/mutations/editTask/editTask.mutation";
import { memo, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "../TodoListDialog/styles";
import TaskTabMenu from "./components/TaskTabMenu";
import { getDefaultFormValues } from "./helpers/getDefaultFormValues";
import { getReccuranceStr } from "./helpers/getReccuranceStr";
import { ITaskDialog } from "./models/taskDialog.model";

const TaskDialog = (): JSX.Element => {
  const {
    dialogsState: {
      taskDialog: { editTaskData, todoListId, visible },
    },
    dialogsActions: { updateTaskDialog },
  } = useDialogs();

  const taskRef = useRef<HTMLInputElement | null>(null);

  const [open, onClose] = useAppDialogState(visible, () =>
    updateTaskDialog(initialTaskDialog)
  );

  const methods = useForm<ITaskDialog>({
    defaultValues: getDefaultFormValues(editTaskData),
    mode: "onSubmit",
  });

  const createTaskMutation = useCreateTaskMutation();
  const editTaskMutation = useEditTaskInTodoListMutation();
  const { t } = useTranslation();

  const onSubmit = (formValues: ITaskDialog) => {
    const data = {
      ...formValues,
      recurrance: getReccuranceStr(formValues),
      notifyDate: formValues.notify ? formValues.notifyDate : null,
    };

    if (editTaskData)
      editTaskMutation.mutate({
        todoListId,
        taskId: editTaskData.id,
        data,
      });
    else
      createTaskMutation.mutate({
        todoListId,
        data,
      });
    onClose();
  };

  const { handleSubmit, control } = methods;

  useEffect(() => {
    taskRef.current?.focus();
  }, [taskRef.current]);

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
            autoFocus
            inputRef={taskRef}
            name={"text"}
            rules={{
              required: {
                value: true,
                message: t(TranslationKeys.FieldRequired),
              },
            }}
            error={!!methods.formState.errors?.text}
            helperText={methods.formState.errors.text?.message}
            control={control}
            placeholder={t(TranslationKeys.TaskName)}
          />

          <TaskTabMenu control={methods.control} />

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
