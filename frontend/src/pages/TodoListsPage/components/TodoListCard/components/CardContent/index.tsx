import { CardContent as MuiCardContent } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import EmptyTasksList from "pages/TodoListsPage/components/EmptyTasksList";
import { memo } from "react";
import TasksList from "./components/TasksList";

interface Props {
  activeTasks: IExtendedTaskDto[];
  finishedTasks: IExtendedTaskDto[];
  expanded: boolean;
}

const CardContent = ({
  activeTasks,
  finishedTasks,
  expanded,
}: Props): JSX.Element => {
  return (
    <MuiCardContent>
      {activeTasks.length + finishedTasks.length === 0 ? (
        <EmptyTasksList />
      ) : (
        <>
          <TasksList tasks={activeTasks} />
          <Collapse
            in={expanded || activeTasks.length === 0}
            timeout="auto"
            unmountOnExit
          >
            <TasksList tasks={finishedTasks} />
          </Collapse>
        </>
      )}
    </MuiCardContent>
  );
};

export default memo(CardContent);
