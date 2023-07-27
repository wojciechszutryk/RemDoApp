import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IReminderDTO } from "linked-models/reminder/reminder.dto";
import {
  PARAM_END_DATE,
  PARAM_START_DATE,
  URL_REMINDERS,
} from "linked-models/reminder/reminder.urls";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { DateRange } from "react-big-calendar";

export const useGetUserRemindersForDateRange = (
  dateRange: DateRange,
  options?: Omit<UseQueryOptions<IReminderDTO[]>, "queryFn">
) => {
  const url = FRONTIFY_URL(URL_REMINDERS, "", {
    [PARAM_START_DATE]: dateRange.start.toString(),
    [PARAM_END_DATE]: dateRange.end.toString(),
  });

  const getTodoListsWithTasks = async () => {
    return await apiGet<IReminderDTO[]>(url).then((res) => res.data);
  };

  return useQuery(
    [URL_TODO_LISTS, PARAM_EXTENDED, dateRange.start, dateRange.end],
    getTodoListsWithTasks,
    options
  );
};
