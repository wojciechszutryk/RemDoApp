import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { TFunction } from "i18next";
import { EventName } from "linked-models/event/event.enum";

export interface ICreateTodoNotificationMsg {
  action: EventName;
  actionCreatorDisplayName?: string;
  todoListName?: string;
  taskName?: string;
}

/** creates notification message for todoList, task, reminder context */
export const createTodoNotificationMsg = (
  {
    action,
    actionCreatorDisplayName,
    todoListName,
    taskName,
  }: ICreateTodoNotificationMsg,
  t: TFunction<"translation", undefined>
) => {
  const actionCreatorPart = `${
    actionCreatorDisplayName
      ? `${t(TranslationKeys.NotificationByUserPart)} 
        "${actionCreatorDisplayName}"`
      : ""
  }`;
  const todoListPart = `${
    todoListName
      ? `${t(TranslationKeys.NotificationInTodoListPart)} "${todoListName}"`
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
      }${t(TranslationKeys.NotificationWasCreatedPart)}${actionCreatorPart}`;
      break;
    case EventName.TodoListUpdated:
      text = `${t(TranslationKeys.NotificationExistingTodoListPart)}${
        todoListName ? `"${todoListName}" ` : ""
      }${t(TranslationKeys.NotificationWasModifiedPart)}${actionCreatorPart}`;
      break;
    case EventName.TodoListDeleted:
      text = `${t(TranslationKeys.NotificationExistingTodoListPart)}${
        todoListName ? `"${todoListName}" ` : ""
      }${t(TranslationKeys.NotificationWasDeletedPart)}${actionCreatorPart}`;
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
    case EventName.ReminderCreated:
      text = `${t(TranslationKeys.NotificationNewReminderPart)}${
        todoListName ? `"${todoListName}" ` : ""
      }${t(TranslationKeys.NotificationWasCreatedPart)}${actionCreatorPart}`;
      break;
    case EventName.ReminderUpdated:
      text = `${t(TranslationKeys.NotificationExistingReminderPart)}${
        todoListName ? `"${todoListName}" ` : ""
      }${t(TranslationKeys.NotificationWasModifiedPart)}${actionCreatorPart}`;
      break;
    case EventName.ReminderDeleted:
      text = `${t(TranslationKeys.NotificationExistingReminderPart)}${
        todoListName ? `"${todoListName}" ` : ""
      }${t(TranslationKeys.NotificationWasDeletedPart)}${actionCreatorPart}`;
      break;

    default:
      text = `${t(
        TranslationKeys.NotificationUnknownAction
      )}${todoListPart}${actionCreatorPart}}`;
  }

  return text;
};
