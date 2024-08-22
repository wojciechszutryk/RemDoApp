import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { IReminderAttached } from "../reminder/reminder.model";
import { ITaskAttached } from "../task/task.model";
import { ITodoListAttached } from "../todoList/todoList.model";
import { ISearchHistory } from "./search.history.model";
import { SearchCategory } from "./search.model";

export interface ISearchHistoryRespDto {
  [SearchCategory.Reminder]?: IReminderAttached;
  [SearchCategory.TodoList]?: ITodoListAttached;
  [SearchCategory.Task]?: ITaskAttached;
  [SearchCategory.User]?: IUserPublicDataDTO;
}

export type ISearchHistoryDto = Omit<ISearchHistory, "userId">;
