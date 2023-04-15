import { createContext } from "react";
import { BaseContextProps } from "../contexts/base.context.props";
import { ContextProps } from "./models/useInterface.models";

export const initialState = {
  todoListDialog: {
    visible: false,
    onClose: () => {},
  },
};

export const Context = createContext<BaseContextProps & ContextProps>({
  dialogsState: initialState,
  dialogsDispatch: () => null,
  dialogsActions: {
    updateTodoListDialog: () => null,
  },
  initialized: false,
});
