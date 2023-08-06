import { useMutation } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITaskDTO, stringifyTaskDateFields } from "linked-models/task/task.dto";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASK } from "linked-models/task/task.urls";
import useUpdateQueriesAfterEditingTask from "./useUpdateQueriesAfterEditingTask";

export const useEditTaskInTodoListMutation = () => {
  const updateQueriesAfterEditingTask = useUpdateQueriesAfterEditingTask();

  const editTaskInTodoList = async ({
    todoListId,
    taskId,
    data,
  }: {
    todoListId: string;
    taskId: string;
    data: Partial<ITask>;
  }) => {
    return apiPut<Partial<ITaskDTO>, ITaskAttached>(
      FRONTIFY_URL(URL_TODO_LIST_TASK(todoListId, taskId)),
      stringifyTaskDateFields(data)
    ).then((res) => res.data);
  };

  return useMutation(editTaskInTodoList, {
    onSuccess: updateQueriesAfterEditingTask,
  });
};
