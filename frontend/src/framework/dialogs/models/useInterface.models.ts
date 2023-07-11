import {
  IDeleteTaskDialog,
  IDeleteTodoListDialog,
  IDialogsState,
  IReminderDialog,
  IShareTodoListDialog,
  ITaskDialog,
  ITodoListDialog,
  IReminderListDialog,
} from "./state.model";

export interface ContextProps {
  dialogsState: IDialogsState;
  dialogsActions: {
    updateTodoListDialog: (actionPayload: ITodoListDialog) => void;
    updateShareTodoListDialog: (actionPayload: IShareTodoListDialog) => void;
    updateDeleteTodoListDialog: (actionPayload: IDeleteTodoListDialog) => void;
    updateTaskDialog: (actionPayload: ITaskDialog) => void;
    updateDeleteTaskDialog: (actionPayload: IDeleteTaskDialog) => void;
    updateReminderDialog: (actionPayload: IReminderDialog) => void;
    updateReminderListDialog: (actionPayload: IReminderListDialog) => void;
  };
}
