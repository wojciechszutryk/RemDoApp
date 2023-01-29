import { IBaseModelAttached } from "../abstraction/base.interface";

export interface ITodoList {
  /** Name of tasks list */
  name: string;

  /** Optional password token to access task list */
  token?: string;
}

export interface ITodoListWithReadonlyProperties extends ITodoList {
  /** Readonly creator id. */
  readonly creator?: string;

  /** Date when tasks list was created. */
  readonly whenCreated: Date;

  /** Date when tasks list was updated. */
  readonly whenUpdated: Date;
}

export type ITodoListAttached = ITodoListWithReadonlyProperties &
  IBaseModelAttached;
