import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useParams } from "react-router-dom";

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  const { todoListId: todoListIdParam } = useParams();

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
      // update single todo list query data only on singletodolist page
      if (todoListIdParam) {
        queryClient.setQueryData(
          [URL_TODO_LISTS, URL_TODO_LIST(todoListIdParam), PARAM_EXTENDED],
          (prev?: IExtendedTodoListDto): IExtendedTodoListDto => {
            if (!prev) return {} as IExtendedTodoListDto;
            const todoListWithFilteredTasks = {
              ...prev,
              tasks: prev.tasks.filter((task) => task.id !== deletedTask.id),
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
              (task) => task.id !== deletedTask.id
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
  });
};
