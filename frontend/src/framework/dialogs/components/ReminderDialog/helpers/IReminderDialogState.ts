import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";

export interface IReminderDialogState
  extends Omit<IReminderAttached, "assignedUsers" | "assignedOwners"> {
  assignedUsers: IUserPublicDataDTO[];
  assignedOwners: IUserPublicDataDTO[];
}
