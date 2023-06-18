import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useGetExtendedTodoListQuery = (
  todoListId?: string,
  options?: Omit<UseQueryOptions<IExtendedTodoListDto>, "queryFn">
) => {
  const getExtendedTodoList = async () => {
    return await apiGet<IExtendedTodoListDto>(
      FRONTIFY_URL(
        URL_TODO_LISTS,
        URL_TODO_LIST(todoListId) + `?${PARAM_EXTENDED}=true`
      )
    ).then((res) => res.data);
  };

  return useQuery(
    [URL_TODO_LISTS, URL_TODO_LIST(todoListId), PARAM_EXTENDED],
    getExtendedTodoList,
    options
  );
};
