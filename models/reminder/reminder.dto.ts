import { ITaskDTO } from "linked-models/task/task.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { ITask } from "../task/task.model";

/**
 * sum of ITask (with required whenShouldBeStarted and whenShouldBeFinished) and ITodoList
 */
export interface ICreateReminder
  extends Omit<ITask, "whenShouldBeStarted" | "whenShouldBeFinished">,
    ITodoList {
  whenShouldBeStarted: Date;
  whenShouldBeFinished: Date;
}

/**
 * DTO for create reminder - sum of ITaskDTO (with required whenShouldBeStarted and whenShouldBeFinished) and ITodoList
 * all dates are strings to transfer over HTTP correctly
 */
export interface ICreateReminderDTO
  extends Omit<ITaskDTO, "whenShouldBeStarted" | "whenShouldBeFinished">,
    ITodoList {
  whenShouldBeStarted: string;
  whenShouldBeFinished: string;
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
