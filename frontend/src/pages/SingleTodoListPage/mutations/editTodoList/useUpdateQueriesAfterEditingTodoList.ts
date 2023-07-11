import { useQueryClient } from "@tanstack/react-query";
import {
  IExtendedTodoListDto,
  ITodoListWithMembersDto,
} from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

const useUpdateQueriesAfterEditingTodoList = () => {
  const queryClient = useQueryClient();
  const { todoListId: todoListIdParam } = useParams();

  return useCallback(
    (updatedTodoList: ITodoListWithMembersDto) => {
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
    [queryClient, todoListIdParam]
  );
};

export default useUpdateQueriesAfterEditingTodoList;
