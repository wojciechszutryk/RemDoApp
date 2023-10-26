import { useDialogs } from "framework/dialogs";
import { useCallback } from "react";
import { SlotInfo } from "react-big-calendar";

const useOnSelectSlot = () => {
  const {
    dialogsActions: { updateReminderDialog },
  } = useDialogs();
  return useCallback(
    (slotInfo: SlotInfo) => {
      updateReminderDialog({
        visible: true,
        defaultData: {
          startDate: slotInfo.start,
          finishDate: slotInfo.end,
        },
      });
    },
    [updateReminderDialog]
  );
};

export default useOnSelectSlot;
