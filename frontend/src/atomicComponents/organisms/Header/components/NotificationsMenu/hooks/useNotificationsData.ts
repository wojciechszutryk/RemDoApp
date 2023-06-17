import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useNotificationsData = () => {
  const { t } = useTranslation();
  const { notifications } = useCurrentUser();

  return useMemo(() => {
    const readNotificationIDs: string[] = [];
    const freahNotificationIDs: string[] = [];
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
        const todoListId = n.todoListId || t(TranslationKeys.Other);
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
        else freahNotificationIDs.push(n.userNotificationId);

        const todoListId = n.todoListId || t(TranslationKeys.Other);
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
      freahNotificationIDs,
    };
  }, [notifications, t]);
};

export default useNotificationsData;
