import { AnimatePresence } from "framer-motion";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import useCheckTodoPermissions from "pages/TodoListsPage/hooks/useCheckTodoPermissions";
import { memo } from "react";
import { QUICK_TASK_ID } from "../../CardActions/components/QuickTaskCreateBtn";
import QuickTaskListItem from "./QuickTaskListItem";
import TaskListItem from "./TaskListItem";

interface Props {
  tasks: IExtendedTaskDto[];
  tasksState: "active" | "completed";
  todoListId: string;
}

const TasksList = ({ tasks, tasksState, todoListId }: Props): JSX.Element => {
  const checkPermission = useCheckTodoPermissions();

  return (
    <AnimatePresence>
      {tasks.map((task) => {
        if (task.id === QUICK_TASK_ID) {
          return (
            <QuickTaskListItem
              key={task.id}
              task={task}
              todoListId={todoListId}
            />
          );
        }

        return (
          <TaskListItem
            key={task.id}
            task={task}
            canArchive={checkPermission(
              TodoListPermissions.CanArchiveTask,
              todoListId,
              task.id
            )}
            canDelete={
              tasksState === "completed" &&
              checkPermission(
                TodoListPermissions.CanDeleteTask,
                todoListId,
                task.id
              )
            }
            canEdit={
              tasksState === "active" &&
              checkPermission(
                TodoListPermissions.CanEditTask,
                todoListId,
                task.id
              )
            }
          />
        );
      })}
    </AnimatePresence>
  );
};

export default memo(TasksList);
