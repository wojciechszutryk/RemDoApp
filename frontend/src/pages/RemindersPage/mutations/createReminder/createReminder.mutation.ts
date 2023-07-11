import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { URL_REMINDERS } from "linked-models/reminder/reminder.urls";
import { ITaskDTO, mapITaskToITaskDTO } from "linked-models/task/task.dto";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import useUpdateQueriesAfterCreatingTask from "../../../SingleTodoListPage/mutations/createTask/useUpdateQueriesAfterCreatingTask";

export const useCreateReminderMutation = () => {
  const updateQueriesAfterCreatingTask =
    useUpdateQueriesAfterCreatingTask(true);

  const createTaskInTodoList = async (data: ITask) => {
    const url = FRONTIFY_URL(URL_REMINDERS);
    return apiPost<ITaskDTO, ITaskAttached>(url, mapITaskToITaskDTO(data)).then(
      (res) => res.data
    );
  };

  return useMutation(createTaskInTodoList, {
    onSuccess: updateQueriesAfterCreatingTask,
  });
};
