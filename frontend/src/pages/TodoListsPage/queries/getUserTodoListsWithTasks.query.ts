import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { TodoListsWithTasksDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_WITH_TASKS,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useQuery } from "react-query";

export const useGetUserTodoListsWithTasksQuery = () => {
  const url = FRONTIFY_URL(URL_TODO_LISTS, `?${PARAM_WITH_TASKS}=true`);

  const getArguments = async () => {
    return await apiGet<TodoListsWithTasksDto[]>(url).then((res) => res.data);
  };

  return useQuery([URL_TODO_LISTS, PARAM_WITH_TASKS], getArguments);
};
