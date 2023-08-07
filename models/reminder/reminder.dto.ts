import { ITaskDTO } from "linked-models/task/task.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { ITask } from "../task/task.model";

/**
 * sum of ITask (with required startDate and finishDate) and ITodoList
 */
export interface ICreateReminder
  extends Omit<ITask, "startDate" | "finishDate">,
    ITodoList {
  startDate: Date;
  finishDate: Date;
}

/**
 * DTO for create reminder - sum of ITaskDTO (with required startDate and finishDate) and ITodoList
 * all dates are strings to transfer over HTTP correctly
 */
export interface ICreateReminderDTO
  extends Omit<ITaskDTO, "startDate" | "finishDate">,
    ITodoList {
  startDate: string;
  finishDate: string;
}

/**
 * Partial of ICreateReminder with required todoListId and taskId
 */
export interface IEditReminder extends Partial<ICreateReminder> {
  todoListId: string;
  taskId: string;
}

/**
 * Partial of ICreateReminderDTO with required todoListId and taskId
 */
export interface IEditReminderDTO extends Partial<ICreateReminderDTO> {
  todoListId: string;
  taskId: string;
}
