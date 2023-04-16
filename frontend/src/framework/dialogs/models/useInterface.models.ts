import { IDialogsState, ITodoListDialog } from "./state.model";

export interface ContextProps {
  dialogsState: IDialogsState;
  dialogsActions: {
    updateTodoListDialog: (actionPayload: ITodoListDialog) => void;
  };
}
