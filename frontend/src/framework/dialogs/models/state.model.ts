import { IBaseDialogProps } from "./baseModalProps.model";

export interface ITodoListDialog extends IBaseDialogProps {
  visible: boolean;
}

export interface IDialogsState {
  todoListDialog: ITodoListDialog;
}
