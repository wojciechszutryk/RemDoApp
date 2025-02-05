import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import useCheckTodoPermissions from "pages/TodoListsPage/helpers/hooks/useCheckTodoPermissions";
import { useMemo, useState } from "react";

const useTodoCardState = (todoList: IExtendedTodoListDto) => {
  const [isReorderingTasks, setIsReorderingTasks] = useState(false);
  const checkPermission = useCheckTodoPermissions();

  const { activeTasks, completedTasks } = useMemo(() => {
    const activeTasks: IExtendedTaskDto[] = [];
    const completedTasks: IExtendedTaskDto[] = [];
    todoList.tasks.forEach((task) => {
      if (!!task.completionDate) {
        completedTasks.push(task);
      } else {
        activeTasks.push(task);
      }
    });
    return { activeTasks, completedTasks };
  }, [todoList.tasks]);

  return {
    isReorderingTasks,
    setIsReorderingTasks,
    activeTasks,
    completedTasks,
    canCreateTask: checkPermission(
      TodoListPermissions.CanCreateTask,
      todoList.id
    ),
    canEdit: checkPermission(TodoListPermissions.CanEditTodoList, todoList.id),
    canShare: checkPermission(
      TodoListPermissions.CanShareTodoList,
      todoList.id
    ),
    canDelete: checkPermission(
      TodoListPermissions.CanDeleteTodoList,
      todoList.id
    ),
  };
};

export default useTodoCardState;
