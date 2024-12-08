import { IExtendedTaskDto } from "linked-models/task/task.dto";
import EmptyTasksList from "pages/TodoListsPage/components/EmptyTasksList";
import { memo } from "react";
import { StyledCardContent } from "../styles";
import TasksList from "./components/TasksList";

interface Props {
  activeTasks: IExtendedTaskDto[];
  completedTasks: IExtendedTaskDto[];
  scrollable?: boolean;
  todoListId: string;
  children?: React.ReactNode;
}

const CardContent = ({
  activeTasks,
  completedTasks,
  scrollable,
  todoListId,
  children,
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

          {children}
        </>
      )}
    </StyledCardContent>
  );
};

export default memo(CardContent);
