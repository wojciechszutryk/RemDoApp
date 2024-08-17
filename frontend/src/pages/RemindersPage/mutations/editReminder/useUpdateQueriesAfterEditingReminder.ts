import { useQueryClient } from "@tanstack/react-query";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { URL_REMINDERS } from "linked-models/reminder/reminder.urls";
import { IRemindersQueryData } from "pages/RemindersPage/helpers/models";
import { useCallback } from "react";

const useUpdateQueriesAfterEditingReminder = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (updatedReminder: IReminderAttached) => {
      if (updatedReminder.recurrance) {
        queryClient.invalidateQueries({
          queryKey: [URL_REMINDERS],
        });
        return;
      }

      // update reminder query for month when edited reminder is supposed to start
      queryClient.setQueriesData(
        [URL_REMINDERS],
        (prev?: IRemindersQueryData): IRemindersQueryData => {
          if (!prev) return new Map();

          const newData = new Map(prev.entries());

          const keysToUpdate = Array.from(newData.keys()).filter((key) =>
            key.includes(updatedReminder.taskId)
          );

          keysToUpdate.forEach((key) => {
            const reminder = newData.get(key);

            if (reminder) {
              newData.set(key, updatedReminder);
            }
          });
          // newData.set(updatedReminder.taskId, updatedReminder);
          return newData;
        }
      );
    },
    [queryClient]
  );
};

export default useUpdateQueriesAfterEditingReminder;
