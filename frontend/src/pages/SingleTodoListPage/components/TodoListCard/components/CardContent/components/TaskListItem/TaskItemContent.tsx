import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useSwippableItemContext } from "atomicComponents/molecules/SwippableItem/context";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
