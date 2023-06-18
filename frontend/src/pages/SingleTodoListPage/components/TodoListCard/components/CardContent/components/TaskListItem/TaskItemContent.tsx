import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useSwippableItemContext } from "atomicComponents/molecules/SwippableItem/context";
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
}

const TaskItemContent = ({ task }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const { dragStartPosition } = useSwippableItemContext();
  const isTaskFinished = !!task.finishDate;
  return (
    <StyledTaskListItem
      role={undefined}
      onClick={() => {
        if (!dragStartPosition) setExpanded((prev) => !prev);
      }}
    >
      <StyledListItemIcon>
        {task.important ? <PriorityHighIcon /> : <ArrowForwardIcon />}
      </StyledListItemIcon>
      <StyledListItemText primary={task.text} isTaskFinished={isTaskFinished} />
      <StyledDetailsColapse in={expanded}>
        <TaskDetailsList task={task} />
      </StyledDetailsColapse>
    </StyledTaskListItem>
  );
};

export default memo(TaskItemContent);
