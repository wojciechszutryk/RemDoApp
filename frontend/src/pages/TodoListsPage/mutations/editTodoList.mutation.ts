import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  IExtendedTodoListDto,
  ITodoListWithMembersDto,
} from "linked-models/todoList/todoList.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useEditTodoListMutation = () => {
  const queryClient = useQueryClient();

  const editTodoList = async ({
    todoListId,
    data,
  }: {
    todoListId: string;
    data: Partial<ITodoList>;
  }) => {
    const url = FRONTIFY_URL(URL_TODO_LISTS, URL_TODO_LIST(todoListId));
    return apiPut<Partial<ITodoList>, ITodoListWithMembersDto>(url, data).then(
      (res) => res.data
    );
  };

  return useMutation(editTodoList, {
    onSuccess: (updatedTodoList) => {
      //update all todoLists query
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          return (
            prev?.map((td) => {
              if (td.id === updatedTodoList.id) {
                return { ...updatedTodoList, tasks: td.tasks };
              }

              return td;
            }) || []
          );
        }
      );
      //update single query data
      queryClient.setQueryData(
        [URL_TODO_LISTS, URL_TODO_LIST(updatedTodoList.id)],
        updatedTodoList
      );
    },
  });
};