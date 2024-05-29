import { IBaseModelAttached } from "../abstraction/base.interface";

export interface ITask {
  text: string;

  description?: string;

  links?: string[];

  /** Initial Date when task should be started */
  startDate?: Date | null;

  /** Initial Date when task should be finished */
  finishDate?: Date | null;

  /** Date when to notify user about task or reminder - Not saved in DB, used only to create/edit*/
  notifyDate?: Date | null;

  /** Optional Date when task was finished */
  completionDate?: Date | null;

  /** Boolean to determine if task is important */
  important?: boolean;

  /** Recurrence of task - applied only for reminders - RRULE format */
  recurrance?: string[];
}

export interface ITaskWithReadonlyProperties extends ITask {
  /** Id of tododolist which task is part of. */
  readonly todoListId: string;

  /** Readonly creator id. */
  readonly creatorId: string;

  /** Date when task was created. */
  readonly whenCreated: Date;

  /** Date when task was updated. */
  readonly whenUpdated: Date;
}

export type ITaskAttached = ITaskWithReadonlyProperties & IBaseModelAttached;
