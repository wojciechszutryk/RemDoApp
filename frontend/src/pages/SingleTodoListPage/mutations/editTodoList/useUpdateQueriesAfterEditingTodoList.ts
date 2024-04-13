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

const useUpdateQueriesAfterEditingTodoList = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (updatedTodoList: ITodoListWithMembersDto) => {
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
    [queryClient]
  );
};

export default useUpdateQueriesAfterEditingTodoList;
