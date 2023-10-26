import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { ITask, ITaskAttached } from "./task.model";

export interface ITaskDTO
  extends Omit<ITask, "completionDate" | "finishDate" | "startDate"> {
  finishDate?: string | null;
  startDate?: string | null;
  completionDate?: string | null;
}

/**
 * Task with creator
 */
export interface IExtendedTaskDto extends Omit<ITaskAttached, "creatorId"> {
  creator?: IUserPublicDataDTO;
}

export function parseTaskDateFields<T extends Partial<ITaskDTO>>(task: T) {
  const converStringifiedDateProperty = (value: string | undefined | null) =>
    typeof value === "string" ? new Date(value) : value;

  return {
    ...task,
    finishDate: converStringifiedDateProperty(task.finishDate),
    startDate: converStringifiedDateProperty(task.startDate),
    completionDate: converStringifiedDateProperty(task.completionDate),
  };
}

export function stringifyTaskDateFields<T extends Partial<ITask>>(task: T) {
  const converDateProperty = (value: Date | undefined | null) =>
    value instanceof Date ? value.toString() : value;
  return {
    ...task,
    finishDate: converDateProperty(task.finishDate),
    startDate: converDateProperty(task.startDate),
    completionDate: converDateProperty(task.completionDate),
  };
}
