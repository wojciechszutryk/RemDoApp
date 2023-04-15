import { ITodoListDialog } from "./state.model";

export enum DialogsActionTypes {
  updateTodoListDialog = "UPDATE_TODOLIST_DIALOG",
}

export interface UpdateTodoListDialogAction {
  type: DialogsActionTypes.updateTodoListDialog;
  payload: ITodoListDialog;
}

export type DialogsReducerActions = UpdateTodoListDialogAction;
