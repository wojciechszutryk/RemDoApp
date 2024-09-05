import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { URL_HISTORY, URL_SEARCH } from "linked-models/search/search.urls";

export const useDeleteAllSearchHistoryMutation = () => {
  const url = FRONTIFY_URL(URL_SEARCH, URL_HISTORY);

  const queryClient = useQueryClient();

  const deleteAllSearchHistory = async () => await apiDelete<void>(url);

  return useMutation(deleteAllSearchHistory, {
    onSuccess: () => {
      queryClient.setQueryData([URL_SEARCH, URL_HISTORY], []);
    },
  });
};
