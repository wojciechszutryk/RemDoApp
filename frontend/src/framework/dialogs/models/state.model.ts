import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { ITask } from "linked-models/task/task.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { IReminderDialogState } from "../components/ReminderDialog/helpers/IReminderDialogState";
import { ITodoListDialogValues } from "../components/TodoListDialog";
import { IBaseDialogProps } from "./baseModalProps.model";

export interface ITodoListDialog extends IBaseDialogProps {
  visible: boolean;
  editTodoListData?: ITodoListDialogValues & { id: string };
}
export interface IShareTodoListDialog extends IBaseDialogProps {
  visible: boolean;
  assignedUsers: IUserPublicDataDTO[];
  assignedOwners: IUserPublicDataDTO[];
  todoListId: string;
  todoListName: string;
}
export interface IDeleteTodoListDialog extends IBaseDialogProps {
  visible: boolean;
  todoListId: string;
}

export interface ITaskDialog {
  visible: boolean;
  editTaskData?: ITask & { id: string; notifyDate?: Date };
  todoListId: string;
}

export interface IDeleteTaskDialog {
  visible: boolean;
  taskId: string;
  todoListId?: string;
}

export interface IReminderDialog {
  visible: boolean;
  editReminderData?: IReminderDialogState;
  defaultData?: Partial<IReminderDialogState>;
}

export interface IReminderListDialog {
  visible: boolean;
  reminders: IExtendedTaskDto[];
}

export interface IDialogsState {
  collaborantsDrawer: { visible: boolean };
  todoListDialog: ITodoListDialog;
  shareTodoListDialog: IShareTodoListDialog;
  deleteTodoListDialog: IDeleteTodoListDialog;
  taskDialog: ITaskDialog;
  deleteTaskDialog: IDeleteTaskDialog;
  reminderDialog: IReminderDialog;
}
