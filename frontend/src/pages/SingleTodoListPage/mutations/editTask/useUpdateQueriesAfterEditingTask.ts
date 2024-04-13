import { useQueryClient } from "@tanstack/react-query";
import { ITaskAttached } from "linked-models/task/task.model";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";

const useUpdateQueriesAfterEditingTask = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (updatedTask: ITaskAttached, { todoListId }: { todoListId: string }) => {
      // update all todo lists query data on todolists page
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          if (!prev) return [];
          const todoList = prev.find((td) => td.id === todoListId);
          if (!todoList) return prev;
          const todoListWithUpdatedTask = {
            ...todoList,
            tasks: todoList.tasks.map((t) =>
              t.id === updatedTask.id ? { ...t, ...updatedTask } : t
            ),
          };
          return prev.map((td) =>
            td.id === todoListWithUpdatedTask.id ? todoListWithUpdatedTask : td
          );
        }
      );
    },
    [queryClient]
  );
};

export default useUpdateQueriesAfterEditingTask;
