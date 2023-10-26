import { useMutation } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IReminder, IReminderDTO } from "linked-models/reminder/reminder.dto";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { URL_REMINDERS } from "linked-models/reminder/reminder.urls";
import { stringifyTaskDateFields } from "linked-models/task/task.dto";
import { URL_TASK } from "linked-models/task/task.urls";
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
    data: Partial<IReminder>;
  }) => {
    return apiPut<Partial<IReminderDTO>, IReminderAttached>(
      FRONTIFY_URL(
        URL_TODO_LISTS +
          URL_TODO_LIST(todoListId) +
          URL_REMINDERS +
          URL_TASK(taskId)
      ),
      stringifyTaskDateFields(data)
    ).then((res) => res.data);
  };

  return useMutation(editReminderInTodoList, {
    onSuccess: updateQueriesAfterEditingReminder,
  });
};
