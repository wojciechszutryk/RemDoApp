import {
  CollaborationAcceptedEvent,
  CollaborationBlockedEvent,
  CollaborationRejectedEvent,
  CollaborationReopenedEvent,
  CollaborationRequestedEvent,
} from "linked-models/event/implementation/collaboartion.events";
import {
  ReminderCreatedEvent,
  ReminderDeletedEvent,
  ReminderUpdatedEvent,
} from "linked-models/event/implementation/reminder.events";
import {
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskUpdatedEvent,
} from "linked-models/event/implementation/task.events";
import {
  TodoListCreatedEvent,
  TodoListDeletedEvent,
  TodoListUpdatedEvent,
} from "linked-models/event/implementation/todoList.events";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import useUpdateQueriesAfterCreatingTask from "pages/SingleTodoListPage/mutations/createTask/useUpdateQueriesAfterCreatingTask";
import useUpdateQueriesAfterDeletingTask from "pages/SingleTodoListPage/mutations/deleteTask/useUpdateQueriesAfterDeletingTask";
import useUpdateQueriesAfterDeletingTodoList from "pages/SingleTodoListPage/mutations/deleteTodoList/useUpdateQueriesAfterDeletingTodoList";
import useUpdateQueriesAfterEditingTask from "pages/SingleTodoListPage/mutations/editTask/useUpdateQueriesAfterEditingTask";
import useUpdateQueriesAfterEditingTodoList from "pages/SingleTodoListPage/mutations/editTodoList/useUpdateQueriesAfterEditingTodoList";
import useUpdateQueriesAfterCreatingTodoList from "pages/TodoListsPage/mutations/createTodoList/useUpdateQueriesAfterCreatingTodoList";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createCollaborationNotificationMsg } from "./helpers/createCollaborationNotificationMsg";
import { createTodoNotificationMsg } from "./helpers/createTodoNotificationMsg";
import useAddNewNotification from "./hooks/useAddNewNotification";
import { useInitializeNotificationSocket } from "./useInitializeNotificationSocket";

const useNotificationSocket = () => {
  const { notificationSocketReady, on } = useInitializeNotificationSocket();
  const addNewNotification = useAddNewNotification();
  const { t } = useTranslation();

  const updateQueriesAfterCreatingTask = useUpdateQueriesAfterCreatingTask();
  const updateQueriesAfterDeletingTask = useUpdateQueriesAfterDeletingTask();
  const updateQueriesAfterDeletingTodoList =
    useUpdateQueriesAfterDeletingTodoList();
  const updateQueriesAfterEditingTask = useUpdateQueriesAfterEditingTask();
  const updateQueriesAfterEditingTodoList =
    useUpdateQueriesAfterEditingTodoList();
  const updateQueriesAfterCreatingTodoList =
    useUpdateQueriesAfterCreatingTodoList();

  const getUserTodoListsWithTasksQuery = useGetUserExtendedTodoListsQuery({
    enabled: !!false,
  });

  const todoLists = getUserTodoListsWithTasksQuery.data;

  const userIdToUserMap = useMemo(() => {
    const userIdToUserMap = new Map<string, IUserPublicDataDTO>();
    todoLists?.forEach((todoList) => {
      [...todoList.assignedOwners, ...todoList.assignedUsers].forEach((u) => {
        if (!userIdToUserMap.get(u.id)) {
          userIdToUserMap.set(u.id, u);
        }
      });
    });
    return userIdToUserMap;
  }, [todoLists]);

  useEffect(
    function handleNotificationSocketEvents() {
      if (notificationSocketReady) {
        on(
          TodoListCreatedEvent,
          ({ notification, payload: createdTodoList }) => {
            const creator = createdTodoList.assignedOwners.find(
              (u) => u.id === notification.actionCreatorId
            );
            addNewNotification(
              notification,
              createTodoNotificationMsg(
                {
                  action: notification.action,
                  actionCreatorDisplayName: creator?.displayName,
                  todoListName: createdTodoList.name,
                },
                t
              ),
              creator
            );
            updateQueriesAfterCreatingTodoList(createdTodoList);
          }
        );
        on(
          TodoListUpdatedEvent,
          ({ notification, payload: updatedTodoList }) => {
            const creator = updatedTodoList.assignedOwners.find(
              (u) => u.id === notification.actionCreatorId
            );
            addNewNotification(
              notification,
              createTodoNotificationMsg(
                {
                  action: notification.action,
                  actionCreatorDisplayName: creator?.displayName,
                  todoListName: updatedTodoList.name,
                },
                t
              ),
              creator
            );
            updateQueriesAfterEditingTodoList(updatedTodoList);
          }
        );
        on(
          TodoListDeletedEvent,
          ({ notification, payload: deletedTodoList }) => {
            const creator = userIdToUserMap.get(notification.actionCreatorId);
            addNewNotification(
              notification,
              createTodoNotificationMsg(
                {
                  action: notification.action,
                  actionCreatorDisplayName: creator?.displayName,
                  todoListName: deletedTodoList.name,
                },
                t
              ),
              creator
            );
            updateQueriesAfterDeletingTodoList(deletedTodoList);
          }
        );

        on(TaskCreatedEvent, ({ notification, payload: { createdTask } }) => {
          const creator = userIdToUserMap.get(notification.actionCreatorId);
          addNewNotification(
            notification,
            createTodoNotificationMsg(
              {
                action: notification.action,
                actionCreatorDisplayName: creator?.displayName,
                todoListName: todoLists?.find(
                  (td) => td.id === createdTask.todoListId
                )?.name,
                taskName: createdTask.text,
              },
              t
            ),
            creator
          );
          updateQueriesAfterCreatingTask(createdTask);
        });
        on(TaskUpdatedEvent, ({ notification, payload: updatedTask }) => {
          const creator = userIdToUserMap.get(notification.actionCreatorId);
          addNewNotification(
            notification,
            createTodoNotificationMsg(
              {
                action: notification.action,
                actionCreatorDisplayName: creator?.displayName,
                todoListName: todoLists?.find(
                  (td) => td.id === updatedTask.todoListId
                )?.name,
                taskName: updatedTask.text,
              },
              t
            ),
            creator
          );
          updateQueriesAfterEditingTask(updatedTask, {
            todoListId: updatedTask.todoListId,
          });
        });
        on(TaskDeletedEvent, ({ notification, payload: deletedTask }) => {
          const creator = userIdToUserMap.get(notification.actionCreatorId);
          addNewNotification(
            notification,
            createTodoNotificationMsg(
              {
                action: notification.action,
                actionCreatorDisplayName: creator?.displayName,
                todoListName: todoLists?.find(
                  (td) => td.id === deletedTask.todoListId
                )?.name,
                taskName: deletedTask.text,
              },
              t
            ),
            creator
          );
          updateQueriesAfterDeletingTask(deletedTask);
        });
        on(CollaborationRequestedEvent, ({ notification, payload }) => {
          addNewNotification(
            notification,
            createCollaborationNotificationMsg(
              notification.action,
              payload.displayName,
              t
            ),
            payload
          );
        });
        on(CollaborationAcceptedEvent, ({ notification, payload }) => {
          addNewNotification(
            notification,
            createCollaborationNotificationMsg(
              notification.action,
              payload.displayName,
              t
            ),
            payload
          );
        });
        on(CollaborationRejectedEvent, ({ notification, payload }) => {
          addNewNotification(
            notification,
            createCollaborationNotificationMsg(
              notification.action,
              payload.displayName,
              t
            ),
            payload
          );
        });
        on(CollaborationReopenedEvent, ({ notification, payload }) => {
          addNewNotification(
            notification,
            createCollaborationNotificationMsg(
              notification.action,
              payload.displayName,
              t
            ),
            payload
          );
        });
        on(CollaborationBlockedEvent, ({ notification, payload }) => {
          addNewNotification(
            notification,
            createCollaborationNotificationMsg(
              notification.action,
              payload.displayName,
              t
            ),
            payload
          );
        });
        on(ReminderCreatedEvent, ({ notification, payload }) => {
          addNewNotification(
            notification,
            createTodoNotificationMsg(
              {
                action: notification.action,
                actionCreatorDisplayName: payload.eventCreator.displayName,
                todoListName: payload.createdReminder.name,
                taskName: payload.createdReminder.text,
              },
              t
            ),
            payload.eventCreator
          );
        });
        on(ReminderUpdatedEvent, ({ notification, payload }) => {
          const creator = userIdToUserMap.get(notification.actionCreatorId);
          addNewNotification(
            notification,
            createTodoNotificationMsg(
              {
                action: notification.action,
                actionCreatorDisplayName: creator?.displayName,
                todoListName: payload.name,
                taskName: payload.text,
              },
              t
            ),
            creator
          );
        });
        on(ReminderDeletedEvent, ({ notification, payload }) => {
          const creator = userIdToUserMap.get(notification.actionCreatorId);
          addNewNotification(
            notification,
            createTodoNotificationMsg(
              {
                action: notification.action,
                actionCreatorDisplayName: creator?.displayName,
                todoListName: payload.name,
                taskName: payload.text,
              },
              t
            ),
            creator
          );
        });
      }
    },
    // disabled because dependencies 'todoLists' and 'userIdToUserMap' and 'addNewNotification' cause invocation of socket.on() many times
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      notificationSocketReady,
      on,
      updateQueriesAfterCreatingTask,
      updateQueriesAfterCreatingTodoList,
      updateQueriesAfterDeletingTask,
      updateQueriesAfterDeletingTodoList,
      updateQueriesAfterEditingTask,
      updateQueriesAfterEditingTodoList,
    ]
  );
};

export default useNotificationSocket;
