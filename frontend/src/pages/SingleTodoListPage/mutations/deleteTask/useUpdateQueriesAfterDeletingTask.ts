import { useQueryClient } from "@tanstack/react-query";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

const useUpdateQueriesAfterDeletingTask = () => {
  const queryClient = useQueryClient();
  const { todoListId: todoListIdParam } = useParams();

  return useCallback(
    (deletedTaskId: string) => {
      // update single todo list query data only on singletodolist page
      if (todoListIdParam) {
        queryClient.setQueryData(
          [URL_TODO_LISTS, URL_TODO_LIST(todoListIdParam), PARAM_EXTENDED],
          (prev?: IExtendedTodoListDto): IExtendedTodoListDto => {
            if (!prev) return {} as IExtendedTodoListDto;
            const todoListWithFilteredTasks = {
              ...prev,
              tasks: prev.tasks.filter((task) => task.id !== deletedTaskId),
            };
            return todoListWithFilteredTasks;
          }
        );
      }

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
    [queryClient, todoListIdParam]
  );
};

export default useUpdateQueriesAfterDeletingTask;
