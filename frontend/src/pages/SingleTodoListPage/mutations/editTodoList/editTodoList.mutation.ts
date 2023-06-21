import { useMutation } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import useUpdateQueriesAfterEditingTodoList from "./useUpdateQueriesAfterEditingTodoList";

export const useEditTodoListMutation = () => {
  const updateQueriesAfterEditingTodoList =
    useUpdateQueriesAfterEditingTodoList();

  const editTodoList = async ({
    todoListId,
    data,
  }: {
    todoListId: string;
    data: Partial<ITodoList>;
  }) => {
    return apiPut<Partial<ITodoList>, ITodoListWithMembersDto>(
      FRONTIFY_URL(URL_TODO_LISTS, URL_TODO_LIST(todoListId)),
      data
    ).then((res) => res.data);
  };

  return useMutation(editTodoList, {
    onSuccess: updateQueriesAfterEditingTodoList,
  });
};
