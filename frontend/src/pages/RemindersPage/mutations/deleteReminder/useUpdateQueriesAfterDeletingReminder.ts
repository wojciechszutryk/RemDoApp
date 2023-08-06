import { useQueryClient } from "@tanstack/react-query";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { getRemindersQueryKey } from "pages/RemindersPage/helpers/getRemindersQueryKey";
import { IRemindersQueryData } from "pages/RemindersPage/helpers/models";
import { useCallback } from "react";

const useUpdateQueriesAfterDeletingReminder = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (updatedReminder: IReminderAttached) => {
      // update reminder query for month when deleted reminder is supposed to start
      queryClient.setQueryData(
        getRemindersQueryKey(updatedReminder.whenShouldBeStarted),
        (prev?: IRemindersQueryData): IRemindersQueryData => {
          if (!prev) return new Map();

          const newData = new Map(prev.entries());
          newData.delete(updatedReminder.taskId);
          return newData;
        }
      );
    },
    [queryClient]
  );
};

export default useUpdateQueriesAfterDeletingReminder;
