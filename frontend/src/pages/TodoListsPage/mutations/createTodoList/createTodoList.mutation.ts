import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { URL_TODO_LISTS } from "linked-models/todoList/todoList.urls";
import useUpdateQueriesAfterCreatingTodoList from "./useUpdateQueriesAfterCreatingTodoList";

export const useCreateTodoListMutation = () => {
  const updateQueriesAfterCreatingTodoList =
    useUpdateQueriesAfterCreatingTodoList();
  const url = FRONTIFY_URL(URL_TODO_LISTS);

  const createTodoList = async (data: ITodoList) => {
    return apiPost<ITodoList, ITodoListWithMembersDto>(url, data).then(
      (res) => res.data
    );
  };

  return useMutation(createTodoList, {
    onSuccess: updateQueriesAfterCreatingTodoList,
  });
};
