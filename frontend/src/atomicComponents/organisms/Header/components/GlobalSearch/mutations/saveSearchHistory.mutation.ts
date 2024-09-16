import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  ISearchHistoryDto,
  ISearchHistoryRespDto,
} from "linked-models/search/search.history.dto";
import { URL_HISTORY, URL_SEARCH } from "linked-models/search/search.urls";

export const useSaveSearchHistoryMutation = () => {
  const queryClient = useQueryClient();

  const saveSearchHistory = async (
    searchHistoryRecord: ISearchHistoryDto
  ): Promise<ISearchHistoryRespDto> => {
    return await apiPost<ISearchHistoryDto, ISearchHistoryRespDto>(
      FRONTIFY_URL(URL_SEARCH, URL_HISTORY),
      searchHistoryRecord
    ).then((res) => res.data);
  };

  return useMutation(saveSearchHistory, {
    onSuccess: (res: ISearchHistoryRespDto) => {
      queryClient.setQueryData(
        [URL_SEARCH, URL_HISTORY],
        (prev?: ISearchHistoryRespDto[]) => (prev ? [...prev, res] : [res])
      );
    },
  });
};
