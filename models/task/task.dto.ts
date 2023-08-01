import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { ITask, ITaskAttached } from "./task.model";

export interface ITaskDTO
  extends Omit<
    ITask,
    "whenShouldBeStarted" | "whenShouldBeFinished" | "finishDate" | "startDate"
  > {
  whenShouldBeStarted?: string | null;
  whenShouldBeFinished?: string | null;
  finishDate?: string | null;
  startDate?: string | null;
}

/**
 * Task with creator
 */
export interface IExtendedTaskDto extends ITaskAttached {
  creator?: IUserPublicDataDTO;
}

export function mapITaskDTOToITask<T extends Partial<ITaskDTO>>(task: T) {
  const converStringifiedDateProperty = (value: string | undefined | null) =>
    typeof value === "string" ? new Date(value) : value;

  return {
    ...task,
    whenShouldBeStarted: converStringifiedDateProperty(
      task.whenShouldBeStarted
    ),
    whenShouldBeFinished: converStringifiedDateProperty(
      task.whenShouldBeFinished
    ),
    finishDate: converStringifiedDateProperty(task.finishDate),
    startDate: converStringifiedDateProperty(task.startDate),
  };
}

export function mapITaskToITaskDTO<T extends Partial<ITask>>(task: T) {
  const converDateProperty = (value: Date | undefined | null) =>
    value instanceof Date ? value.toString() : value;
  return {
    ...task,
    whenShouldBeStarted: converDateProperty(task.whenShouldBeStarted),
    whenShouldBeFinished: converDateProperty(task.whenShouldBeFinished),
    finishDate: converDateProperty(task.finishDate),
    startDate: converDateProperty(task.startDate),
  };
}
