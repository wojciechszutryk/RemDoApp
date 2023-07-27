import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";

export interface DateRange {
  start: string;
  end: string;
}
export interface IExtendedTaskWithTodoList extends IExtendedTaskDto {
  todoList: ITodoListWithMembersDto;
}
