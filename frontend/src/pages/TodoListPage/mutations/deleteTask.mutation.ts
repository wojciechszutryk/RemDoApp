import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_WITH_TASKS,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  const deleteTask = async ({
    todoListId,
    taskId,
  }: {
    taskId: string;
    todoListId?: string;
  }) => {
    const url = FRONTIFY_URL(URL_TODO_LIST_TASK(todoListId, taskId));
    return apiDelete<ITaskAttached>(url).then((res) => res.data);
  };

  return useMutation(deleteTask, {
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_WITH_TASKS],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          if (!prev) return [];
          const updatedTodoLists = prev.map((todoList) => {
            const updatedTasks = todoList.tasks.filter(
              (task) => task.id !== deletedTask.id
            );
            return {
              ...todoList,
              tasks: updatedTasks,
            };
          });
          return updatedTodoLists;
        }
      );
    },
  });
};
