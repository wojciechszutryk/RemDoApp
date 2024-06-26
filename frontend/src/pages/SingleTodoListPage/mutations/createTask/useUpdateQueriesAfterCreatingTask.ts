import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { ITaskAttached } from "linked-models/task/task.model";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";

const useUpdateQueriesAfterCreatingTask = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();

  return useCallback(
    (createdTask: ITaskAttached) => {
      const mappedTask = {
        ...createdTask,
        creator: currentUser!,
      };

      // update all todo lists query data
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          if (!prev) return [];
          const todoList = prev.find((td) => td.id === createdTask.todoListId);
          if (!todoList) return prev;
          const todoListWithNewTask = {
            ...todoList,
            tasks: [...todoList.tasks, mappedTask],
          };
          return prev.map((td) =>
            td.id === todoListWithNewTask.id ? todoListWithNewTask : td
          );
        }
      );
    },
    [currentUser, queryClient]
  );
};

export default useUpdateQueriesAfterCreatingTask;
