import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { AccessHashesForTodoListDTO } from "linked-models/accessLink/accessLink.dto";
import { URL_ACCESS_LINK } from "linked-models/accessLink/accessLink.url";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useGetTodoListAccessLinksQuery = (
  todoListId: string,
  options?: Omit<UseQueryOptions<AccessHashesForTodoListDTO>, "queryFn">
) => {
  const getAccessLink = async () => {
    return await apiGet<AccessHashesForTodoListDTO>(
      FRONTIFY_URL(URL_ACCESS_LINK, URL_TODO_LISTS + URL_TODO_LIST(todoListId))
    ).then((res) => res.data);
  };

  return useQuery(
    [URL_ACCESS_LINK, URL_TODO_LISTS, URL_TODO_LIST(todoListId)],
    getAccessLink,
    options
  );
};
