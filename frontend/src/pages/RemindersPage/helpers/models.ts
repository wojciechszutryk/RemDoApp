import { IReminderAttached } from "linked-models/reminder/reminder.model";

export type IRemindersQueryData = Map<string, IReminderAttached>;

export interface ICallendarEvent extends IReminderAttached {
  id: string;
  title: string;
  start: Date;
  end: Date;
  highlight?: boolean;
}
