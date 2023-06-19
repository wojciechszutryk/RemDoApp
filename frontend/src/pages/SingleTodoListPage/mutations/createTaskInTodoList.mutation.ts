import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { ITaskDTO, mapITaskToITaskDTO } from "linked-models/task/task.dto";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASKS } from "linked-models/task/task.urls";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useParams } from "react-router-dom";

interface ICreateTaskInTodoListMutation {
  todoListId: string;
  data: ITask;
}

export const useCreateTaskInTodoListMutation = () => {
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const { todoListId: todoListIdParam } = useParams();

  const createTaskInTodoList = async (todoListId: string, data: ITask) => {
    const url = FRONTIFY_URL(URL_TODO_LIST_TASKS(todoListId));
    return apiPost<ITaskDTO, ITaskAttached>(url, mapITaskToITaskDTO(data)).then(
      (res) => res.data
    );
  };

  return useMutation(
    ({ todoListId, data }: ICreateTaskInTodoListMutation) =>
      createTaskInTodoList(todoListId, data),
    {
      onSuccess: (createdTask) => {
        const mappedTask = {
          ...createdTask,
          creator: currentUser!,
        };

        // update single todo list query data only on singletodolist page
        if (todoListIdParam) {
          queryClient.setQueryData(
            [URL_TODO_LISTS, URL_TODO_LIST(todoListIdParam), PARAM_EXTENDED],
            (prev?: IExtendedTodoListDto): IExtendedTodoListDto => {
              if (!prev) return {} as IExtendedTodoListDto;
              const todoListWithNewTask = {
                ...prev,
                tasks: [...prev.tasks, mappedTask],
              };
              return todoListWithNewTask;
            }
          );
        }

        // update all todo lists query data on todolists page
        queryClient.setQueryData(
          [URL_TODO_LISTS, PARAM_EXTENDED],
          (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
            if (!prev) return [];
            const todoList = prev.find(
              (td) => td.id === createdTask.todoListId
            );
            if (!todoList) return prev;
            const todoListWithNewTask = {
              ...todoList,
              tasks: [...todoList.tasks, mappedTask],
            };
            return prev.map((td) =>
              td.id === todoListWithNewTask.id ? todoListWithNewTask : td
            );
          }
        );
      },
    }
  );
};
