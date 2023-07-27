import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { ITask } from "../task/task.model";

export interface IReminderDTO extends ITask {
  icon: TodoListIconEnum;
}
