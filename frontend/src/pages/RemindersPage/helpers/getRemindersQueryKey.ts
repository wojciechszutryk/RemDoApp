import dayjs from "dayjs";
import { URL_REMINDERS } from "linked-models/reminder/reminder.urls";

/**
 * return query key of Reminders Query - array [URL_REMINDERS, yearOfStartRange, monthOFStartRange]
 */
export const getRemindersQueryKey = (date: Date) => {
  return [URL_REMINDERS, dayjs(date).year(), dayjs(date).month()];
};
