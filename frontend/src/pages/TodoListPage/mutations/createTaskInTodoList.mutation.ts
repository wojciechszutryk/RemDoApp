import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ITask, ITaskAttached } from "linked-models/task/task.model";
import { URL_TODO_LIST_TASKS } from "linked-models/task/task.urls";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_WITH_TASKS,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { useMutation, useQueryClient } from "react-query";

interface ICreateTaskInTodoListMutation {
  todoListId: string;
  data: ITask;
}

export const useCreateTaskInTodoListMutation = () => {
  const queryClient = useQueryClient();

  const createTaskInTodoList = async (todoListId: string, data: ITask) => {
    const url = FRONTIFY_URL(URL_TODO_LIST_TASKS(todoListId));
    return apiPost<ITask, ITaskAttached>(url, data).then((res) => res.data);
  };

  return useMutation(
    ({ todoListId, data }: ICreateTaskInTodoListMutation) => createTaskInTodoList(todoListId, data),
    {
      onSuccess: (createdTask) => {
        const queryKey = [URL_TODO_LISTS, PARAM_WITH_TASKS];
        queryClient.setQueryData(
          queryKey,
          (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
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
