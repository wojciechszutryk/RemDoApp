import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { EventName } from "linked-models/event/event.enum";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const useCreateNotificationMessage = (
  userIdToUserMap: Map<string, IUserPublicDataDTO>
) => {
  const { t } = useTranslation();
  return useCallback(
    (action: EventName, actionCreatorId: string) => {
      const actionCreatorName =
        userIdToUserMap.get(actionCreatorId)?.displayName ||
        t(TranslationKeys.UnknownActionCreator);
      let text = "";

      switch (action) {
        case EventName.TaskCreated:
          text = `${t(
            TranslationKeys.TaskCreatedNotification
          )}${actionCreatorName}`;
          break;
        case EventName.TaskUpdated:
          text = `${t(
            TranslationKeys.TaskEditedNotification
          )}${actionCreatorName}`;
          break;
        case EventName.TaskDeleted:
          text = `${t(
            TranslationKeys.TaskDeletedNotification
          )}${actionCreatorName}`;
          break;
        case EventName.TodoListCreated:
          text = `${t(
            TranslationKeys.TodoListCreatedNotification
          )}${actionCreatorName}`;
          break;
        case EventName.TodoListUpdated:
          text = `${t(
            TranslationKeys.TodoListEditedNotification
          )}${actionCreatorName}`;
          break;
        case EventName.TodoListDeleted:
          text = `${t(
            TranslationKeys.TodoListDeletedNotification
          )}${actionCreatorName}`;
          break;
        case EventName.TodoListMemberAdded:
          text = `${t(
            TranslationKeys.UserInvitedToTodoListNotification
          )}${actionCreatorName}`;
          break;
        case EventName.TodoListMemberRemoved:
          text = `${t(
            TranslationKeys.UserRemovedFromTodoListNotification
          )}${actionCreatorName}`;
          break;
        default:
          text = `${t(TranslationKeys.UnknownAction)}${actionCreatorName}`;
      }

      return text;
    },
    [t, userIdToUserMap]
  );
};

export default useCreateNotificationMessage;
