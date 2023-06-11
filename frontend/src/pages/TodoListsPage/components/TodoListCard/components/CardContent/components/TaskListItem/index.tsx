import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { Typography, useTheme } from "@mui/material";
import SwippableItem from "atomicComponents/molecules/SwippableItem";
import { useDialogs } from "framework/dialogs";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { useEditTaskInTodoListMutation } from "pages/TodoListsPage/mutations/editTaskInTodoList.mutation";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import TaskItemContent from "./TaskItemContent";
import { StyledCancelExitTaskText } from "./styles";

interface Props {
  task: IExtendedTaskDto;
}

const TaskListItem = ({ task }: Props): JSX.Element => {
  const isTaskFinished = !!task.finishDate;
  const editTaskInTodoListMutation = useEditTaskInTodoListMutation();
  const { setSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { dialogsActions } = useDialogs();

  const theme = useTheme();

  return (
    <SwippableItem
      defaultColor={
        isTaskFinished
          ? theme.palette.background.paper
          : theme.palette.info.main
      }
      rightShift={{
        color: isTaskFinished
          ? theme.palette.info.main
          : theme.palette.background.paper,
        Icon: isTaskFinished ? <UnpublishedIcon /> : <CheckCircleIcon />,
        action: () => {
          if (isTaskFinished) {
            dialogsActions.updateDeleteTaskDialog({
              visible: true,
              taskId: task.id,
              todoListId: task.todoListId,
            });
          } else {
            dialogsActions.updateTaskDialog({
              visible: true,
              todoListId: task.todoListId,
              editTaskData: task,
            });
          }
        },
      }}
      leftShift={{
        color: isTaskFinished
          ? theme.palette.warning.main
          : theme.palette.primary.main,
        Icon: isTaskFinished ? <DeleteIcon /> : <EditIcon />,
        action: () => {
          editTaskInTodoListMutation.mutate(
            {
              todoListId: task.todoListId,
              taskId: task.id,
              data: {
                finishDate: isTaskFinished ? null : new Date(),
              },
            },
            {
              onSuccess: () => {
                if (!isTaskFinished)
                  setSnackbar({
                    content: (
                      <Typography>
                        {`${t(
                          TranslationKeys.TaskMarkedAsFinishedWithDate
                        )}: ${new Date().toLocaleDateString()}. ${t(
                          TranslationKeys.TaskIsOnFinishedList
                        )}`}
                        <StyledCancelExitTaskText
                          onClick={() => {
                            editTaskInTodoListMutation.mutate({
                              todoListId: task.todoListId,
                              taskId: task.id,
                              data: {
                                finishDate: null,
                              },
                            });
                            setSnackbar(undefined);
                          }}
                        >
                          {t(TranslationKeys.Cancel)}
                        </StyledCancelExitTaskText>
                      </Typography>
                    ),
                  });
              },
            }
          );
        },
      }}
    >
      <TaskItemContent task={task} />
    </SwippableItem>
  );
};

export default memo(TaskListItem);
