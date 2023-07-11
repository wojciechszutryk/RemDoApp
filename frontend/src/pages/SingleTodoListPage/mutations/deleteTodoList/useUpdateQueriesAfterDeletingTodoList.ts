import { useQueryClient } from "@tanstack/react-query";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";

const useUpdateQueriesAfterDeletingTodoList = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (deletedTodoList: ITodoListAttached) => {
      // update all todo lists query data on todolists page
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          return (
            prev?.filter((td) => {
              return td.id !== deletedTodoList.id;
            }) || []
          );
        }
      );
    },
    [queryClient]
  );
};

export default useUpdateQueriesAfterDeletingTodoList;
