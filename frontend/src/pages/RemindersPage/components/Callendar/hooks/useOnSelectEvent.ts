import { useDialogs } from "framework/dialogs";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { useCallback } from "react";

const useOnSelectEvent = () => {
  const {
    dialogsActions: { updateReminderDialog },
  } = useDialogs();
  return useCallback(
    (event: IReminderAttached) => {
      updateReminderDialog({
        visible: true,
        editReminderData: { ...event },
      });
    },
    [updateReminderDialog]
  );
};

export default useOnSelectEvent;
