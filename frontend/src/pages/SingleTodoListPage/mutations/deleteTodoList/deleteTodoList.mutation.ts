import { useMutation } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { Pages } from "framework/routing/pages";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useNavigate, useParams } from "react-router-dom";
import useUpdateQueriesAfterDeletingTodoList from "./useUpdateQueriesAfterDeletingTodoList";

export const useDeleteTodoListMutation = () => {
  const updateQueriesAfterDeletingTodoList =
    useUpdateQueriesAfterDeletingTodoList();
  const navigate = useNavigate();

  const { todoListId: todoListIdParam } = useParams();

  const deleteTodoList = async (todoListId: string) => {
    const url = FRONTIFY_URL(URL_TODO_LISTS, URL_TODO_LIST(todoListId));
    return apiDelete<ITodoListAttached>(url).then((res) => res.data);
  };

  return useMutation(deleteTodoList, {
    onSuccess: (deletedTodoList: ITodoListAttached) => {
      // update single todo list query data only on singletodolist page
      if (todoListIdParam) {
        navigate(Pages.TodoListsPage.path);
      }

      updateQueriesAfterDeletingTodoList(deletedTodoList);
    },
  });
};
