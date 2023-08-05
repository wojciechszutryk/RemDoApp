import { useQueryClient } from "@tanstack/react-query";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

//TODO: FINISH
const useUpdateQueriesAfterEditingReminder = () => {
  const queryClient = useQueryClient();
  const { todoListId: todoListIdParam } = useParams();

  return useCallback(
    (updatedReminder: IReminderAttached, { todoListId }: { todoListId: string }) => {
      // update single todo list query data only on singletodolist page
      if (todoListIdParam) {
        queryClient.setQueryData(
          [URL_TODO_LISTS, URL_TODO_LIST(todoListIdParam), PARAM_EXTENDED],
          (prev?: IExtendedTodoListDto): IExtendedTodoListDto => {
            if (!prev) return {} as IExtendedTodoListDto;
            const todoListWithUpdatedReminder = {
              ...prev,
              reminders: prev.reminders.map((t) =>
                t.id === updatedReminder.id ? { ...t, ...updatedReminder } : t
              ),
            };
            return todoListWithUpdatedReminder;
          }
        );
      }

      // update all todo lists query data on todolists page
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          if (!prev) return [];
          const todoList = prev.find((td) => td.id === todoListId);
          if (!todoList) return prev;
          const todoListWithUpdatedReminder = {
            ...todoList,
            reminders: todoList.reminders.map((t) =>
              t.id === updatedReminder.id ? { ...t, ...updatedReminder } : t
            ),
          };
          return prev.map((td) =>
            td.id === todoListWithUpdatedReminder.id ? todoListWithUpdatedReminder : td
          );
        }
      );
    },
    [queryClient, todoListIdParam]
  );
};

export default useUpdateQueriesAfterEditingReminder;
