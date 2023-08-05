import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import dayjs from "dayjs";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IReminderDTO } from "linked-models/reminder/reminder.dto";
import {
  PARAM_END_DATE,
  PARAM_START_DATE,
  URL_REMINDERS,
} from "linked-models/reminder/reminder.urls";
import { DateRange } from "react-big-calendar";
import { IRemindersQueryData } from "../helpers/models";

/**
 * It fetches IReminderDTO[] but then maps it to IRemindersQueryData for easier reminder access
 */
export const useGetUserRemindersForDateRange = (
  dateRange: DateRange,
  options?: Omit<UseQueryOptions<IRemindersQueryData>, "queryFn">
) => {
  const url = FRONTIFY_URL(URL_REMINDERS, "", {
    [PARAM_START_DATE]: dateRange.start.toString(),
    [PARAM_END_DATE]: dateRange.end.toString(),
  });

  const getReminders = async () => {
    return await apiGet<IReminderDTO[]>(url).then((res) => {
      const idToReminderMap = new Map<string, IReminderDTO>();
      res.data.forEach((reminder) => {
        idToReminderMap.set(reminder.id, reminder);
      });
      return idToReminderMap;
    });
  };

  return useQuery(
    [
      URL_REMINDERS,
      dayjs(dateRange.start).year(),
      dayjs(dateRange.start).month(),
    ],
    getReminders,
    options
  );
};
