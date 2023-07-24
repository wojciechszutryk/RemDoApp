import { Button } from "@mui/material";
import Dialog from "atomicComponents/atoms/Dialog";
import { useDialogs } from "framework/dialogs";
import useAppDialogState from "framework/dialogs/hooks/useAppDialogState";
import { initialReminderListDialog } from "framework/dialogs/models/initialState.const";
import { memo } from "react";

const ReminderListDialog = (): JSX.Element => {
  const {
    dialogsState: {
      reminderListDialog: { visible },
    },
    dialogsActions: { updateReminderListDialog },
  } = useDialogs();

  const [open, onClose] = useAppDialogState(visible, () =>
    updateReminderListDialog(initialReminderListDialog)
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <Button onClick={onClose}></Button>
    </Dialog>
  );
};

export default memo(ReminderListDialog);
