import { IBaseModelAttached } from "../abstraction/base.interface";

export interface ITask {
  /** Text of task */
  text: string;

  /** Date when task should be started */
  whenShouldBeStarted?: Date;

  /** Date when task should be finished */
  whenShouldBeFinished?: Date;

  /** Date when task was started */
  startDate?: string;

  /** Date when task was finished */
  finishDate?: Date;

  /** Boolean to determine if task is important */
  important?: boolean;

  /** Task's background color in hex */
  color?: string;
}

export interface ITaskWithReadonlyProperties extends ITask {
  /** Id of tododolist which task will be part of. Undefined means that taski is reminder, not connected to todoList */
  readonly todoListId?: string;

  /** Readonly creator id. */
  readonly creator: string;

  /** Date when task was created. */
  readonly whenCreated: Date;

  /** Date when task was updated. */
  readonly whenUpdated: Date;
}

export type ITaskAttached = ITaskWithReadonlyProperties & IBaseModelAttached;
