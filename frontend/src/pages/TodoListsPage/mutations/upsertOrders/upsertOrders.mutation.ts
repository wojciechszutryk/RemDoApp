import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { UpsertOrderDTO } from "linked-models/order/order.dto";
import { IOrderAttached } from "linked-models/order/order.model";
import { URL_ORDERS } from "linked-models/order/order.urls";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { URL_USER, URL_USERS } from "linked-models/user/user.urls";

const sortEntitiesHelper = <
  T extends { id: string; order?: number; whenCreated: Date }
>(
  entities: T[],
  entityIdToOrderMap: Record<string, number>
) => {
  entities.sort((a, b) => {
    const aOrder =
      a.order ?? entityIdToOrderMap[a.id] ?? a.whenCreated.getDate();
    const bOrder =
      b.order ?? entityIdToOrderMap[b.id] ?? b.whenCreated.getDate();

    return aOrder - bOrder;
  });
};

/**
 * For performance increase we do not support mixed (todoList and task) state updates, when we receive order with todoListId we assume that todoLists were sorted, tasks won't be sorted
 */
export const useUpsertOrdersMutation = (currentUserId?: string) => {
  const queryClient = useQueryClient();
  const url = FRONTIFY_URL(
    URL_ORDERS,
    `${URL_USERS}${URL_USER(currentUserId)}`
  );

  const upsertTodoListOrder = async (data: UpsertOrderDTO[]) => {
    if (!currentUserId) Promise.resolve([]);

    return apiPost<{ data: UpsertOrderDTO[] }, IOrderAttached[]>(url, {
      data,
    }).then((res) => res.data);
  };

  return useMutation(upsertTodoListOrder, {
    onSuccess: (orders: IOrderAttached[]) =>
      queryClient.setQueryData(
        [URL_TODO_LISTS, PARAM_EXTENDED],
        (prev?: IExtendedTodoListDto[]): IExtendedTodoListDto[] => {
          if (!prev) return [];

          const entityIdToOrderMap = orders.reduce((acc, order) => {
            if (order.todoListId) acc[order.todoListId] = order.value;
            return acc;
          }, {} as Record<string, number>);

          const newExtendedState = [...prev];

          if (orders.some((o) => o.todoListId)) {
            sortEntitiesHelper(newExtendedState, entityIdToOrderMap);

            return newExtendedState;
          }

          const tasksOrdersToChange = new Set<string>(
            orders
              .filter((o) => !!o.todoListId)
              .map((o) => o.todoListId as string)
          );

          newExtendedState.forEach((todoList) => {
            if (tasksOrdersToChange.has(todoList.id)) {
              sortEntitiesHelper(todoList.tasks, entityIdToOrderMap);
            }
          });

          return newExtendedState;
        }
      ),
  });
};
