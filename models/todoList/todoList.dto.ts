import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { ITodoListAttached } from "./todoList.model";

export interface ITodoListWithMembersDto
  extends Omit<
    ITodoListAttached,
    "assignedOwners" | "assignedUsers" | "creatorId"
  > {
  assignedOwners: IUserPublicDataDTO[];
  assignedUsers: IUserPublicDataDTO[];
  creator: IUserPublicDataDTO;
}

/**
 * TodoList with:
 * - all tasks
 * - all members
 * - order (value defined by every user separately)
 */
export interface IExtendedTodoListDto extends ITodoListWithMembersDto {
  order?: number;
  tasks: IExtendedTaskDto[];
}
