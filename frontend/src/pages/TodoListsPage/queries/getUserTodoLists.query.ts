import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { URL_TODO_LISTS } from "linked-models/todoList/todoList.urls";
import { useQuery } from "react-query";

export const useGetUserTodoListsQuery = () => {
  const getTodoLists = async () => {
    return await apiGet<ITodoListAttached[]>(FRONTIFY_URL(URL_TODO_LISTS)).then(
      (res) => res.data
    );
  };

  return useQuery([URL_TODO_LISTS], getTodoLists);
};
