import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ISearchResults } from "linked-models/search/search.model";
import {
  SEARCH_LIMIT_PARAM,
  SEARCH_PHRASE_PARAM,
  SEARCH_SCOPE_PARAM,
  URL_SEARCH,
} from "linked-models/search/search.urls";

export const useGetSearchResultQuery = (
  searchQuery: string,
  searchScope?: string,
  searchLimit?: number,
  options?: Omit<UseQueryOptions<ISearchResults>, "queryFn">
): UseQueryResult<ISearchResults, unknown> => {
  const url = FRONTIFY_URL(URL_SEARCH, undefined, {
    [SEARCH_PHRASE_PARAM]: searchQuery,
    [SEARCH_SCOPE_PARAM]: searchScope,
    [SEARCH_LIMIT_PARAM]: searchLimit,
  });

  const getSearchResult = async () => {
    return await apiGet<ISearchResults>(url).then((res) => res.data);
  };

  return useQuery([URL_SEARCH, searchQuery], getSearchResult, options);
};
