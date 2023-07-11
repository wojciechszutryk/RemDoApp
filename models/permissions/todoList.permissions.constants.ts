import { TodoListPermissions } from "./todoList.permissions.enum";

export const AssignedToTodoListPermissions = [
  TodoListPermissions.CanReadTodoList,
  TodoListPermissions.CanCreateTask,
];

export const AssignedToTodoListAndTaskCreatorPermissions = [
  ...AssignedToTodoListPermissions,
  TodoListPermissions.CanEditTask,
  TodoListPermissions.CanDeleteTask,
];
