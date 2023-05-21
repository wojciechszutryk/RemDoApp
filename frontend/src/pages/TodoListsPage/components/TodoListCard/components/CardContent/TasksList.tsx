import { ITaskAttached } from "linked-models/task/task.model";
import { memo } from "react";
import SwippableTask from "./SwippableTask";

interface Props {
  tasks: ITaskAttached[];
}

const TasksList = ({ tasks }: Props): JSX.Element => {
  return (
    // <List>
    <>
      {tasks.map((task, index) => {
        return (
          // <ListItem
          //   key={task.id}
          //   secondaryAction={
          //     <IconButton edge="end" aria-label="comments">
          //       <MoreVertIcon />
          //     </IconButton>
          //   }
          //   disablePadding
          // >
          <SwippableTask key={index} task={task} />
          // </ListItem>
        );
      })}
    </>

    // </List>
  );
};

export default memo(TasksList);
