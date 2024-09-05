import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";
import {
  SEARCH_LIMIT_PARAM,
  SEARCH_PHRASE_PARAM,
  SEARCH_SCOPE_PARAM,
  URL_SEARCH,
} from "linked-models/search/search.urls";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";

export const useGetSearchResultQuery = (
  searchQuery: string,
  todoListIDs?: string,
  searchCategory?: SearchCategory,
  searchLimit?: number,
  options?: Omit<UseQueryOptions<ISearchResults>, "queryFn">
): UseQueryResult<ISearchResults, unknown> => {
  const url = FRONTIFY_URL(URL_SEARCH, undefined, {
    [SEARCH_PHRASE_PARAM]: searchQuery,
    [TODO_LIST_PARAM]: todoListIDs,
    [SEARCH_SCOPE_PARAM]: searchCategory,
    [SEARCH_LIMIT_PARAM]: searchLimit,
  });

  const getSearchResult = async () => {
    return await apiGet<ISearchResults>(url).then((res) => res.data);
  };

  return useQuery([URL_SEARCH, searchQuery], getSearchResult, options);
};
