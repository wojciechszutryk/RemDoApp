export const TODO_LIST_PARAM = "todoList";
export const PARAM_EXTENDED = "extended";
export const PARAM_START_DATE = "startDate";
export const PARAM_END_DATE = "endDate";

export const URL_TODO_LISTS = "/todo-list";
export const URL_TODO_LIST = (todoListId?: string) =>
  `/${todoListId || ":" + TODO_LIST_PARAM}`;
