import { IBaseModelAttached } from "linked-models/abstraction/base.interface";

/**
 * if both searchedTodoListId and searchedTaskId provided - it's a reminder
 */
export interface ISearchHistory {
  searchedUserId?: string;
  searchedTodoListId?: string;
  searchedTaskId?: string;
  userId: string;
}

export type ISearchHistoryAttached = ISearchHistory & IBaseModelAttached;
