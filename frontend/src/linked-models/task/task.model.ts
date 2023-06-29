import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { IBaseModelAttached } from "../abstraction/base.interface";

export interface ITask {
  /** Text of task */
  text: string;

  /** Date when task should be started */
  whenShouldBeStarted?: Date | null;

  /** Date when task should be finished */
  whenShouldBeFinished?: Date | null;

  /** Date when task was finished */
  finishDate?: Date | null;

  /** Date when task was started */
  startDate?: Date | null;

  /** Boolean to determine if task is important */
  important?: boolean;

  /** Icon of task. Optional property. By default task icon is inherited from parent todoList. In case when task is part of 'RemindersList' (special todoList to gather task that are used as reminders), task can have its own icon. */
  icon?: TodoListIconEnum;
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