import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { ITaskAttached } from "./task.model";

/**
 * Task with creator
 */
export interface IExtendedTaskDto extends ITaskAttached {
  creator: IUserPublicDataDTO;
}
