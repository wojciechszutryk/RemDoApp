import { INotificationDto } from "linked-models/notification/notification.dto";

export const getPushCronJobName = (
  userId: string,
  notification: INotificationDto
) => {
  return `push-${userId}-${notification.action}`;
};
