import CircleIcon from "@mui/icons-material/Circle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { motion, useMotionValue, usePresence } from "framer-motion";
import { useDialogs } from "framework/dialogs";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ITaskAttached } from "linked-models/task/task.model";
import { useEditTaskInTodoListMutation } from "pages/TodoListPage/mutations/editTaskInTodoList.mutation";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledCancelExitTaskText, StyledTaskItem } from "../styles";
import LeftShiftContent from "./LeftShiftContent";
import RightShiftContent from "./RightShiftContent";

interface Props {
  task: ITaskAttached;
}

const TaskListItem = ({ task }: Props): JSX.Element => {
  const { setSnackbar } = useSnackbar();
  const [isPresent, safeToRemove] = usePresence();
  const editTaskInTodoListMutation = useEditTaskInTodoListMutation();
  const [dragStartPosition, setDragStartPosition] = useState<null | number>(
    null
  );
  const { dialogsActions } = useDialogs();
  const x = useMotionValue(0);
  const { t } = useTranslation();

  const isTaskFinished = !!task.finishDate;

  const animations = {
    layout: true,
    initial: "out",
    animate: isPresent ? "in" : "out",
    whileTap: "tapped",
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: {
        scaleY: 0,
        opacity: 0,
        zIndex: -1299,
        transition: { duration: 0 },
      },
      tapped: { scale: 0.98, transition: { duration: 0.1 } },
    },
    transition: { type: "spring", stiffness: 500, damping: 50, mass: 1 },
  };

  return (
    <motion.div
      {...animations}
      style={{
        cursor: "grab",
        borderRadius: 8,
        position: isPresent ? "static" : "absolute",
      }}
    >
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <RightShiftContent x={x} finished={isTaskFinished} />
        <LeftShiftContent x={x} finished={isTaskFinished} />
        <motion.div
          drag={"x"}
          style={{ x }}
          dragDirectionLock
          dragConstraints={{ right: 0, left: 0 }}
          dragTransition={{
            bounceStiffness: 600,
            bounceDamping: 20,
          }}
          dragElastic={0.5}
          onDragStart={(_, info) => {
            setDragStartPosition(info.offset.x);
          }}
          onDragEnd={(_, info) => {
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
            if (!isPresent) safeToRemove();
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          <StyledTaskItem isTaskFinished={isTaskFinished}>
            <ListItem role={undefined} dense>
              <ListItemIcon>
                {task.important ? <PriorityHighIcon /> : <CircleIcon />}
              </ListItemIcon>
              <ListItemText primary={task.text} />
              <Collapse></Collapse>
            </ListItem>
          </StyledTaskItem>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(TaskListItem);
