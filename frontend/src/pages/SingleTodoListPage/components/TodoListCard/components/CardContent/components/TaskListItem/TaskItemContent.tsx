import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useSwippableItemContext } from "atomicComponents/molecules/SwippableItem/context";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  StyledDetailsColapse,
  StyledListItemIcon,
  StyledListItemText,
  StyledTaskListItem,
} from "./styles";
import TaskDetailsList from "./TaskDetailsList";

interface Props {
  task: IExtendedTaskDto;
}

const TaskItemContent = ({ task }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const { dragStartPosition } = useSwippableItemContext();
  const isTaskCompleted = !!task.completionDate;
  const [showHighlight, setShowHighlight] = useState(false);
  const { taskId } = useParams();

  useEffect(() => {
    if (taskId === task.id) {
      setShowHighlight(true);
      setTimeout(() => {
        setShowHighlight(false);
      }, 2000);
    }
  }, [task.id, taskId]);
  return (
    <StyledTaskListItem
      highlighted={showHighlight}
      role={undefined}
      onClick={() => {
        if (!dragStartPosition) setExpanded((prev) => !prev);
      }}
    >
      <StyledListItemIcon>
        {task.important ? (
          task.notifyDate ? (
            <NotificationImportantIcon />
          ) : (
            <PriorityHighIcon />
          )
        ) : task.notifyDate ? (
          <NotificationsIcon />
        ) : (
          <ArrowForwardIcon />
        )}
      </StyledListItemIcon>
      <StyledListItemText
        primary={task.text}
        isTaskFinished={isTaskCompleted}
      />
      <StyledDetailsColapse in={expanded}>
        <TaskDetailsList task={task} />
      </StyledDetailsColapse>
    </StyledTaskListItem>
  );
};

export default memo(TaskItemContent);
