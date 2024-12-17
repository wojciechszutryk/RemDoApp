import { IBaseModelAttached } from "linked-models/abstraction/base.interface";

export interface ISearchHistory {
  searchedUserId?: string;
  searchedTodoListId?: string;
  searchedTaskId?: string;
  isReminder?: boolean;
  entityDate?: string;
  userId: string;
}

interface ISearchHistoryWithReadonlyProperties extends ISearchHistory {
  readonly whenCreated: Date;
}

export type ISearchHistoryAttached = ISearchHistoryWithReadonlyProperties &
  IBaseModelAttached;
