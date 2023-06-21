import { useMutation } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import useUpdateQueriesAfterDeletingTask from "./useUpdateQueriesAfterDeletingTask";

export const useDeleteTaskMutation = () => {
  const updateQueriesAfterDeletingTask = useUpdateQueriesAfterDeletingTask();

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
    onSuccess: updateQueriesAfterDeletingTask,
  });
};
