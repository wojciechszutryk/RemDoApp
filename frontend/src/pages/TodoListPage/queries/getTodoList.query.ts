import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useQuery, UseQueryOptions } from "react-query";

export const useGetTodoListQuery = (
  todoListId: string | undefined,
  options?: Omit<UseQueryOptions<IExtendedTodoListDto>, "queryFn">
) => {
  const getTodoList = async () => {
    return await apiGet<IExtendedTodoListDto>(
      FRONTIFY_URL(
        URL_TODO_LISTS,
        URL_TODO_LIST(todoListId) + "?withTasks=true"
      )
    ).then((res) => res.data);
  };

  return useQuery(
    [URL_TODO_LISTS, URL_TODO_LIST(todoListId)],
    getTodoList,
    options
  );
};
