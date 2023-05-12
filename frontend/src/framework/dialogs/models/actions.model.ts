import {
  IDeleteTaskDialog,
  IDeleteTodoListDialog,
  IShareTodoListDialog,
  ITaskDialog,
  ITodoListDialog,
} from "./state.model";

export enum DialogsActionTypes {
  updateTodoListDialog = "UPDATE_TODOLIST_DIALOG",
  updateShareTodoListDialog = "UPDATE_SHARE_TODOLIST_DIALOG",
  updateDeleteTodoListDialog = "UPDATE_DELETE_TODOLIST_DIALOG",
  updateTaskDialog = "UPDATE_TASK_DIALOG",
  updateDeleteTaskDialog = "UPDATE_DELETE_TASK_DIALOG",
}
export interface UpdateTodoListDialogAction {
  type: DialogsActionTypes.updateTodoListDialog;
  payload: ITodoListDialog;
}
export interface UpdateShareTodoListDialogAction {
  type: DialogsActionTypes.updateShareTodoListDialog;
  payload: IShareTodoListDialog;
}
export interface UpdateDeleteTodoListDialogAction {
  type: DialogsActionTypes.updateDeleteTodoListDialog;
  payload: IDeleteTodoListDialog;
}

export interface UpdateTaskDialogAction {
  type: DialogsActionTypes.updateTaskDialog;
  payload: ITaskDialog;
}
export interface UpdateDeleteTaskDialogAction {
  type: DialogsActionTypes.updateDeleteTaskDialog;
  payload: IDeleteTaskDialog;
}

export type DialogsReducerActions =
  | UpdateTodoListDialogAction
  | UpdateShareTodoListDialogAction
  | UpdateDeleteTodoListDialogAction
  | UpdateTaskDialogAction
  | UpdateDeleteTaskDialogAction;
