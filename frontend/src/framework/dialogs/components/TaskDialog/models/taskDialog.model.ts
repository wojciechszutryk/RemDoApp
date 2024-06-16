import { ITask } from "linked-models/task/task.model";
import { RecurranceFormCreatorFields } from "../components/DateForm/RecurranceForm/model";
import { NotifyDateCreatorFields } from "../components/NotifyForm/model";

export type ITaskWithNotificationDialog = ITask & {
  /** flag determining wheather to notify or not*/
  notify?: boolean;
};

export type ReccuranceFormValues = {
  reccuranceEnabled: boolean;
  reccuranceFormValues?: RecurranceFormCreatorFields;
};

export type ITaskDialog = ITaskWithNotificationDialog &
  NotifyDateCreatorFields &
  ReccuranceFormValues;
