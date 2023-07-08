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

    case DialogsActionTypes.updateShareTodoListDialog: {
      newState.shareTodoListDialog = action.payload;

      return newState;
    }

    case DialogsActionTypes.updateDeleteTodoListDialog: {
      newState.deleteTodoListDialog = action.payload;

      return newState;
    }

    case DialogsActionTypes.updateTaskDialog: {
      newState.taskDialog = action.payload;

      return newState;
    }

    case DialogsActionTypes.updateDeleteTaskDialog: {
      newState.deleteTaskDialog = action.payload;

      return newState;
    }

    case DialogsActionTypes.updateReminderDialog: {
      newState.reminderDialog = action.payload;

      return newState;
    }

    default:
      throw new Error();
  }
}

export default Reducer;
