import { useMutation } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  IEditReminder,
  IEditReminderDTO,
} from "linked-models/reminder/reminder.dto";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import {
  URL_REMINDER,
  URL_REMINDERS,
} from "linked-models/reminder/reminder.urls";
import { stringifyTaskDateFields } from "linked-models/task/task.dto";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import useUpdateQueriesAfterEditingReminder from "./useUpdateQueriesAfterEditingReminder";

export const useEditReminderMutation = () => {
  const updateQueriesAfterEditingReminder =
    useUpdateQueriesAfterEditingReminder();

  const editReminderInTodoList = async ({
    todoListId,
    taskId,
    data,
  }: {
    todoListId: string;
    taskId: string;
    data: IEditReminder;
  }) => {
    return apiPut<IEditReminderDTO, IReminderAttached>(
      FRONTIFY_URL(
        URL_TODO_LISTS +
          URL_TODO_LIST(todoListId) +
          URL_REMINDERS +
          URL_REMINDER(taskId)
      ),
      stringifyTaskDateFields(data)
    ).then((res) => res.data);
  };

  return useMutation(editReminderInTodoList, {
    onSuccess: updateQueriesAfterEditingReminder,
  });
};
