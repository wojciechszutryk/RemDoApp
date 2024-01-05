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
import useUpdateQueriesAfterCreatingReminder from "pages/RemindersPage/mutations/createReminder/useUpdateQueriesAfterCreatingReminder";
import useUpdateQueriesAfterDeletingReminder from "pages/RemindersPage/mutations/deleteReminder/useUpdateQueriesAfterDeletingReminder";
import useUpdateQueriesAfterEditingReminder from "pages/RemindersPage/mutations/editReminder/useUpdateQueriesAfterEditingReminder";
import useUpdateQueriesAfterCreatingTask from "pages/SingleTodoListPage/mutations/createTask/useUpdateQueriesAfterCreatingTask";
import useUpdateQueriesAfterDeletingTask from "pages/SingleTodoListPage/mutations/deleteTask/useUpdateQueriesAfterDeletingTask";
import useUpdateQueriesAfterDeletingTodoList from "pages/SingleTodoListPage/mutations/deleteTodoList/useUpdateQueriesAfterDeletingTodoList";
import useUpdateQueriesAfterEditingTask from "pages/SingleTodoListPage/mutations/editTask/useUpdateQueriesAfterEditingTask";
import useUpdateQueriesAfterEditingTodoList from "pages/SingleTodoListPage/mutations/editTodoList/useUpdateQueriesAfterEditingTodoList";
import useUpdateQueriesAfterCreatingTodoList from "pages/TodoListsPage/mutations/createTodoList/useUpdateQueriesAfterCreatingTodoList";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { useEffect, useMemo } from "react";
import useAddNewNotification from "./hooks/useAddNewNotification";
import { useInitializeNotificationSocket } from "./useInitializeNotificationSocket";

const useNotificationSocket = () => {
  const { notificationSocketReady, on } = useInitializeNotificationSocket();
  const addNewNotification = useAddNewNotification();

  const updateQueriesAfterCreatingTodoList =
    useUpdateQueriesAfterCreatingTodoList();
  const updateQueriesAfterEditingTodoList =
    useUpdateQueriesAfterEditingTodoList();
  const updateQueriesAfterDeletingTodoList =
    useUpdateQueriesAfterDeletingTodoList();
  const updateQueriesAfterCreatingTask = useUpdateQueriesAfterCreatingTask();
  const updateQueriesAfterDeletingTask = useUpdateQueriesAfterDeletingTask();
  const updateQueriesAfterEditingTask = useUpdateQueriesAfterEditingTask();
  const updateQueriesAfterCreatingReminder =
    useUpdateQueriesAfterCreatingReminder();
  const updateQueriesAfterDeletingReminder =
    useUpdateQueriesAfterDeletingReminder();
  const updateQueriesAfterEditingReminder =
    useUpdateQueriesAfterEditingReminder();

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
          ({ notification, payload: createdTodoList, message }) => {
            const creator = createdTodoList.assignedOwners.find(
              (u) => u.id === notification.actionCreatorId
            );
            addNewNotification(notification, message, creator);
            updateQueriesAfterCreatingTodoList(createdTodoList);
          }
        );
        on(
          TodoListUpdatedEvent,
          ({ notification, payload: updatedTodoList, message }) => {
            const creator = updatedTodoList.assignedOwners.find(
              (u) => u.id === notification.actionCreatorId
            );
            addNewNotification(notification, message, creator);
            updateQueriesAfterEditingTodoList(updatedTodoList);
          }
        );
        on(
          TodoListDeletedEvent,
          ({ notification, payload: deletedTodoList, message }) => {
            const creator = userIdToUserMap.get(notification.actionCreatorId);
            addNewNotification(notification, message, creator);
            updateQueriesAfterDeletingTodoList(deletedTodoList);
          }
        );

        on(
          TaskCreatedEvent,
          ({ notification, payload: { payload, eventCreator }, message }) => {
            addNewNotification(notification, message, eventCreator);
            updateQueriesAfterCreatingTask(payload);
          }
        );
        on(
          TaskUpdatedEvent,
          ({ notification, payload: { payload, eventCreator }, message }) => {
            addNewNotification(notification, message, eventCreator);
            updateQueriesAfterEditingTask(payload, {
              todoListId: payload.todoListId,
            });
          }
        );
        on(
          TaskDeletedEvent,
          ({ notification, payload: deletedTask, message }) => {
            const creator = userIdToUserMap.get(notification.actionCreatorId);
            addNewNotification(notification, message, creator);
            updateQueriesAfterDeletingTask(deletedTask);
          }
        );
        on(
          CollaborationRequestedEvent,
          ({ notification, payload, message }) => {
            addNewNotification(notification, message, payload);
          }
        );
        on(CollaborationAcceptedEvent, ({ notification, payload, message }) => {
          addNewNotification(notification, message, payload);
        });
        on(CollaborationRejectedEvent, ({ notification, payload, message }) => {
          addNewNotification(notification, message, payload);
        });
        on(CollaborationReopenedEvent, ({ notification, payload, message }) => {
          addNewNotification(notification, message, payload);
        });
        on(CollaborationBlockedEvent, ({ notification, payload, message }) => {
          addNewNotification(notification, message, payload);
        });
        on(
          ReminderCreatedEvent,
          ({ notification, payload: { payload, eventCreator }, message }) => {
            addNewNotification(notification, message, eventCreator);
            updateQueriesAfterCreatingReminder(payload);
          }
        );
        on(
          ReminderUpdatedEvent,
          ({ notification, payload: { payload, eventCreator }, message }) => {
            addNewNotification(notification, message, eventCreator);
            updateQueriesAfterEditingReminder(payload);
          }
        );
        on(ReminderDeletedEvent, ({ notification, payload, message }) => {
          const creator = userIdToUserMap.get(notification.actionCreatorId);
          addNewNotification(notification, message, creator);
          updateQueriesAfterDeletingReminder(payload);
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
