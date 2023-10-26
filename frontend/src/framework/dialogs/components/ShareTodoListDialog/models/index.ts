import { IUserPublicDataDTO } from "linked-models/user/user.dto";

export interface ShareTodoListDialogValues {
  assignedUsers: IUserPublicDataDTO[];
  assignedOwners: IUserPublicDataDTO[];
}
