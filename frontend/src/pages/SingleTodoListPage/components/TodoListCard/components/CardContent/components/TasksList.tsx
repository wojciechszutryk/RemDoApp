import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import { AnimatePresence } from "framer-motion";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { memo } from "react";
import TaskListItem from "./TaskListItem";

interface Props {
  tasks: IExtendedTaskDto[];
}

const TasksList = ({ tasks }: Props): JSX.Element => {
  return (
    <AnimatePresence>
      {tasks.map((task) => {
        return <TaskListItem key={task.id} task={task} />;
      })}
    </AnimatePresence>
  );
};

export default memo(TasksList);
