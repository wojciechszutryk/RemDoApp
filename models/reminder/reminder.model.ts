import { ITaskAttached } from "../task/task.model";
import { ITodoListWithMembersDto } from "../todoList/todoList.dto";
import { IUserPublicDataDTO } from "../user/user.dto";

/**
 * sum of ITaskAttached (with required whenShouldBeStarted and whenShouldBeFinished) and ITodoListWithMembersDto with additional todoListId, taskId and creator fields
 */
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
