import { URL_TODO_LIST, URL_TODO_LISTS } from "../todoList/todoList.urls";

export const TASK_PARAM = "taskId";
export const URL_TASKS = "/tasks";

export const URL_TASK = (taskId?: string) => `/${taskId || ":" + TASK_PARAM}`;

/** todo-lists/{todoListId}/tasks */
export const URL_TODO_LIST_TASKS = (todoListId?: string): string =>
  `${URL_TODO_LISTS}${URL_TODO_LIST(todoListId)}${URL_TASKS}`;

/** todo-lists/{todoListId}/tasks/{taskId} */
export const URL_TODO_LIST_TASK = (
  todoListId?: string,
  taskId?: string
): string => `${URL_TODO_LIST_TASKS(todoListId)}${URL_TASK(taskId)}`;
