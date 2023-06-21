import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  IExtendedTodoListDto,
  ITodoListWithMembersDto,
} from "linked-models/todoList/todoList.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useCreateTodoListMutation = () => {
  const queryClient = useQueryClient();
  const url = FRONTIFY_URL(URL_TODO_LISTS);

  const createTodoList = async (data: ITodoList) => {
    return apiPost<ITodoList, ITodoListWithMembersDto>(url, data).then(
      (res) => res.data
    );
  };

  return useMutation(createTodoList, {
    onSuccess: (createdTodoList) => {
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          const todoListWithTasks = {
            ...createdTodoList,
            tasks: [],
          };
          return prev ? [...prev, todoListWithTasks] : [todoListWithTasks];
        }
      );
    },
  });
};
