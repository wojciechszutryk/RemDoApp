import { IBaseModelAttached } from "linked-models/abstraction/base.interface";

export interface ISearchHistory {
  searchedUserId?: string;
  searchedTodoListId?: string;
  searchedTaskId?: string;
  isReminder?: boolean;
  userId: string;
}

export type ISearchHistoryAttached = ISearchHistory & IBaseModelAttached;
