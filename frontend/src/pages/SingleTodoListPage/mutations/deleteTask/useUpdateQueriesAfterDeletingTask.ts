import { useQueryClient } from "@tanstack/react-query";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";

const useUpdateQueriesAfterDeletingTask = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (deletedTaskId: string) => {
      // update all todo lists query data on todolists page
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          if (!prev) return [];
          const updatedTodoLists = prev.map((todoList) => {
            const filteredTasks = todoList.tasks.filter(
              (task) => task.id !== deletedTaskId
            );
            return {
              ...todoList,
              tasks: filteredTasks,
            };
          });
          return updatedTodoLists;
        }
      );
    },
    [queryClient]
  );
};

export default useUpdateQueriesAfterDeletingTask;
