import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  PARAM_END_DATE,
  PARAM_START_DATE,
  URL_REMINDERS,
} from "linked-models/reminder/reminder.urls";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { DateRange } from "react-big-calendar";

export const useGetUserRemindersForDateRange = (
  dateRange: DateRange,
  options?: Omit<UseQueryOptions<IExtendedTodoListDto[]>, "queryFn">
) => {
  const url = FRONTIFY_URL(URL_REMINDERS, "", {
    [PARAM_START_DATE]: encodeURIComponent(dateRange.start.toString()),
    [PARAM_END_DATE]: encodeURIComponent(dateRange.end.toString()),
  });

  const getTodoListsWithTasks = async () => {
    return await apiGet<IExtendedTodoListDto[]>(url).then((res) => res.data);
  };

  return useQuery(
    [URL_TODO_LISTS, PARAM_EXTENDED, dateRange.start, dateRange.end],
    getTodoListsWithTasks,
    options
  );
};
