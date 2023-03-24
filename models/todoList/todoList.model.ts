import { IBaseModelAttached } from "../abstraction/base.interface";

export interface ITodoList {
  /** Name of tasks list */
  name: string;
}

export interface ITodoListWithReadonlyProperties extends ITodoList {
  /** Readonly creator id. */
  readonly creator?: string;

  /** Readonly Ids of invited users. Invited user can create new tasks and edit/delete his own tasks */
  readonly assignedUsers?: string[];

  /** Readonly Ids of owner users. Owners can modify everything in todoList scope inc. deleting other users' tasks or deleting whole todoList */
  readonly assignedOwners?: string[];

  /** Date when tasks list was created. */
  readonly whenCreated: Date;

  /** Date when tasks list was updated. */
  readonly whenUpdated: Date;
}

export type ITodoListAttached = ITodoListWithReadonlyProperties &
  IBaseModelAttached;