import { ISearchHistory, ISearchHistoryAttached } from "./search.history.model";
import { SearchCategory } from "./search.model";

export interface ISearchHistoryRespDto
  extends Omit<ISearchHistoryAttached, "userId"> {
  displayName: string;
  category: SearchCategory;
}

export type ISearchHistoryDto = Omit<ISearchHistory, "userId">;
