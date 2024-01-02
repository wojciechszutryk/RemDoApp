import Collapse from "@mui/material/Collapse";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import EmptyTasksList from "pages/TodoListsPage/components/EmptyTasksList";
import { memo } from "react";
import { StyledCardContent } from "../../styles";
import TasksList from "./components/TasksList";

interface Props {
  activeTasks: IExtendedTaskDto[];
  completedTasks: IExtendedTaskDto[];
  expanded: boolean;
  scrollable?: boolean;
  todoListId: string;
}

const CardContent = ({
  activeTasks,
  completedTasks,
  expanded,
  scrollable,
  todoListId,
}: Props): JSX.Element => {
  return (
    <StyledCardContent scrollable={scrollable}>
      {activeTasks.length + completedTasks.length === 0 ? (
        <EmptyTasksList />
      ) : (
        <>
          <TasksList
            tasks={activeTasks}
            tasksState="active"
            todoListId={todoListId}
          />
          {scrollable ? (
            <TasksList
              tasks={completedTasks}
              tasksState="completed"
              todoListId={todoListId}
            />
          ) : (
            <Collapse
              in={expanded || activeTasks.length === 0}
              timeout="auto"
              unmountOnExit
            >
              <TasksList
                tasks={completedTasks}
                tasksState="completed"
                todoListId={todoListId}
              />
            </Collapse>
          )}
        </>
      )}
    </StyledCardContent>
  );
};

export default memo(CardContent);
