import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import Dialog from "atomicComponents/atoms/Dialog";
import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import { ControlledTextField } from "atomicComponents/molecules/ControlledInputText";
import { useDialogs } from "framework/dialogs";
import { initialTaskDialog } from "framework/dialogs/models/initialState.const";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ITask } from "linked-models/task/task.model";
import { useCreateTaskInTodoListMutation } from "pages/TodoListsPage/mutations/createTaskInTodoList.mutation";
import { useEditTaskInTodoListMutation } from "pages/TodoListsPage/mutations/editTaskInTodoList.mutation";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "../TodoListModal/styles";
import DatePickerWithIcon from "./components/DatePickerWithIcon";

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
          {[
            {
              Icon: <HourglassEmptyIcon />,
              tooltipTitle: t(TranslationKeys.PlannedStartDate),
              name: "whenShouldBeStarted" as keyof ITask,
            },
            {
              Icon: <HourglassFullIcon />,
              tooltipTitle: t(TranslationKeys.PlannedFinishDate),
              name: "whenShouldBeFinished" as keyof ITask,
            },
            {
              Icon: <PlayCircleOutlineIcon />,
              tooltipTitle: t(TranslationKeys.StartDate),
              name: "startDate" as keyof ITask,
            },
            {
              Icon: <FlagCircleIcon />,
              tooltipTitle: t(TranslationKeys.FinishDate),
              name: "finishDate" as keyof ITask,
            },
          ].map((props, index) => (
            <DatePickerWithIcon key={index} {...props} />
          ))}
          <ControlledCheckbox
            name={"important"}
            control={methods.control}
            label={t(TranslationKeys.TaskImportant)}
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
