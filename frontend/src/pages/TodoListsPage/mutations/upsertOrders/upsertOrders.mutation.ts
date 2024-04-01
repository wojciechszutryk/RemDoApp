import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useSnackbar } from "framework/snackBar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { UpsertOrderDTO } from "linked-models/order/order.dto";
import { IOrderAttached } from "linked-models/order/order.model";
import { URL_ORDERS } from "linked-models/order/order.urls";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  PARAM_EXTENDED,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { URL_USER, URL_USERS } from "linked-models/user/user.urls";
import { useTranslation } from "react-i18next";

const sortEntitiesHelper = <
  T extends { id: string; order?: number; whenCreated: Date }
>(
  entities: T[],
  entityIdToOrderMap: Record<string, number>
) => {
  return entities
    .map((e) => ({ ...e, order: entityIdToOrderMap[e.id] }))
    .sort((a, b) => {
      const aOrder =
        a.order ?? entityIdToOrderMap[a.id] ?? a.whenCreated.getDate();
      const bOrder =
        b.order ?? entityIdToOrderMap[b.id] ?? b.whenCreated.getDate();

      return aOrder - bOrder;
    });
};

/**
 * For performance increase we do not support mixed (todoList and task OR tasks from todoList1 and tasks from todoList2) state updates, when we receive order with todoListId we assume that todoLists were sorted, tasks won't be sorted
 */
export const useUpsertOrdersMutation = (currentUserId?: string) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { setSnackbar } = useSnackbar();
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

          //todoLists case - we assume that todoLists were sorted
          if (orders.some((o) => o.todoListId)) {
            const sortedTodoLists = sortEntitiesHelper(
              newExtendedState,
              entityIdToOrderMap
            );

            return sortedTodoLists;
          }

          //tasks case - we find todoListId and sort its tasks
          const todoListId = orders.find(
            (o) => o.taskId && o.todoListId
          )?.todoListId;

          if (todoListId) {
            newExtendedState.map((todoList) => {
              if (todoList.id === todoListId) {
                todoList.tasks = sortEntitiesHelper(
                  todoList.tasks,
                  entityIdToOrderMap
                );
              }

              return todoList;
            });
          }

          return newExtendedState;
        }
      ),
    onError: () => {
      setSnackbar({
        severity: "error",
        message: t(TranslationKeys.ForgetPasswordError),
      });
    },
  });
};
