import { useContext, useReducer } from "react";
import { updateTodoListDialogAction } from "./actions";
import { Context, initialState } from "./context";
import { ITodoListDialog } from "./models/state.model";
import { ContextProps } from "./models/useInterface.models";
import Reducer from "./reducer";

interface Props {
  children: Element | JSX.Element;
}

function DialogsProvider({ children }: Props): JSX.Element {
  const [dialogsState, dialogsDispatch] = useReducer(Reducer, initialState);

  const dialogsActions = {
    updateTodoListDialog: (actionPayload: ITodoListDialog) =>
      dialogsDispatch(updateTodoListDialogAction(actionPayload)),
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
