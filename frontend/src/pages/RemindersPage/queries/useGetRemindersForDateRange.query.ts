import {
  QueryFunctionContext,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_END_DATE,
  PARAM_EXTENDED,
  PARAM_START_DATE,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

export const useGetRemindersForDateRangeQuery = (
  startDate: Date,
  endDate: Date,
  options?: Omit<UseQueryOptions<IExtendedTodoListDto[]>, "queryFn">
) => {
  const url = FRONTIFY_URL(
    URL_TODO_LISTS,
    `?${PARAM_EXTENDED}=true&${PARAM_START_DATE}=${startDate.toString()}&${PARAM_END_DATE}=${endDate.toString()}}`
  );

  const getRemindersForDateRange = async ({
    signal,
  }: QueryFunctionContext<QueryKey, any>) => {
    return await apiGet<IExtendedTodoListDto[]>(url, { signal }).then(
      (res) => res.data
    );
  };

  return useQuery({
    queryKey: [URL_TODO_LISTS, startDate, endDate],
    queryFn: (context) => getRemindersForDateRange(context),
    ...options,
  });
};
