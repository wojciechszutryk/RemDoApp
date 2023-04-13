import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "./todoList.model";

export interface TodoListsWithTasksDto extends ITodoListAttached {
  tasks: ITaskAttached[];
}
