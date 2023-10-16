import { ITask } from "linked-models/task/task.model";

export interface NotifyDateCreatorFields {
  minsAccordingToTimePoint?: number | null;
  beforeOrAfter?: "Before" | "After";
  timePoint?: "Start" | "Finish";
}

export type ITaskWithNotificationDialog = ITask & {
  /** flag determining wheather to notify or not*/
  notify?: boolean;
  notifyDate?: Date;
};

export type ITaskDialog = ITaskWithNotificationDialog & NotifyDateCreatorFields;
