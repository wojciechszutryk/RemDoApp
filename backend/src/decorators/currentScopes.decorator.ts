import { requestParam } from "inversify-express-utils";

export const CURRENT_TODO_LIST_PARAM = "currentTodoList";
export const CURRENT_TASK_PARAM = "currentTask";

export const currentTodoList: () => ParameterDecorator = () =>
  requestParam(CURRENT_TODO_LIST_PARAM);

export const currentTask: () => ParameterDecorator = () =>
  requestParam(CURRENT_TASK_PARAM);
