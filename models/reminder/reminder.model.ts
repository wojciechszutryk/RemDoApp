import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { ITaskAttached } from "../task/task.model";
import { ITodoListWithMembersDto } from "../todoList/todoList.dto";
import { IUserPublicDataDTO } from "../user/user.dto";

export interface ISimplifiedReminder
  extends Omit<ITaskAttached, "id">,
    Omit<ITodoListAttached, "id"> {
  todoListId: string;
  taskId: string;
}

/**
 * sum of ITaskAttached (with required startDate and finishDate and optional text (it's reminder's description)) and ITodoListWithMembersDto with additional todoListId, taskId and creator fields
 */
export interface IReminderAttached
  extends Omit<
      ITaskAttached,
      "startDate" | "finishDate" | "id" | "creatorId" | "text"
    >,
    Omit<ITodoListWithMembersDto, "id" | "creator"> {
  startDate: Date;
  text?: string;
  finishDate: Date;
  creator?: IUserPublicDataDTO;
  todoListId: string;
  taskId: string;
}
