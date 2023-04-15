import {
  DialogsActionTypes,
  UpdateTodoListDialogAction,
} from "./models/actions.model";
import { ITodoListDialog } from "./models/state.model";

export const updateTodoListDialogAction = (
  payload: ITodoListDialog
): UpdateTodoListDialogAction => {
  return {
    type: DialogsActionTypes.updateTodoListDialog,
    payload,
  };
};
