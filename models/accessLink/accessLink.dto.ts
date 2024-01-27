import { TodoListRole } from "../permissions/todoList.permissions.enum";

export type AccessHashesForTodoListDTO = {
  [TodoListRole.Admin]: string | undefined;
  [TodoListRole.Member]: string | undefined;
  [TodoListRole.Viewer]: string | undefined;
};
