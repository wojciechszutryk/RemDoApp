import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { ITask, ITaskAttached } from "../task/task.model";

export interface IReminderAttached
  extends Omit<
      ITaskAttached,
      "whenShouldBeStarted" | "whenShouldBeFinished" | "id" | "creatorId"
    >,
    Omit<ITodoListWithMembersDto, "id" | "creator"> {
  whenShouldBeStarted: Date;
  whenShouldBeFinished: Date;
  creator?: IUserPublicDataDTO;
  todoListId: string;
  taskId: string;
}

export interface ICreateReminderDTO
  extends Omit<ITask, "whenShouldBeStarted" | "whenShouldBeFinished">,
    ITodoList {
  whenShouldBeStarted: Date;
  whenShouldBeFinished: Date;
}

export interface IEditReminderReqDTO
  extends Partial<
    Omit<ICreateReminderDTO, "assignedOwners" | "assignedUsers">
  > {
  assignedOwners?: string[];
  assignedUsers?: string[];
  todoListId: string;
  taskId: string;
}
