import { useQueryClient } from "@tanstack/react-query";
import { ITaskAttached } from "linked-models/task/task.model";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

const useUpdateQueriesAfterEditingTask = () => {
  const queryClient = useQueryClient();
  const { todoListId: todoListIdParam } = useParams();

  return useCallback(
    (updatedTask: ITaskAttached, { todoListId }: { todoListId: string }) => {
      // update single todo list query data only on singletodolist page
      if (todoListIdParam) {
        queryClient.setQueryData(
          [URL_TODO_LISTS, URL_TODO_LIST(todoListIdParam), PARAM_EXTENDED],
          (prev?: IExtendedTodoListDto): IExtendedTodoListDto => {
            if (!prev) return {} as IExtendedTodoListDto;
            const todoListWithUpdatedTask = {
              ...prev,
              tasks: prev.tasks.map((t) =>
                t.id === updatedTask.id ? { ...t, ...updatedTask } : t
              ),
            };
            return todoListWithUpdatedTask;
          }
        );
      }

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
    [queryClient, todoListIdParam]
  );
};

export default useUpdateQueriesAfterEditingTask;
