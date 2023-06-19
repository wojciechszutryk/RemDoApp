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
import { useParams } from "react-router-dom";

export const useEditTodoListMutation = () => {
  const queryClient = useQueryClient();
  const { todoListId: todoListIdParam } = useParams();

  const editTodoList = async ({
    todoListId,
    data,
  }: {
    todoListId: string;
    data: Partial<ITodoList>;
  }) => {
    return apiPut<Partial<ITodoList>, ITodoListWithMembersDto>(
      FRONTIFY_URL(URL_TODO_LISTS, URL_TODO_LIST(todoListId)),
      data
    ).then((res) => res.data);
  };

  return useMutation(editTodoList, {
    onSuccess: (updatedTodoList) => {
      // update single todo list query data only on singletodolist page
      if (todoListIdParam) {
        queryClient.setQueryData(
          [URL_TODO_LISTS, URL_TODO_LIST(todoListIdParam), PARAM_EXTENDED],
          (prev?: IExtendedTodoListDto): IExtendedTodoListDto => {
            if (!prev) return {} as IExtendedTodoListDto;
            return { ...updatedTodoList, tasks: prev.tasks };
          }
        );
      }

      // update all todo lists query data on todolists page
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
    },
  });
};
