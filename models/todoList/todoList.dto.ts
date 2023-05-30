import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { ITodoListAttached } from "./todoList.model";

export interface ITodoListWithMembersDto
  extends Omit<ITodoListAttached, "assignedOwners" | "assignedUsers"> {
  assignedOwners: IUserPublicDataDTO[];
  assignedUsers: IUserPublicDataDTO[];
}

/**
 * TodoList with all tasks and members
 */
export interface IExtendedTodoListDto extends ITodoListWithMembersDto {
  tasks: IExtendedTaskDto[];
}
