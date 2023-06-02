import { Typography } from "@mui/material";
import { PanInfo } from "framer-motion";
import { useDialogs } from "framework/dialogs";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ITaskAttached } from "linked-models/task/task.model";
import { useEditTaskInTodoListMutation } from "pages/TodoListsPage/mutations/editTaskInTodoList.mutation";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyledCancelExitTaskText } from "./styles";

interface Args {
  task: ITaskAttached;
  isTaskFinished: boolean;
  isPresent: boolean;
  dragStartPosition: number | null;
  setDragStartPosition: Dispatch<SetStateAction<number | null>>;
  safeToRemove: null | undefined | (() => void);
}

const useOnDragEnd = ({
  dragStartPosition,
  task,
  isTaskFinished,
  isPresent,
  setDragStartPosition,
  safeToRemove,
}: Args) => {
  const editTaskInTodoListMutation = useEditTaskInTodoListMutation();
  const { setSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { dialogsActions } = useDialogs();
  return useCallback<
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  >(
    (_, info) => {
      if (dragStartPosition && info.offset.x - dragStartPosition > 150) {
        editTaskInTodoListMutation.mutate(
          {
            todoListId: task.todoListId!,
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
                            todoListId: task.todoListId!,
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
      } else if (
        dragStartPosition &&
        info.offset.x - dragStartPosition < -150
      ) {
        if (isTaskFinished) {
          dialogsActions.updateDeleteTaskDialog({
            visible: true,
            taskId: task.id,
            todoListId: task.todoListId,
          });
        } else {
          dialogsActions.updateTaskDialog({
            visible: true,
            todoListId: task.todoListId!,
            editTaskData: task,
          });
        }
      }

      setDragStartPosition(null);
      if (!isPresent && safeToRemove) safeToRemove();
    },
    [
      dialogsActions,
      dragStartPosition,
      editTaskInTodoListMutation,
      isPresent,
      isTaskFinished,
      safeToRemove,
      setDragStartPosition,
      setSnackbar,
      t,
      task,
    ]
  );
};

export default useOnDragEnd;
