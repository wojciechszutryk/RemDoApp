import {
  ISearchHistory,
  ISearchHistoryAttached,
} from "linked-models/search/search.history.model";
import mongoose, { Document } from "mongoose";

export const SearchHistoryCollectionName = "SearchHistorys";

const SearchHistorySchema = new mongoose.Schema({});

export interface ISearchHistoryDocument extends ISearchHistory, Document {}

export type SearchHistoryCollectionType =
  mongoose.Model<ISearchHistoryDocument>;

export const getSearchHistoryCollection = () =>
  mongoose.model<ISearchHistoryDocument>(
    SearchHistoryCollectionName,
    SearchHistorySchema
  );

export const mapSearchHistoryToAttachedSearchHistory = (
  searchHistory: ISearchHistoryDocument
): ISearchHistoryAttached => {
  return {
    id: searchHistory.id,
    searchedUserId: searchHistory.searchedUserId,
    searchedTodoListId: searchHistory.searchedTodoListId,
    searchedTaskId: searchHistory.searchedTaskId,
    userId: searchHistory.userId,
  };
};
