import { ITaskAttached } from "linked-models/task/task.model";
import { IUserAttached } from "linked-models/user/user.model";
import { ITodoListAttached } from "./todoList.model";

export interface ITodoListWithMembersDto
  extends Omit<ITodoListAttached, "assignedOwners" | "assignedUsers"> {
  assignedOwners: IUserAttached[];
  assignedUsers: IUserAttached[];
}

/**
 * TodoList with all tasks and members
 */
export interface IExtendedTodoListDto extends ITodoListWithMembersDto {
  tasks: ITaskAttached[];
}
