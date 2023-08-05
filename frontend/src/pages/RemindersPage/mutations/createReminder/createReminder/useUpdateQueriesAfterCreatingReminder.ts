import { useQueryClient } from "@tanstack/react-query";
import { IReminderDTO } from "linked-models/reminder/reminder.dto";
import { getRemindersQueryKey } from "pages/RemindersPage/helpers/getRemindersQueryKey";
import { IRemindersQueryData } from "pages/RemindersPage/helpers/models";
import { useCallback } from "react";

const useUpdateQueriesAfterCreatingReminder = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (createdReminder: IReminderDTO) => {
      // update reminder queriy for month when created reminder is supposed to start
      queryClient.setQueryData(
        getRemindersQueryKey(createdReminder.whenShouldBeStarted),
        (prev?: IRemindersQueryData): IRemindersQueryData => {
          if (!prev) return new Map();
          return new Map(...prev, [createdReminder.id, createdReminder]);
        }
      );
    },
    [queryClient]
  );
};

export default useUpdateQueriesAfterCreatingReminder;
