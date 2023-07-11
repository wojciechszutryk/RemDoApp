import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import {
  PARAM_WITH_MEMBERS,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useGetUserTodoListsQuery = <T extends boolean>(
  withMembers?: T
): UseQueryResult<
  T extends true ? ITodoListWithMembersDto[] : ITodoListAttached[],
  string
> => {
  const getTodoLists = async () => {
    return await apiGet<ITodoListAttached[]>(
      FRONTIFY_URL(
        URL_TODO_LISTS,
        "",
        withMembers
          ? {
              [PARAM_WITH_MEMBERS]: "true",
            }
          : undefined
      )
    ).then((res) => res.data);
  };

  return useQuery(
    [URL_TODO_LISTS, withMembers ? PARAM_WITH_MEMBERS : ""],
    getTodoLists
  );
};
