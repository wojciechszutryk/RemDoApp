import { Button } from "@mui/material";
import Dialog from "atomicComponents/atoms/Dialog";
import { useDialogs } from "framework/dialogs";
import { initialReminderListDialog } from "framework/dialogs/models/initialState.const";
import { memo } from "react";

const ReminderListModal = (): JSX.Element => {
  const {
    dialogsState: {
      reminderListDialog: { visible, reminders },
    },
    dialogsActions: { updateReminderListDialog },
  } = useDialogs();

  return (
    <Dialog
      open={visible}
      onClose={() => updateReminderListDialog(initialReminderListDialog)}
    >
      <Button></Button>
    </Dialog>
  );
};

export default memo(ReminderListModal);
