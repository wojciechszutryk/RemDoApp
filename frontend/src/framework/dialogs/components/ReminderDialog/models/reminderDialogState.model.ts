import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { IReminderDialog } from "./reminderDialog.model";

export interface IReminderDialogState
  extends Omit<IReminderDialog, "assignedUsers" | "assignedOwners"> {
  assignedUsers: IUserPublicDataDTO[];
  assignedOwners: IUserPublicDataDTO[];
}
