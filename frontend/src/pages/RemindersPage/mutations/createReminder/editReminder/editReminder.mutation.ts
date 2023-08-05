import { useMutation } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { mapIReminderToIReminderDTO } from "linked-models/reminder/reminder.dto";
import { IReminder, IReminderAttached } from "linked-models/reminder/reminder.model";
import { URL_TODO_LIST_TASK } from "linked-models/reminder/reminder.urls";
import useUpdateQueriesAfterEditingReminder from "./useUpdateQueriesAfterEditingReminder";

//TODO: FINISH
export const useEditReminderInTodoListMutation = () => {
  const updateQueriesAfterEditingReminder = useUpdateQueriesAfterEditingReminder();

  const editReminderInTodoList = async ({
    todoListId,
    reminderId,
    data,
  }: {
    todoListId: string;
    reminderId: string;
    data: Partial<IReminder>;
  }) => {
    return apiPut<Partial<IReminder>, IReminderAttached>(
      FRONTIFY_URL(URL_TODO_LIST_TASK(todoListId, reminderId)),
      mapIReminderToIReminderDTO(data)
    ).then((res) => res.data);
  };

  return useMutation(editReminderInTodoList, {
    onSuccess: updateQueriesAfterEditingReminder,
  });
};
