import { ITaskAttached } from "../task/task.model";
import { ITodoListWithMembersDto } from "../todoList/todoList.dto";
import { IUserPublicDataDTO } from "../user/user.dto";

/**
 * sum of ITaskAttached (with required startDate and finishDate) and ITodoListWithMembersDto with additional todoListId, taskId and creator fields
 */
export interface IReminderAttached
  extends Omit<ITaskAttached, "startDate" | "finishDate" | "id" | "creatorId">,
    Omit<ITodoListWithMembersDto, "id" | "creator"> {
  startDate: Date;
  finishDate: Date;
  creator?: IUserPublicDataDTO;
  todoListId: string;
  taskId: string;
}
