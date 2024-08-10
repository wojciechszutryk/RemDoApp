import { useQueryClient } from "@tanstack/react-query";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { URL_REMINDERS } from "linked-models/reminder/reminder.urls";
import { IRemindersQueryData } from "pages/RemindersPage/helpers/models";
import { useCallback } from "react";

const useUpdateQueriesAfterCreatingReminder = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (createdReminder: IReminderAttached) => {
      // update reminder query for month when created reminder is supposed to start
      queryClient.setQueriesData(
        [URL_REMINDERS],
        (prev?: IRemindersQueryData): IRemindersQueryData => {
          if (!prev) return new Map();

          const newData = new Map(prev.entries());
          newData.set(createdReminder.taskId, createdReminder);
          return newData;
        }
      );
    },
    [queryClient]
  );
};

export default useUpdateQueriesAfterCreatingReminder;
