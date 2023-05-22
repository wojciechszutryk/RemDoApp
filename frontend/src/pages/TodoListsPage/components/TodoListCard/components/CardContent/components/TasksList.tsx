import { SwipeableList } from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import { ITaskAttached } from "linked-models/task/task.model";
import { memo } from "react";
import TaskListItem from "./TaskListItem";

interface Props {
  tasks: ITaskAttached[];
}

const TasksList = ({ tasks }: Props): JSX.Element => {
  return (
    <SwipeableList threshold={0.5}>
      {tasks.map((task, index) => {
        return <TaskListItem key={index} task={task} index={index} />;
      })}
    </SwipeableList>
  );
};

export default memo(TasksList);
