export const TODO_LIST_PARAM = "todo-list";

export const URL_TODO_LISTS = "/todo-list";
export const URL_TODO_LIST = (todoListId?: string) =>
  `/${todoListId || ":" + TODO_LIST_PARAM}`;
