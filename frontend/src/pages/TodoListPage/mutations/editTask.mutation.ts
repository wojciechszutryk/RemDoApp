import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_WITH_TASKS,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useMutation, useQueryClient } from "react-query";

export const useEditTaskMutation = () => {
  const queryClient = useQueryClient();

  const editTask = async ({
    taskId,
    data,
  }: {
    taskId: string;
    data: Partial<ITask>;
  }) => {
    const url = FRONTIFY_URL(URL_TODO_LIST_TASK(taskId));
    return apiPut<Partial<ITask>, ITaskAttached>(url, data).then(
      (res) => res.data
    );
  };

  return useMutation(editTask, {
    onSuccess: (updatedTask) => {
      //update all todoLists query
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_WITH_TASKS],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          return (
            prev?.map((td) => {
              if (td.id === updatedTodoList.id) {
                return { ...td, ...updatedTodoList };
              }

              return td;
            }) || []
          );
        }
      );
      //update single query data
      queryClient.setQueryData(
        [URL_TODO_LISTS, URL_TODO_LIST(updatedTodoList.id)],
        updatedTodoList
      );
    },
  });
};
