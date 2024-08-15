import NotificationsIcon from "@mui/icons-material/Notifications";
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

const openLinkInNewTab = (link: string) => () => window.open(link, "_blank");

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
      {task.notifyDate && (
        <StyledListItemIcon>
          <NotificationsIcon />
        </StyledListItemIcon>
      )}
      <StyledListItemText
        isLink={!!task.link}
        onClick={
          !!task.link && !isDragging ? openLinkInNewTab(task.link) : undefined
        }
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
