import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { Pages } from "framework/routing/pages";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useNavigate, useParams } from "react-router-dom";

export const useDeleteTodoListMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { todoListId: todoListIdParam } = useParams();

  const deleteTodoList = async (todoListId: string) => {
    const url = FRONTIFY_URL(URL_TODO_LISTS, URL_TODO_LIST(todoListId));
    return apiDelete<ITodoListAttached>(url).then((res) => res.data);
  };

  return useMutation(deleteTodoList, {
    onSuccess: (deletedTodoList) => {
      // update single todo list query data only on singletodolist page
      if (todoListIdParam) {
        navigate(Pages.TodoListsPage.path);
      }

      // update all todo lists query data on todolists page
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          return (
            prev?.filter((td) => {
              return td.id !== deletedTodoList.id;
            }) || []
          );
        }
      );
    },
  });
};
