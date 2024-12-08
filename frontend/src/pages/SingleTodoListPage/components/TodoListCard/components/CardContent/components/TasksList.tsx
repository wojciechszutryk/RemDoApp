import { AnimatePresence } from "framer-motion";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import useCheckTodoPermissions from "pages/TodoListsPage/hooks/useCheckTodoPermissions";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { QUICK_TASK_ID } from "../../CardActions/components/QuickTaskCreateBtn";
import QuickTaskListItem from "./QuickTaskListItem";
import TaskListItem from "./TaskListItem";

export interface TaskListProps {
  tasks: IExtendedTaskDto[];
  tasksState: "active" | "completed";
  todoListId: string;
}

const TasksList = ({
  tasks,
  tasksState,
  todoListId,
}: TaskListProps): JSX.Element => {
  const checkPermission = useCheckTodoPermissions();
  const { taskId } = useParams();

  return (
    <AnimatePresence>
      {tasks.map((task) => {
        // Special case for quick task (input field for creating new task)
        if (task.id === QUICK_TASK_ID) {
          return (
            <QuickTaskListItem
              key={task.id}
              task={task}
              todoListId={todoListId}
            />
          );
        }

        const canSwipe =
          checkPermission(
            TodoListPermissions.CanArchiveTask,
            todoListId,
            task.id
          ) ||
          (tasksState === "completed" &&
            checkPermission(
              TodoListPermissions.CanDeleteTask,
              todoListId,
              task.id
            )) ||
          (tasksState === "active" &&
            checkPermission(
              TodoListPermissions.CanEditTask,
              todoListId,
              task.id
            ));

        return (
          <TaskListItem
            key={task.id}
            task={task}
            showHighlight={taskId === task.id}
            canSwipe={canSwipe}
          />
        );
      })}
    </AnimatePresence>
  );
};

export default memo(TasksList);
