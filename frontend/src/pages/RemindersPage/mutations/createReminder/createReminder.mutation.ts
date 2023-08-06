import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  ICreateReminder,
  ICreateReminderDTO,
} from "linked-models/reminder/reminder.dto";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { URL_REMINDERS } from "linked-models/reminder/reminder.urls";
import { stringifyTaskDateFields } from "linked-models/task/task.dto";
import useUpdateQueriesAfterCreatingReminder from "./useUpdateQueriesAfterCreatingReminder";

export const useCreateReminderMutation = () => {
  const updateQueriesAfterCreatingReminder =
    useUpdateQueriesAfterCreatingReminder();

  const createReminder = async (data: ICreateReminder) => {
    const url = FRONTIFY_URL(URL_REMINDERS);
    return apiPost<ICreateReminderDTO, IReminderAttached>(
      url,
      stringifyTaskDateFields(data)
    ).then((res) => res.data);
  };

  return useMutation(createReminder, {
    onSuccess: updateQueriesAfterCreatingReminder,
  });
};
