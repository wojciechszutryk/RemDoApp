import {
  DialogsActionTypes,
  UpdateDeleteTaskDialogAction,
  UpdateDeleteTodoListDialogAction,
  UpdateShareTodoListDialogAction,
  UpdateTaskDialogAction,
  UpdateTodoListDialogAction,
} from "./models/actions.model";
import {
  IDeleteTaskDialog,
  IDeleteTodoListDialog,
  IShareTodoListDialog,
  ITaskDialog,
  ITodoListDialog,
} from "./models/state.model";

export const updateTodoListDialogAction = (
  payload: ITodoListDialog
): UpdateTodoListDialogAction => {
  return {
    type: DialogsActionTypes.updateTodoListDialog,
    payload,
  };
};

export const updateShareTodoListDialogAction = (
  payload: IShareTodoListDialog
): UpdateShareTodoListDialogAction => {
  return {
    type: DialogsActionTypes.updateShareTodoListDialog,
    payload,
  };
};

export const updateDeleteTodoListDialogAction = (
  payload: IDeleteTodoListDialog
): UpdateDeleteTodoListDialogAction => {
  return {
    type: DialogsActionTypes.updateDeleteTodoListDialog,
    payload,
  };
};

export const updateTaskDialogAction = (
  payload: ITaskDialog
): UpdateTaskDialogAction => {
  return {
    type: DialogsActionTypes.updateTaskDialog,
    payload,
  };
};

export const updateDeleteTaskDialogAction = (
  payload: IDeleteTaskDialog
): UpdateDeleteTaskDialogAction => {
  return {
    type: DialogsActionTypes.updateDeleteTaskDialog,
    payload,
  };
};
