export const TODO_LIST_PARAM = "todoListId";
export const PARAM_EXTENDED = "extended";
export const PARAM_WITH_MEMBERS = "with-members";

export const URL_TODO_LISTS = "/todoList";
export const URL_TODO_LIST = (todoListId?: string) =>
  `/${todoListId || ":" + TODO_LIST_PARAM}`;
