import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { Collapse, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  ActionAnimations,
  SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import { ITaskAttached } from "linked-models/task/task.model";
import { memo, useState } from "react";
import { StyledTaskItem } from "../styles";

interface Props {
  index: number;
  task: ITaskAttached;
}

const TaskListItem = ({ index, task }: Props): JSX.Element => {
  const [order, setOrder] = useState(index);
  return (
    <SwipeableListItem
      //   order={order}
      key={index}
      swipeRight={{
        content: task.important ? <UnpublishedIcon /> : <CheckCircleIcon />,
        actionAnimation: ActionAnimations.REMOVE,
        action: () => {
          if (!!task.finishDate) {
            setOrder(0);
            //TODO:add mutation
          } else {
            setOrder(99);
            //TODO:add mutation
          }
        },
      }}
    >
      <StyledTaskItem key={index} disablePadding>
        <ListItem role={undefined} dense>
          <ListItemIcon>
            {task.important ? <PriorityHighIcon /> : <CircleIcon />}
          </ListItemIcon>
          <ListItemText primary={task.text} />
          <Collapse></Collapse>
        </ListItem>
      </StyledTaskItem>
    </SwipeableListItem>
  );
};

export default memo(TaskListItem);
