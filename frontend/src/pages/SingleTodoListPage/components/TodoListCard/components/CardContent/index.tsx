import Collapse from "@mui/material/Collapse";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import EmptyTasksList from "pages/TodoListsPage/components/EmptyTasksList";
import { memo } from "react";
import { StyledCardContent } from "../../styles";
import SortableTaskList from "./components/SortableTaskList";
import TasksList from "./components/TasksList";

interface Props {
  activeTasks: IExtendedTaskDto[];
  completedTasks: IExtendedTaskDto[];
  isReordering: boolean;
  expanded: boolean;
  scrollable?: boolean;
  todoListId: string;
}

const CardContent = ({
  activeTasks,
  completedTasks,
  isReordering,
  expanded,
  scrollable,
  todoListId,
}: Props): JSX.Element => {
  if (isReordering) {
    return (
      <StyledCardContent scrollable={scrollable}>
        <SortableTaskList tasks={activeTasks} tasksState="active" />
      </StyledCardContent>
    );
  }

  return (
    <StyledCardContent scrollable={scrollable}>
      {activeTasks.length + completedTasks.length === 0 ? (
        <EmptyTasksList />
      ) : (
        <>
          {isReordering ? (
            <SortableTaskList tasks={activeTasks} tasksState="active" />
          ) : (
            <TasksList
              tasks={activeTasks}
              tasksState="active"
              todoListId={todoListId}
            />
          )}
          {scrollable ? (
            isReordering ? (
              <SortableTaskList tasks={completedTasks} tasksState="completed" />
            ) : (
              <TasksList
                tasks={completedTasks}
                tasksState="completed"
                todoListId={todoListId}
              />
            )
          ) : (
            <Collapse
              in={expanded || activeTasks.length === 0}
              timeout="auto"
              unmountOnExit
            >
              {isReordering ? (
                <SortableTaskList
                  tasks={completedTasks}
                  tasksState="completed"
                />
              ) : (
                <TasksList
                  tasks={completedTasks}
                  tasksState="completed"
                  todoListId={todoListId}
                />
              )}
            </Collapse>
          )}
        </>
      )}
    </StyledCardContent>
  );
};

export default memo(CardContent);
