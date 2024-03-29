import { createContext } from "react";
import { BaseContextProps } from "../contexts/base.context.props";
import {
  initialDeleteTaskDialog,
  initialDeleteTodoListDialog,
  initialReminderListDialog,
  initialShareTodoListDialog,
  initialTaskDialog,
} from "./models/initialState.const";
import { ContextProps } from "./models/useInterface.models";

export const initialState = {
  todoListDialog: {
    visible: false,
    onClose: () => {},
  },
  collaborantsDrawer: {
    visible: false,
    onClose: () => {},
  },
  shareTodoListDialog: {
    ...initialShareTodoListDialog,
    onClose: () => {},
  },
  deleteTodoListDialog: {
    ...initialDeleteTodoListDialog,
    onClose: () => {},
  },
  taskDialog: { ...initialTaskDialog, onClose: () => {} },
  deleteTaskDialog: { ...initialDeleteTaskDialog, onClose: () => {} },
  reminderDialog: { ...initialTaskDialog, onClose: () => {} },
  reminderListDialog: { ...initialReminderListDialog, onClose: () => {} },
};

export const Context = createContext<BaseContextProps & ContextProps>({
  dialogsState: initialState,
  dialogsActions: {
    updateCollaborantsDrawer: () => null,
    updateTodoListDialog: () => null,
    updateShareTodoListDialog: () => null,
    updateDeleteTodoListDialog: () => null,
    updateTaskDialog: () => null,
    updateDeleteTaskDialog: () => null,
    updateReminderDialog: () => null,
    updateReminderListDialog: () => null,
  },
  initialized: false,
});
