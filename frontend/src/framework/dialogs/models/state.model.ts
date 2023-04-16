import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { IBaseDialogProps } from "./baseModalProps.model";

export interface ITodoListDialog extends IBaseDialogProps {
  visible: boolean;
  editTodoListData?: ITodoListAttached;
}

export interface IDialogsState {
  todoListDialog: ITodoListDialog;
}
