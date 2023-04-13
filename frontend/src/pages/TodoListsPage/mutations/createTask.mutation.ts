import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASKS } from "linked-models/task/task.urls";
import { TodoListsWithTasksDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_WITH_TASKS,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useMutation, useQueryClient } from "react-query";

interface ICreateTaskMutation {
  todoListId: string;
  data: ITask;
}

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  const createTask = async (todoListId: string, data: ITask) => {
    const url = FRONTIFY_URL(URL_TODO_LIST_TASKS(todoListId));
    return apiPost<ITask, ITaskAttached>(url, data).then((res) => res.data);
  };

  return useMutation(
    ({ todoListId, data }: ICreateTaskMutation) => createTask(todoListId, data),
    {
      onSuccess: (createdTask) => {
        const queryKey = [URL_TODO_LISTS, PARAM_WITH_TASKS];
        queryClient.setQueryData(
          queryKey,
          (prev?: TodoListsWithTasksDto[]): TodoListsWithTasksDto[] => {
            if (!prev) return [];
            const todoList = prev.find(
              (td) => td.id === createdTask.todoListId
            );
            if (!todoList) return prev;
            const todoListWithNewTask = {
              ...todoList,
              tasks: [...todoList.tasks, createdTask],
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
