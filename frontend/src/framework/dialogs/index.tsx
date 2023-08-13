import { useContext, useReducer } from "react";
import {
  updateCollaborantsDrawerAction,
  updateDeleteTaskDialogAction,
  updateDeleteTodoListDialogAction,
  updateReminderDialogAction,
  updateReminderListDialogAction,
  updateShareTodoListDialogAction,
  updateTaskDialogAction,
  updateTodoListDialogAction,
} from "./actions";
import { Context, initialState } from "./context";
import {
  IDeleteTaskDialog,
  IDeleteTodoListDialog,
  IReminderDialog,
  IReminderListDialog,
  IShareTodoListDialog,
  ITaskDialog,
  ITodoListDialog,
} from "./models/state.model";
import { ContextProps } from "./models/useInterface.models";
import Reducer from "./reducer";

interface Props {
  children: Element | JSX.Element;
}

function DialogsProvider({ children }: Props): JSX.Element {
  const [dialogsState, dialogsDispatch] = useReducer(Reducer, initialState);

  const dialogsActions = {
    updateCollaborantsDrawer: (actionPayload: { visible: boolean }) =>
      dialogsDispatch(updateCollaborantsDrawerAction(actionPayload)),
    updateTodoListDialog: (actionPayload: ITodoListDialog) =>
      dialogsDispatch(updateTodoListDialogAction(actionPayload)),
    updateShareTodoListDialog: (actionPayload: IShareTodoListDialog) =>
      dialogsDispatch(updateShareTodoListDialogAction(actionPayload)),
    updateDeleteTodoListDialog: (actionPayload: IDeleteTodoListDialog) =>
      dialogsDispatch(updateDeleteTodoListDialogAction(actionPayload)),
    updateTaskDialog: (actionPayload: ITaskDialog) =>
      dialogsDispatch(updateTaskDialogAction(actionPayload)),
    updateDeleteTaskDialog: (actionPayload: IDeleteTaskDialog) =>
      dialogsDispatch(updateDeleteTaskDialogAction(actionPayload)),
    updateReminderDialog: (actionPayload: IReminderDialog) =>
      dialogsDispatch(updateReminderDialogAction(actionPayload)),
    updateReminderListDialog: (actionPayload: IReminderListDialog) =>
      dialogsDispatch(updateReminderListDialogAction(actionPayload)),
  };

  const value = {
    dialogsState,
    dialogsActions,
    initialized: true,
  };

  return (
    <Context.Provider value={value}>
      <>{children}</>
    </Context.Provider>
  );
}

function useDialogs(): ContextProps {
  const context = useContext(Context);

  if (!context.initialized) {
    throw new Error("Context must be used within a <DialogsProvider/>");
  }

  return context;
}

export { DialogsProvider, useDialogs };
