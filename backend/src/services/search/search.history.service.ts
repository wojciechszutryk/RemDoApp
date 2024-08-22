import {
  SearchHistoryCollectionName,
  SearchHistoryCollectionType,
  mapSearchHistoryToAttachedSearchHistory,
} from "dbSchemas/searchHistory.schema";
import { inject, injectable } from "inversify";
import { ISearchHistoryAttached } from "linked-models/search/search.history.model";

@injectable()
export class SearchHistoryService {
  constructor(
    @inject(SearchHistoryCollectionName)
    private readonly searchHistoryCollection: SearchHistoryCollectionType
  ) {}

  public async getSearchHistoryForUser(
    userId: string
  ): Promise<ISearchHistoryAttached[]> {
    const searchHistoryRecords = await this.searchHistoryCollection.find({
      user: userId,
    });

    return searchHistoryRecords.map((h) =>
      mapSearchHistoryToAttachedSearchHistory(h)
    );
  }

  public async deleteSearchHistoryForUser(userId: string): Promise<void> {
    await this.searchHistoryCollection.deleteMany({
      userId,
    });
  }

  public async deleteSearchHistoryRecord(
    userId: string,
    recordId: string
  ): Promise<void> {
    await this.searchHistoryCollection.deleteOne({
      userId,
      _id: recordId,
    });
  }
}
