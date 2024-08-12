import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo, useState } from "react";
import TaskDetailsList from "./TaskDetailsList";
import {
  StyledDetailsColapse,
  StyledListItemIcon,
  StyledListItemText,
  StyledTaskListItem,
} from "./styles";

interface Props {
  task: IExtendedTaskDto;
  isDragging?: boolean;
  showHighlight?: boolean;
}

const TaskItemContent = ({
  task,
  isDragging,
  showHighlight,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const isTaskCompleted = !!task.completionDate;

  return (
    <StyledTaskListItem
      showHighlight={showHighlight}
      role={undefined}
      onClick={() => {
        if (!isDragging) setExpanded((prev) => !prev);
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
