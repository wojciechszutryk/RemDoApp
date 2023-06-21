import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITaskDTO, mapITaskToITaskDTO } from "linked-models/task/task.dto";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASKS } from "linked-models/task/task.urls";
import useUpdateQueriesAfterCreatingTask from "./useUpdateQueriesAfterCreatingTask";

interface ICreateTaskInTodoListMutation {
  todoListId: string;
  data: ITask;
}

export const useCreateTaskMutation = () => {
  const updateQueriesAfterCreatingTask = useUpdateQueriesAfterCreatingTask();

  const createTaskInTodoList = async (todoListId: string, data: ITask) => {
    const url = FRONTIFY_URL(URL_TODO_LIST_TASKS(todoListId));
    return apiPost<ITaskDTO, ITaskAttached>(url, mapITaskToITaskDTO(data)).then(
      (res) => res.data
    );
  };

  return useMutation(
    ({ todoListId, data }: ICreateTaskInTodoListMutation) =>
      createTaskInTodoList(todoListId, data),
    {
      onSuccess: updateQueriesAfterCreatingTask,
    }
  );
};
