import {
  IDeleteTaskDialog,
  IDeleteTodoListDialog,
  IReminderListDialog,
  IShareTodoListDialog,
  ITaskDialog,
} from "./state.model";

export const initialShareTodoListDialog: IShareTodoListDialog = {
  visible: false,
  assignedUsers: [],
  assignedOwners: [],
  todoListId: "",
  todoListName: "",
};

export const initialDeleteTodoListDialog: IDeleteTodoListDialog = {
  visible: false,
  todoListId: "",
};

export const initialTaskDialog: ITaskDialog = {
  visible: false,
  todoListId: "",
};

export const initialDeleteTaskDialog: IDeleteTaskDialog = {
  visible: false,
  taskId: "",
};

export const initialReminderListDialog: IReminderListDialog = {
  visible: false,
  reminders: [],
};
