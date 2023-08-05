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
const useUpdateQueriesAfterDeletingReminder = () => {
  const queryClient = useQueryClient();
  const { todoListId: todoListIdParam } = useParams();

  return useCallback(
    (deletedReminder: IReminderAttached) => {
      // update single todo list query data only on singletodolist page
      if (todoListIdParam) {
        queryClient.setQueryData(
          [URL_TODO_LISTS, URL_TODO_LIST(todoListIdParam), PARAM_EXTENDED],
          (prev?: IExtendedTodoListDto): IExtendedTodoListDto => {
            if (!prev) return {} as IExtendedTodoListDto;
            const todoListWithFilteredReminders = {
              ...prev,
              reminders: prev.reminders.filter((reminder) => reminder.id !== deletedReminder.id),
            };
            return todoListWithFilteredReminders;
          }
        );
      }

      // update all todo lists query data on todolists page
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          if (!prev) return [];
          const updatedTodoLists = prev.map((todoList) => {
            const filteredReminders = todoList.reminders.filter(
              (reminder) => reminder.id !== deletedReminder.id
            );
            return {
              ...todoList,
              reminders: filteredReminders,
            };
          });
          return updatedTodoLists;
        }
      );
    },
    [queryClient, todoListIdParam]
  );
};

export default useUpdateQueriesAfterDeletingReminder;
