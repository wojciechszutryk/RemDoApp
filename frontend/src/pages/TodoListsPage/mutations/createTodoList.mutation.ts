import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  IExtendedTodoListDto,
  ITodoListWithMembersDto,
} from "linked-models/todoList/todoList.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  PARAM_WITH_TASKS,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useMutation, useQueryClient } from "react-query";

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
      const queryKey = [URL_TODO_LISTS, PARAM_WITH_TASKS];
      queryClient.setQueryData(
        queryKey,
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
