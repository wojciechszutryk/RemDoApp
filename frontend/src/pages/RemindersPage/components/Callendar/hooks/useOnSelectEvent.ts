import { useDialogs } from "framework/dialogs";
import { ICallendarEvent } from "pages/RemindersPage/helpers/models";
import { useCallback } from "react";

const useOnSelectEvent = () => {
  const {
    dialogsActions: { updateReminderDialog },
  } = useDialogs();
  return useCallback(
    (event: ICallendarEvent) => {
      updateReminderDialog({
        visible: true,
        editReminderData: { ...event },
      });
    },
    [updateReminderDialog]
  );
};

export default useOnSelectEvent;
