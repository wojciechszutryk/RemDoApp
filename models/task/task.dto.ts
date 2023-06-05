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
  creator: IUserPublicDataDTO;
}

export function mapITaskDTOToITask<T extends Partial<ITaskDTO>>(task: T) {
  return {
    ...task,
    whenShouldBeStarted: task.whenShouldBeStarted
      ? new Date(task.whenShouldBeStarted)
      : undefined,
    whenShouldBeFinished: task.whenShouldBeFinished
      ? new Date(task.whenShouldBeFinished)
      : undefined,
    finishDate: task.finishDate ? new Date(task.finishDate) : undefined,
    startDate: task.startDate ? new Date(task.startDate) : undefined,
  };
}

export function mapITaskToITaskDTO<T extends Partial<ITask>>(task: T) {
  return {
    ...task,
    whenShouldBeStarted: task.whenShouldBeStarted
      ? task.whenShouldBeStarted.toString()
      : undefined,
    whenShouldBeFinished: task.whenShouldBeFinished
      ? task.whenShouldBeFinished.toString()
      : undefined,
    finishDate: task.finishDate ? task.finishDate.toString() : undefined,
    startDate: task.startDate ? task.startDate.toString() : undefined,
  };
}
