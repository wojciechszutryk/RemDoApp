import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  IExtendedTodoListDto,
  ITodoListWithMembersDto,
} from "linked-models/todoList/todoList.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  PARAM_WITH_TASKS,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useMutation, useQueryClient } from "react-query";

export const useEditTodoListMutation = () => {
  const queryClient = useQueryClient();

  const editTodoList = async ({
    todoListId,
    data,
  }: {
    todoListId: string;
    data: ITodoList;
  }) => {
    const url = FRONTIFY_URL(URL_TODO_LISTS, URL_TODO_LIST(todoListId));
    return apiPut<ITodoList, ITodoListWithMembersDto>(url, data).then(
      (res) => res.data
    );
  };

  return useMutation(editTodoList, {
    onSuccess: (updatedTodoList) => {
      //update all todoLists query
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_WITH_TASKS],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          return (
            prev?.map((td) => {
              if (td.id === updatedTodoList.id) {
                return { ...td, ...updatedTodoList };
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
