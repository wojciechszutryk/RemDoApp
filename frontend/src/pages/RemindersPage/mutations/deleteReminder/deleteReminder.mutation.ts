import { useMutation } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { URL_REMINDERS } from "linked-models/reminder/reminder.urls";
import { URL_TASK } from "linked-models/task/task.urls";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { stripRecurranceId } from "pages/RemindersPage/helpers/recurranceIdConverters";
import useUpdateQueriesAfterDeletingReminder from "./useUpdateQueriesAfterDeletingReminder";

export const useDeleteReminderMutation = () => {
  const updateQueriesAfterDeletingReminder =
    useUpdateQueriesAfterDeletingReminder();

  const deleteReminder = async ({
    todoListId,
    taskId,
  }: {
    todoListId: string;
    taskId?: string;
  }) => {
    const url = FRONTIFY_URL(
      URL_TODO_LISTS +
        URL_TODO_LIST(todoListId) +
        URL_REMINDERS +
        URL_TASK(stripRecurranceId(taskId))
    );
    return apiDelete<IReminderAttached>(url).then((res) => res.data);
  };

  return useMutation(deleteReminder, {
    onSuccess: updateQueriesAfterDeletingReminder,
  });
};
