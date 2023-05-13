import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import {
  PARAM_WITH_TASKS,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useDeleteTodoListMutation = () => {
  const queryClient = useQueryClient();

  const deleteTodoList = async (todoListId: string) => {
    const url = FRONTIFY_URL(URL_TODO_LISTS, URL_TODO_LIST(todoListId));
    return apiDelete<ITodoListAttached>(url).then((res) => res.data);
  };

  return useMutation(deleteTodoList, {
    onSuccess: (deletedTodoList) => {
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_WITH_TASKS],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          return (
            prev?.filter((td) => {
              return td.id !== deletedTodoList.id;
            }) || []
          );
        }
      );
    },
  });
};
