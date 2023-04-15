import { DialogsReducerActions } from "./actions.model";
import { IDialogsState, ITodoListDialog } from "./state.model";

export interface ContextProps {
  dialogsState: IDialogsState;
  dialogsDispatch: React.Dispatch<DialogsReducerActions>;
  dialogsActions: {
    updateTodoListDialog: (actionPayload: ITodoListDialog) => void;
  };
}
