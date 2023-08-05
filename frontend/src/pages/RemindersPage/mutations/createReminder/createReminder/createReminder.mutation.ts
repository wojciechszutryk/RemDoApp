import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IReminderDTO } from "linked-models/reminder/reminder.dto";
import { URL_REMINDERS } from "linked-models/reminder/reminder.urls";
import { ITaskDTO, mapITaskToITaskDTO } from "linked-models/task/task.dto";
import { ITask } from "linked-models/task/task.model";
import useUpdateQueriesAfterCreatingReminder from "./useUpdateQueriesAfterCreatingReminder";

export const useCreateReminderMutation = () => {
  const updateQueriesAfterCreatingReminder =
    useUpdateQueriesAfterCreatingReminder();

  const createReminder = async (data: ITask) => {
    const url = FRONTIFY_URL(URL_REMINDERS);
    return apiPost<ITaskDTO, IReminderDTO>(url, mapITaskToITaskDTO(data)).then(
      (res) => res.data
    );
  };

  return useMutation(createReminder, {
    onSuccess: updateQueriesAfterCreatingReminder,
  });
};
