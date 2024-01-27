import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { AccessHashesForTodoListDTO } from "linked-models/accessLink/accessLink.dto";
import {
  URL_ACCESS_LINK,
  URL_ROLE,
  URL_ROLES,
} from "linked-models/accessLink/accessLink.url";
import { TodoListRole } from "linked-models/permissions/todoList.permissions.enum";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useDeleteAccessLinkInTodoListMutation = (todoListId: string) => {
  const queryClient = useQueryClient();

  const deleteAccessLinkInTodoList = async (role: TodoListRole) => {
    const url = FRONTIFY_URL(
      URL_ACCESS_LINK,
      `${URL_TODO_LISTS}${URL_TODO_LIST(todoListId)}${URL_ROLES}${URL_ROLE(
        role
      )}`
    );
    return apiDelete(url).then((res) => res.data);
  };

  return useMutation(deleteAccessLinkInTodoList, {
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [URL_ACCESS_LINK, URL_TODO_LISTS, URL_TODO_LIST(todoListId)],
        (prev: AccessHashesForTodoListDTO | undefined) => {
          if (prev) {
            return {
              ...prev,
              [variables]: undefined,
            };
          }
        }
      );
    },
  });
};
