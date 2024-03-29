import { IBaseModelAttached } from "../abstraction/base.interface";
import { TodoListIconEnum } from "./todoList.enum";

export interface ITodoList {
  /** Name of tasks list. Undefined for reminders. */
  name: string;

  /** IDs of invited users. Invited user can create new tasks and edit/delete his own tasks */
  assignedUsers?: string[];

  /** IDs of owner users. Owners can modify everything in todoList scope inc. deleting other users' tasks or deleting whole todoList */
  assignedOwners?: string[];

  /** Icon of todoList. Icon is used to graphically identify todoList and it's tasks */
  icon: TodoListIconEnum;

  /** Boolean to determine if todoList was created as part of reminder */
  isReminder?: boolean;
}

export interface ITodoListWithReadonlyProperties extends ITodoList {
  /** Readonly creator id. */
  readonly creatorId: string;

  /** Date when tasks list was created. */
  readonly whenCreated: Date;

  /** Date when tasks list was updated. */
  readonly whenUpdated: Date;
}

export type ITodoListAttached = ITodoListWithReadonlyProperties &
  IBaseModelAttached;
