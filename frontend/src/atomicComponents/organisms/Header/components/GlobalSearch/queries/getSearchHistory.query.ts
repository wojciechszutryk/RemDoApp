import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ISearchHistoryRespDto } from "linked-models/search/search.history.dto";
import { URL_HISTORY, URL_SEARCH } from "linked-models/search/search.urls";

export const SearchHistoryLSKey = "searchHistory";

export const useGetSearchHistoryQuery = (): UseQueryResult<
  ISearchHistoryRespDto[],
  unknown
> => {
  const url = FRONTIFY_URL(URL_SEARCH, URL_HISTORY);

  const getCurrentSearchResult = async () => {
    return await apiGet<ISearchHistoryRespDto[]>(url).then((res) => res.data);
  };

  return useQuery([URL_SEARCH, URL_HISTORY], getCurrentSearchResult, {
    cacheTime: 600000,
    staleTime: 600000,
    initialData: JSON.parse(localStorage.getItem(SearchHistoryLSKey) || "[]"),
    onSuccess: (data) => {
      localStorage.setItem(SearchHistoryLSKey, JSON.stringify(data));
    },
  });
};
