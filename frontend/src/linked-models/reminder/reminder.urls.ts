import { TASK_PARAM } from "linked-models/task/task.urls";

export const PARAM_START_DATE = "startDate";
export const PARAM_END_DATE = "endDate";

export const URL_REMINDERS = "/reminders";

export const URL_REMINDER = (taskId?: string) =>
  `/${taskId || ":" + TASK_PARAM}${URL_REMINDERS}`;
