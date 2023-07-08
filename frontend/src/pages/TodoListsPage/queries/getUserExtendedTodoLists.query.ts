import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useGetUserExtendedTodoListsQuery = (
  options?: Omit<UseQueryOptions<IExtendedTodoListDto[]>, "queryFn">
) => {
  const url = FRONTIFY_URL(URL_TODO_LISTS, "", { [PARAM_EXTENDED]: "true" });

  const getTodoListsWithTasks = async () => {
    return await apiGet<IExtendedTodoListDto[]>(url).then((res) => res.data);
  };

  return useQuery(
    [URL_TODO_LISTS, PARAM_EXTENDED],
    getTodoListsWithTasks,
    options
  );
};
