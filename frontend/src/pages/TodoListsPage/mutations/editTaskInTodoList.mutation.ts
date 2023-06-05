import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { mapITaskToITaskDTO } from "linked-models/task/task.dto";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useEditTaskInTodoListMutation = () => {
  const queryClient = useQueryClient();

  const editTaskInTodoList = async ({
    todoListId,
    taskId,
    data,
  }: {
    todoListId: string;
    taskId: string;
    data: Partial<ITask>;
  }) => {
    const url = FRONTIFY_URL(URL_TODO_LIST_TASK(todoListId, taskId));
    return apiPut<Partial<ITask>, ITaskAttached>(
      url,
      mapITaskToITaskDTO(data)
    ).then((res) => res.data);
  };

  return useMutation(editTaskInTodoList, {
    onSuccess: (updatedTask, { todoListId }) => {
      //update all todoLists query
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
      //update single todoList query data
      queryClient.setQueryData<IExtendedTodoListDto | undefined>(
        [URL_TODO_LISTS, URL_TODO_LIST(todoListId)],
        (prev?: IExtendedTodoListDto) => {
          if (!prev) return undefined;
          const todoListWithUpdatedTask = {
            ...prev,
            tasks: prev.tasks.map((t) =>
              t.id === updatedTask.id ? { ...t, ...updatedTask } : t
            ),
          };
          return todoListWithUpdatedTask;
        }
      );
    },
  });
};
