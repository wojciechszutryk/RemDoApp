import {
  DialogsActionTypes,
  DialogsReducerActions,
} from "./models/actions.model";
import { IDialogsState } from "./models/state.model";

function Reducer(
  state: IDialogsState,
  action: DialogsReducerActions
): IDialogsState {
  const newState = { ...state };

  switch (action.type) {
    case DialogsActionTypes.updateTodoListDialog: {
      newState.todoListDialog = action.payload;

      return newState;
    }

    default:
      throw new Error();
  }
}

export default Reducer;
