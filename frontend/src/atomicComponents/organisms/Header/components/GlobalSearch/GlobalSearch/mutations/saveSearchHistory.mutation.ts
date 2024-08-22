import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ISearchHistoryDto } from "linked-models/search/search.dto";
import { ISearchHistoryAttached } from "linked-models/search/search.history.model";
import { URL_HISTORY, URL_SEARCH } from "linked-models/search/search.urls";

export const useSaveSearchHistoryMutation = () => {
  const queryClient = useQueryClient();

  const saveSearchHistory = async (
    searchHistoryRecord: ISearchHistoryDto
  ): Promise<ISearchHistoryAttached> => {
    const url = FRONTIFY_URL(URL_SEARCH, URL_HISTORY);
    return await apiPost<ISearchHistoryDto, ISearchHistoryAttached>(
      url,
      searchHistoryRecord
    ).then((res) => res.data);
  };

  return useMutation(saveSearchHistory, {
    onSuccess: (res: ISearchHistoryAttached) => {
      queryClient.setQueryData(
        [URL_SEARCH, URL_HISTORY],
        (prev?: ISearchHistoryAttached[]) => (prev ? [...prev, res] : [res])
      );
    },
  });
};
