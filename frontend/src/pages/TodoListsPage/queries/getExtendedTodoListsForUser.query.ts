import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_WITH_MEMBERS,
  PARAM_WITH_TASKS,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useQuery } from "react-query";

export const useGetExtendedTodoListsForUser = () => {
  const url = FRONTIFY_URL(
    URL_TODO_LISTS,
    `?${PARAM_WITH_TASKS}=true&${PARAM_WITH_MEMBERS}=true`
  );

  const getTodoListsWithTasks = async () => {
    return await apiGet<IExtendedTodoListDto[]>(url).then((res) => res.data);
  };

  return useQuery([URL_TODO_LISTS, PARAM_WITH_TASKS], getTodoListsWithTasks);
};
