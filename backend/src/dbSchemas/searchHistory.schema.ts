import { ISearchHistory } from "linked-models/search/search.history.model";
import mongoose, { Document } from "mongoose";

export const SearchHistoryCollectionName = "SearchHistorys";

const SearchHistorySchema = new mongoose.Schema({
  searchedUserId: {
    type: String,
    required: false,
  },
  searchedTodoListId: {
    type: String,
    required: false,
  },
  searchedTaskId: {
    type: String,
    required: false,
  },
  isReminder: {
    type: Boolean,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

export interface ISearchHistoryDocument extends ISearchHistory, Document {}

export type SearchHistoryCollectionType =
  mongoose.Model<ISearchHistoryDocument>;

export const getSearchHistoryCollection = () =>
  mongoose.model<ISearchHistoryDocument>(
    SearchHistoryCollectionName,
    SearchHistorySchema
  );
