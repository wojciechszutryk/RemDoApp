import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { NotifyDateCreatorFields } from "../../TaskDialog/components/NotifyForm/model";

type IReminderAttachedWithNotificationDialog = IReminderAttached & {
  /** flag determining wheather to notify or not*/
  notify?: boolean;
};

export type IReminderDialog = IReminderAttachedWithNotificationDialog &
  NotifyDateCreatorFields;
