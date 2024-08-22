import {
  getSearchHistoryCollection,
  SearchHistoryCollectionName,
} from "dbSchemas/searchHistory.schema";
import { Container } from "inversify";
import { SearchHistoryService } from "services/search/search.history.service";
import { SearchService } from "services/search/search.service";

export const registerSearchHistoryBindings = (container: Container) => {
  container
    .bind(SearchHistoryCollectionName)
    .toDynamicValue(() => getSearchHistoryCollection());
  container.bind(SearchHistoryService).toSelf();
  container.bind(SearchService).toSelf();
};
