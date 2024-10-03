import { ISimplifiedReminder } from "../reminder/reminder.model";
import { ITaskAttached } from "../task/task.model";
import { ITodoListAttached } from "../todoList/todoList.model";
import { IUserPublicDataDTO } from "../user/user.dto";

export enum SearchCategory {
  Reminder = "Reminder",
  TodoList = "TodoList",
  Task = "Task",
  User = "User",
}

export interface ISearchResults {
  [SearchCategory.Reminder]: ISimplifiedReminder[];
  [SearchCategory.TodoList]: ITodoListAttached[];
  [SearchCategory.Task]: ITaskAttached[];
  [SearchCategory.User]: IUserPublicDataDTO[];
}
