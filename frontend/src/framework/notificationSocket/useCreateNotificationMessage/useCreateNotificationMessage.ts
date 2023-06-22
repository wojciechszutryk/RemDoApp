import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { EventName } from "linked-models/event/event.enum";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { INotificationMessage } from "./notificationMessage.model";

const useCreateNotificationMessage = () => {
  const { t } = useTranslation();
  return useCallback(
    ({
      action,
      actionCreatorDisplayName,
      todoListName,
      taskName,
    }: INotificationMessage) => {
      const actionCreatorPart = `${
        actionCreatorDisplayName
          ? t(TranslationKeys.NotificationByUserPart) +
            `"${actionCreatorDisplayName}"`
          : ""
      }`;
      const todoListPart = `${
        todoListName
          ? t(TranslationKeys.NotificationInTodoListPart) + `"${todoListName}"`
          : ""
      }`;

      let text = "";

      switch (action) {
        case EventName.TaskCreated:
          text = `${t(TranslationKeys.NotificationNewTaskPart)}${
            taskName ? `"${taskName}" ` : ""
          }${t(
            TranslationKeys.NotificationWasCreatedPart
          )}${todoListPart}${actionCreatorPart}`;
          break;
        case EventName.TaskUpdated:
          text = `${t(TranslationKeys.NotificationExistingTaskPart)}${
            taskName ? `"${taskName}" ` : ""
          }${t(
            TranslationKeys.NotificationWasModifiedPart
          )}${todoListPart}${actionCreatorPart}`;
          break;
        case EventName.TaskDeleted:
          text = `${t(TranslationKeys.NotificationExistingTaskPart)}${
            taskName ? `"${taskName}" ` : ""
          }${t(
            TranslationKeys.NotificationWasDeletedPart
          )}${todoListPart}${actionCreatorPart}`;
          break;
        case EventName.TodoListCreated:
          text = `${t(TranslationKeys.NotificationNewTodoListPart)}${
            todoListName ? `"${todoListName}" ` : ""
          }${t(
            TranslationKeys.NotificationWasCreatedPart
          )}${actionCreatorPart}`;
          break;
        case EventName.TodoListUpdated:
          text = `${t(TranslationKeys.NotificationExistingTodoListPart)}${
            todoListName ? `"${todoListName}" ` : ""
          }${t(
            TranslationKeys.NotificationWasModifiedPart
          )}${actionCreatorPart}`;
          break;
        case EventName.TodoListDeleted:
          text = `${t(TranslationKeys.NotificationExistingTodoListPart)}${
            todoListName ? `"${todoListName}" ` : ""
          }${t(
            TranslationKeys.NotificationWasDeletedPart
          )}${actionCreatorPart}`;
          break;
        case EventName.TodoListMemberAdded:
          text = `${t(TranslationKeys.NotificationUserInvitedPart)}${
            todoListName ? `"${todoListName}" ` : ""
          }${actionCreatorPart}`;
          break;
        case EventName.TodoListMemberRemoved:
          text = `${t(TranslationKeys.NotificationUserRemovedPart)}${
            todoListName ? `"${todoListName}" ` : ""
          }${actionCreatorPart}`;
          break;
        default:
          text = `${t(
            TranslationKeys.NotificationUnknownAction
          )}${todoListPart}${actionCreatorPart}}`;
      }

      return text;
    },
    [t]
  );
};

export default useCreateNotificationMessage;
