import { ITask } from "linked-models/task/task.model";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { IBaseDialogProps } from "./baseModalProps.model";

export interface ITodoListDialog extends IBaseDialogProps {
  visible: boolean;
  editTodoListData?: ITodoList & { id: string };
}
export interface IShareTodoListDialog extends IBaseDialogProps {
  visible: boolean;
  assignedUsers: string[];
  assignedOwners: string[];
  todoListId: string;
  todoListName: string;
}
export interface IDeleteTodoListDialog extends IBaseDialogProps {
  visible: boolean;
  todoListId: string;
}

export interface ITaskDialog {
  visible: boolean;
  editTaskData?: ITask & { id: string };
  todoListId: string;
}

export interface IDeleteTaskDialog {
  visible: boolean;
  taskId: string;
  todoListId?: string;
}

export interface IReminderDialog {
  visible: boolean;
  editReminderData?: ITask & {
    id: string;
    todoListId: string;
    icon: TodoListIconEnum;
  };
}

export interface IDialogsState {
  todoListDialog: ITodoListDialog;
  shareTodoListDialog: IShareTodoListDialog;
  deleteTodoListDialog: IDeleteTodoListDialog;
  taskDialog: ITaskDialog;
  deleteTaskDialog: IDeleteTaskDialog;
  reminderDialog: IReminderDialog;
}
