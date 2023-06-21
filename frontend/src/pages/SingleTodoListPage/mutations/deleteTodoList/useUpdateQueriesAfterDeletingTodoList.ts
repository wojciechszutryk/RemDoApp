import { useQueryClient } from "@tanstack/react-query";
import { Pages } from "framework/routing/pages";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useUpdateQueriesAfterDeletingTodoList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { todoListId: todoListIdParam } = useParams();

  return useCallback(
    (deletedTodoList: ITodoListAttached) => {
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
    [navigate, queryClient, todoListIdParam]
  );
};

export default useUpdateQueriesAfterDeletingTodoList;
