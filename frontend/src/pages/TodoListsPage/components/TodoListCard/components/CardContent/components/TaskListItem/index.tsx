import CircleIcon from "@mui/icons-material/Circle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Collapse, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import {
  motion,
  useMotionValue,
  usePresence,
  useTransform,
} from "framer-motion";
import { ITaskAttached } from "linked-models/task/task.model";
import { memo, useState } from "react";
import LeftShiftContent from "./LeftShiftContent";
import useOnDragEnd from "./onDragEnd.helper";
import RightShiftContent from "./RightShiftContent";
import { StyledDetailsColapse, StyledTaskItem, StyledTaskListItem, taskAnimations } from "./styles";
import TaskDetailsList from "./TaskDetailsList";

interface Props {
  task: ITaskAttached;
}

const TaskListItem = ({ task }: Props): JSX.Element => {
  const [isPresent, safeToRemove] = usePresence();
  const [expanded, setExpanded] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState<null | number>(
    null
  );
  const x = useMotionValue(0);
  const isTaskFinished = !!task.finishDate;
  const onDragEnd = useOnDragEnd({
    task,
    isTaskFinished,
    isPresent,
    dragStartPosition,
    setDragStartPosition,
    safeToRemove,
  });

  const theme = useTheme();

  const background = useTransform(
    x,
    [-75, 0, 75],
    [
      isTaskFinished ? theme.palette.warning.main : theme.palette.primary.main,
      isTaskFinished ? theme.palette.background.paper : theme.palette.info.main,
      isTaskFinished ? theme.palette.info.main : theme.palette.background.paper,
    ]
  );

  return (
    <motion.div
      {...taskAnimations(isPresent)}
      style={{
        cursor: "grab",
        borderRadius: 8,
        position: isPresent ? "static" : "absolute",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background,
        }}
      >
        <RightShiftContent x={x} finished={isTaskFinished} />
        <LeftShiftContent x={x} finished={isTaskFinished} />
        <motion.div
          drag={"x"}
          style={{ x }}
          dragDirectionLock
          dragConstraints={{ right: 0, left: 0 }}
          dragTransition={{
            bounceStiffness: 600,
          }}
          dragElastic={0.5}
          onDragStart={(_, info) => {
            setDragStartPosition(info.offset.x);
          }}
          onDragEnd={onDragEnd}
          whileTap={{ cursor: "grabbing" }}
        >
          <StyledTaskItem
            isTaskFinished={isTaskFinished}
            onClick={() => setExpanded((prev) => !prev)}
          >
            <StyledTaskListItem role={undefined} dense>
              <ListItemIcon>
                {task.important ? <PriorityHighIcon /> : <CircleIcon />}
              </ListItemIcon>
              <ListItemText primary={task.text} />
              <StyledDetailsColapse in={expanded}>
                <TaskDetailsList task={task} />
              </StyledDetailsColapse>
            </StyledTaskListItem>
          </StyledTaskItem>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default memo(TaskListItem);
