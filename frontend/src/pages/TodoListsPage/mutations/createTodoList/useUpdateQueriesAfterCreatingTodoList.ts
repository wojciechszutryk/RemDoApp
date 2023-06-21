import { useQueryClient } from "@tanstack/react-query";
import {
  IExtendedTodoListDto,
  ITodoListWithMembersDto,
} from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";

const useUpdateQueriesAfterCreatingTodoList = () => {
  const queryClient = useQueryClient();
  return useCallback(
    (createdTodoList: ITodoListWithMembersDto) =>
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          const todoListWithTasks = {
            ...createdTodoList,
            tasks: [],
          };
          return prev ? [...prev, todoListWithTasks] : [todoListWithTasks];
        }
      ),
    [queryClient]
  );
};

export default useUpdateQueriesAfterCreatingTodoList;
