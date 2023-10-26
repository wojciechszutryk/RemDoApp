import { ITask } from "linked-models/task/task.model";
import { NotifyDateCreatorFields } from "../components/NotifyForm/models";

export type ITaskWithNotificationDialog = ITask & {
  /** flag determining wheather to notify or not*/
  notify?: boolean;
};

export type ITaskDialog = ITaskWithNotificationDialog & NotifyDateCreatorFields;
