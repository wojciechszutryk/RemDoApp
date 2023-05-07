export const TODO_LIST_PARAM = "todoList";
export const PARAM_WITH_TASKS = "withTasks";
export const PARAM_WITH_MEMBERS = "withMembers";

export const URL_TODO_LISTS = "/todo-list";
export const URL_TODO_LIST = (todoListId?: string) =>
  `/${todoListId || ":" + TODO_LIST_PARAM}`;
