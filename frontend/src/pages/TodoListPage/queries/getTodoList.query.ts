import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetTodoListQuery = (
  todoListId: string | undefined,
  options?: Omit<UseQueryOptions<ITodoListAttached>, "queryFn">
) => {
  const getTodoList = async () => {
    return await apiGet<ITodoListAttached>(
      FRONTIFY_URL(URL_TODO_LISTS, URL_TODO_LIST(todoListId))
    ).then((res) => res.data);
  };

  return useQuery(
    [URL_TODO_LISTS, URL_TODO_LIST(todoListId)],
    getTodoList,
    options
  );
};
