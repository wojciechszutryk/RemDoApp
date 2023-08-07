import { ITaskDTO } from "linked-models/task/task.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { ITask } from "../task/task.model";

/**
 * sum of ITask (with required startDate and finishDate) and ITodoList
 */
export interface IReminder
  extends Omit<ITask, "startDate" | "finishDate">,
    ITodoList {
  startDate: Date;
  finishDate: Date;
}

/**
 * DTO for reminder - sum of ITaskDTO (with required startDate and finishDate) and ITodoList
 * all dates are strings to transfer over HTTP correctly
 */
export interface IReminderDTO
  extends Omit<ITaskDTO, "startDate" | "finishDate">,
    ITodoList {
  startDate: string;
  finishDate: string;
}
