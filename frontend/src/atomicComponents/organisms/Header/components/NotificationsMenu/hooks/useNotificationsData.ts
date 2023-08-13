import { useNotifications } from "framework/notificationSocket/useNotifications";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useNotificationsData = () => {
  const { t } = useTranslation();
  const { notifications } = useNotifications();

  return useMemo(() => {
    const readNotificationIDs: string[] = [];
    const freshNotificationIDs: string[] = [];
    const archivedNotificationIDs: string[] = [];
    const todoListIdToActiveNotificationsMap = new Map<
      string,
      INotificationDto[]
    >();
    const todoListIdToArchivedNotificationsMap = new Map<
      string,
      INotificationDto[]
    >();

    notifications.forEach((n) => {
      if (n.state === UserNotificationState.Archived) {
        archivedNotificationIDs.push(n.userNotificationId);
        if (n.action.includes("todoList") || n.action.includes("task"))
          const todoListId = n.actionParam || t(TranslationKeys.Other);
        const notificationsForTodoList =
          todoListIdToArchivedNotificationsMap.get(todoListId);

        if (notificationsForTodoList) {
          notificationsForTodoList.push(n);
        } else {
          todoListIdToArchivedNotificationsMap.set(todoListId, [n]);
        }
      } else {
        if (n.state === UserNotificationState.Read)
          readNotificationIDs.push(n.userNotificationId);
        else freshNotificationIDs.push(n.userNotificationId);

        const todoListId = n.actionParam || t(TranslationKeys.Other);
        const notificationsForTodoList =
          todoListIdToActiveNotificationsMap.get(todoListId);

        if (notificationsForTodoList) {
          notificationsForTodoList.push(n);
        } else {
          todoListIdToActiveNotificationsMap.set(todoListId, [n]);
        }
      }
    });

    return {
      todoListIdToArchivedNotificationsMap,
      archivedNotificationIDs,
      todoListIdToActiveNotificationsMap,
      readNotificationIDs,
      freshNotificationIDs,
    };
  }, [notifications, t]);
};

export default useNotificationsData;
