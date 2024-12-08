import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo, useState } from "react";
import TaskDetailsList from "./TaskDetailsList";
import TaskIcon from "./TaskIcon";
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

const openLinkInNewTab = (e: React.MouseEvent, link: string) => {
  e.stopPropagation();
  window.open(link, "_blank");
};

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
        <TaskIcon task={task} />
      </StyledListItemIcon>
      <StyledListItemText
        isLink={!!task.link}
        onClick={
          !!task.link && !isDragging
            ? (e) => openLinkInNewTab(e, task.link!)
            : undefined
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
