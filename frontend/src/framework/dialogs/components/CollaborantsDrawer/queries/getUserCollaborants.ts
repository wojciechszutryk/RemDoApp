import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";

export const useGetUserCollaborantsQuery = (
  options?: Omit<UseQueryOptions<IExtendedTodoListDto>, "queryFn">
) => {
  const getUserCollaborants = async () => {
    return await apiGet<IUserPublicDataDTO>(
      FRONTIFY_URL(
        URL_TODO_LISTS,
        URL_TODO_LIST(todoListId) + `?${PARAM_EXTENDED}=true`
      )
    ).then((res) => res.data);
  };

  return useQuery(
    [URL_TODO_LISTS, URL_TODO_LIST(todoListId), PARAM_EXTENDED],
    getUserCollaborants,
    options
  );
};
