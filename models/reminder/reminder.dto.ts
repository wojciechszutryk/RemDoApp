import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { ITaskAttached } from "../task/task.model";

export interface IReminderDTO extends ITaskAttached {
  icon: TodoListIconEnum | undefined;
  creator: IUserPublicDataDTO | undefined;
  assignedUsers: IUserPublicDataDTO[] | undefined;
}
