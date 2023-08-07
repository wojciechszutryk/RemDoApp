import { IReminderAttached } from "linked-models/reminder/reminder.model";

export type IRemindersQueryData = Map<string, IReminderAttached>;

export interface ICallendarEvent
  extends Omit<
    IReminderAttached,
    "text" | "startDate" | "finishDate" | "taskId"
  > {
  id: string;
  title: string;
  start: Date;
  end: Date;
}
