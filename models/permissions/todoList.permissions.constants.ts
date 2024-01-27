import { TodoListPermissions } from "./todoList.permissions.enum";

export const TodoListViewerPermissions = [TodoListPermissions.CanReadTodoList];

export const AssignedToTodoListPermissions = [
  ...TodoListViewerPermissions,
  TodoListPermissions.CanCreateTask,
];

export const AssignedToTodoListAndTaskCreatorPermissions = [
  ...AssignedToTodoListPermissions,
  TodoListPermissions.CanEditTask,
  TodoListPermissions.CanArchiveTask,
  TodoListPermissions.CanDeleteTask,
];
