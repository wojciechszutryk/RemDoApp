import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ISearchResults } from "linked-models/search/search.model";
import { URL_HISTORY, URL_SEARCH } from "linked-models/search/search.urls";

export const SearchHistoryLSKey = "searchHistory";

export const useGetSearchHistoryQuery = (
  options?: Omit<UseQueryOptions<ISearchResults>, "queryKey" | "queryFn">
): UseQueryResult<ISearchResults, unknown> => {
  const url = FRONTIFY_URL(URL_SEARCH, URL_HISTORY);

  const getCurrentSearchResult = async () => {
    if (!options?.enabled) {
      const lsItem = localStorage.getItem("searchHistory");

      try {
        return lsItem
          ? JSON.parse(localStorage.getItem("searchHistory") as string)
          : {};
      } catch (e) {
        console.log("error while parsing searchHistory", e);
        return {};
      }
    }

    return await apiGet<ISearchResults>(url).then((res) => res.data);
  };

  return useQuery([URL_SEARCH, URL_HISTORY], getCurrentSearchResult, {
    enabled: options?.enabled,
    onSuccess: (data) => {
      localStorage.setItem("searchHistory", JSON.stringify(data));
    },
  });
};
