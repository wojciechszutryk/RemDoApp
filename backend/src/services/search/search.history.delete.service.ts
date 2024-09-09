import {
  ISearchHistoryDocument,
  SearchHistoryCollectionName,
  SearchHistoryCollectionType,
} from "dbSchemas/searchHistory.schema";
import { inject, injectable } from "inversify";
import { FilterQuery } from "mongoose";

@injectable()
export class SearchHistoryDeleteService {
  constructor(
    @inject(SearchHistoryCollectionName)
    private readonly searchHistoryCollection: SearchHistoryCollectionType
  ) {}

  public async deleteSearchHistoryForUser(userId: string): Promise<void> {
    await this.searchHistoryCollection.deleteMany({
      userId,
    });
  }

  public async deleteSearchHistoryRecordById(
    userId: string,
    recordId: string
  ): Promise<void> {
    await this.searchHistoryCollection.deleteOne({
      userId,
      _id: recordId,
    });
  }

  public async deleteSearchHistoryRecords(
    filter: FilterQuery<ISearchHistoryDocument>
  ): Promise<void> {
    await this.searchHistoryCollection.deleteMany(filter);
  }
}
