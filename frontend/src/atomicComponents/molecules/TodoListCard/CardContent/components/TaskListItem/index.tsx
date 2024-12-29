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
import { useEditTaskInTodoListMutation } from "pages/SingleTodoListPage/mutations/editTask/editTask.mutation";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import SwippableTaskItemContent from "./SwippableTaskItemContent";
import TaskItemContent from "./TaskItemContent";
import { StyledCancelExitTaskText } from "./styles";

interface Props {
  task: IExtendedTaskDto;
  canSwipe?: boolean;
  showHighlight?: boolean;
}

const TaskListItem = ({
  task,
  canSwipe,
  showHighlight,
}: Props): JSX.Element => {
  const isTaskCompleted = !!task.completionDate;
  const editTaskInTodoListMutation = useEditTaskInTodoListMutation();
  const { setSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { dialogsActions } = useDialogs();

  const theme = useTheme();

  if (!canSwipe) {
    return <TaskItemContent task={task} showHighlight={showHighlight} />;
  }

  return (
    <SwippableItem
      defaultColor={
        isTaskCompleted
          ? theme.palette.info.main
          : theme.palette.background.paper
      }
      rightShift={{
        color: isTaskCompleted
          ? theme.palette.info.main
          : theme.palette.background.paper,
        Icon: isTaskCompleted ? <UnpublishedIcon /> : <CheckCircleIcon />,
        action: () => {
          editTaskInTodoListMutation.mutate(
            {
              todoListId: task.todoListId,
              taskId: task.id,
              data: {
                completionDate: isTaskCompleted ? null : new Date(),
              },
            },
            {
              onSuccess: () => {
                if (!isTaskCompleted)
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
                                completionDate: null,
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
      leftShift={{
        color: isTaskCompleted
          ? theme.palette.warning.main
          : theme.palette.primary.main,
        Icon: isTaskCompleted ? <DeleteIcon /> : <EditIcon />,
        action: () => {
          if (isTaskCompleted) {
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
    >
      <SwippableTaskItemContent task={task} showHighlight={showHighlight} />
    </SwippableItem>
  );
};

export default memo(TaskListItem);
