import { useMutation } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { URL_TODO_LIST_TASK } from "linked-models/reminder/reminder.urls";
import useUpdateQueriesAfterDeletingReminder from "./useUpdateQueriesAfterDeletingReminder";

//TODO: FINISH
export const useDeleteReminderMutation = () => {
  const updateQueriesAfterDeletingReminder = useUpdateQueriesAfterDeletingReminder();

  const deleteReminder = async ({
    todoListId,
    reminderId,
  }: {
    reminderId: string;
    todoListId?: string;
  }) => {
    const url = FRONTIFY_URL(URL_TODO_LIST_TASK(todoListId, reminderId));
    return apiDelete<IReminderAttached>(url).then((res) => res.data);
  };

  return useMutation(deleteReminder, {
    onSuccess: updateQueriesAfterDeletingReminder,
  });
};
