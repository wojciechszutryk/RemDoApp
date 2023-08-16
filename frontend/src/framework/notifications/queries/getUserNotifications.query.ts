import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  INotificationDto,
  INotificationResponseDto,
} from "linked-models/notification/notification.dto";
import { URL_USER_NOTIFICATIONS } from "linked-models/notification/notification.urls";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { URL_USERS } from "linked-models/user/user.urls";

export interface IUserNotificationsQueryData {
  notifications: INotificationDto[];
  todoListsMap: Map<string, ITodoListAttached>;
  tasksMap: Map<string, ITaskAttached>;
  creatorsMap: Map<string, IUserPublicDataDTO>;
}

export const useGetUserNotificationsQuery = (): UseQueryResult<
  IUserNotificationsQueryData,
  unknown
> => {
  const url = FRONTIFY_URL(URL_USERS + URL_USER_NOTIFICATIONS);

  const getUserNotifications =
    async (): Promise<IUserNotificationsQueryData> => {
      return await apiGet<INotificationResponseDto>(url).then((res) => {
        const data = res.data;
        return {
          notifications: data.notifications,
          todoListsMap: new Map(
            data.todoLists.map((todoList) => [todoList.id, todoList])
          ),
          tasksMap: new Map(data.tasks.map((task) => [task.id, task])),
          creatorsMap: new Map(
            data.creators.map((creator) => [creator.id, creator])
          ),
        };
      });
    };

  return useQuery([URL_USER_NOTIFICATIONS], getUserNotifications);
};
