import { EventName } from "linked-models/event/event.enum";

export const getPushCronJobName = (userId: string, event: EventName) => {
  return `push-${userId}-${event}`;
};
