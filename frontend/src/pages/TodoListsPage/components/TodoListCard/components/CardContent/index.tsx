import { CardContent as MuiCardContent } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { ITaskAttached } from "linked-models/task/task.model";
import EmptyTasksList from "pages/TodoListPage/components/EmptyTasksList";
import { memo, useMemo } from "react";
import TasksList from "./components/TasksList";

interface Props {
  tasks: ITaskAttached[];
  expanded: boolean;
}

const CardContent = ({ tasks, expanded }: Props): JSX.Element => {
  const { activeTasks, finishedTasks } = useMemo(() => {
    const activeTasks: ITaskAttached[] = [];
    const finishedTasks: ITaskAttached[] = [];
    tasks.forEach((task) => {
      if (!!task.finishDate) {
        finishedTasks.push(task);
      } else {
        activeTasks.push(task);
      }
    });
    return { activeTasks, finishedTasks };
  }, [tasks]);

  return (
    <MuiCardContent>
      {tasks.length === 0 ? (
        <EmptyTasksList />
      ) : (
        <>
          {/* {activeTasks.length === 0 ? (
            <EmptyTasksList />
          ) : ( */}
          <TasksList tasks={activeTasks} />
          {/* )} */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {activeTasks.length === 0 ? (
              <EmptyTasksList />
            ) : (
              <TasksList tasks={finishedTasks} />
            )}
          </Collapse>
        </>
      )}
    </MuiCardContent>
  );
};

export default memo(CardContent);
