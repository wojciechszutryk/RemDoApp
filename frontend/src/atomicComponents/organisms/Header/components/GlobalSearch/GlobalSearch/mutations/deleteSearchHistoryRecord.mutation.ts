import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ISearchHistoryAttached } from "linked-models/search/search.history.model";
import {
  URL_HISTORY,
  URL_SEARCH,
  URL_SINGLE_HISTORY,
} from "linked-models/search/search.urls";

export const useDeleteSearchHistoryRecordMutation = () => {
  const queryClient = useQueryClient();

  const deleteAllSearchHistory = async (recordId: string) => {
    const url = FRONTIFY_URL(
      URL_SEARCH,
      URL_HISTORY + URL_SINGLE_HISTORY(recordId)
    );
    return await apiDelete(url).then((res) => res.data);
  };

  return useMutation(deleteAllSearchHistory, {
    onSuccess: (_, recordId) => {
      queryClient.setQueryData(
        [URL_SEARCH, URL_HISTORY],
        (prev?: ISearchHistoryAttached[]) => {
          if (!prev) return [];
          return prev.filter((record) => record.id !== recordId);
        }
      );
    },
  });
};
