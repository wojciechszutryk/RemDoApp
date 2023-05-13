import { Typography } from "@mui/material";
import Accordion from "atomicComponents/atoms/Accordion";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useDialogs } from "framework/dialogs";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ITask } from "linked-models/task/task.model";
import { useCreateTaskMutation } from "pages/TodoListPage/mutations/createTask.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "../TodoListModal/styles";

const TaskModal = (): JSX.Element => {
  const {
    dialogsState: {
      taskDialog: { visible, editTaskData },
    },
    dialogsActions: { updateTaskDialog },
  } = useDialogs();

  const { currentUser } = useCurrentUser();

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

  const createTaskMutation = useCreateTaskMutation();
  const editTaskMutation = useEditTaskMutation();
  const { t } = useTranslation();

  const onSubmit = (data: ITask) => {
    if (editTaskData)
      editTaskMutation.mutate({ todoListId: editTaskData.id, data });
    else createTaskMutation.mutate(data);

    updateTaskDialog({ visible: false });
  };

  return (
    <Dialog open={visible} onClose={() => updateTaskDialog({ visible: false })}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Typography variant="h4">
            {t(TranslationKeys.TodoListDialogHeader)}
          </Typography>
          <ControlledTextField
            name={"text"}
            control={methods.control}
            placeholder={t(TranslationKeys.TodoListDialogInputTitle)}
          />
          <Button type="submit">
            {t(TranslationKeys.TodoListDialogHeader)}
          </Button>
        </FormProvider>
      </StyledForm>
    </Dialog>
  );
};

export default memo(TaskModal);
