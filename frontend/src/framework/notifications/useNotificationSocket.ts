import { useNotifications } from "framework/notificationSocket/useNotifications";
import { CollaborationRequestedEvent } from "linked-models/event/implementation/collaboartion.events";
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
import useCreateTodoListNotificationMessage from "./useCreateNotificationMessage/useCreateNotificationMessage";
import { useInitializeNotificationSocket } from "./useInitializeNotificationSocket";

const useNotificationSocket = () => {
  const { notificationSocketReady, on } = useInitializeNotificationSocket();

  const { handleSocketNotification } = useNotifications();
  const createTodoListNotificationMessage =
    useCreateTodoListNotificationMessage();

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
            handleSocketNotification(
              notification,
              createTodoListNotificationMessage({
                action: notification.action,
                actionCreatorDisplayName: createdTodoList.assignedOwners.find(
                  (u) => u.id === notification.actionCreatorId
                )?.displayName,
                todoListName: createdTodoList.name,
              })
            );
            updateQueriesAfterCreatingTodoList(createdTodoList);
          }
        );
        on(
          TodoListUpdatedEvent,
          ({ notification, payload: updatedTodoList }) => {
            handleSocketNotification(
              notification,
              createTodoListNotificationMessage({
                action: notification.action,
                actionCreatorDisplayName: updatedTodoList.assignedOwners.find(
                  (u) => u.id === notification.actionCreatorId
                )?.displayName,
                todoListName: updatedTodoList.name,
              })
            );
            updateQueriesAfterEditingTodoList(updatedTodoList);
          }
        );
        on(
          TodoListDeletedEvent,
          ({ notification, payload: deletedTodoList }) => {
            handleSocketNotification(
              notification,
              createTodoListNotificationMessage({
                action: notification.action,
                actionCreatorDisplayName: userIdToUserMap.get(
                  notification.actionCreatorId
                )?.displayName,
                todoListName: deletedTodoList.name,
              })
            );
            updateQueriesAfterDeletingTodoList(deletedTodoList);
          }
        );

        on(TaskCreatedEvent, ({ notification, payload: { createdTask } }) => {
          handleSocketNotification(
            notification,
            createTodoListNotificationMessage({
              action: notification.action,
              actionCreatorDisplayName: userIdToUserMap.get(
                notification.actionCreatorId
              )?.displayName,
              todoListName: todoLists?.find(
                (td) => td.id === createdTask.todoListId
              )?.name,
              taskName: createdTask.text,
            })
          );
          updateQueriesAfterCreatingTask(createdTask);
        });
        on(TaskUpdatedEvent, ({ notification, payload: updatedTask }) => {
          handleSocketNotification(
            notification,
            createTodoListNotificationMessage({
              action: notification.action,
              actionCreatorDisplayName: userIdToUserMap.get(
                notification.actionCreatorId
              )?.displayName,
              todoListName: todoLists?.find(
                (td) => td.id === updatedTask.todoListId
              )?.name,
              taskName: updatedTask.text,
            })
          );
          updateQueriesAfterEditingTask(updatedTask, {
            todoListId: updatedTask.todoListId,
          });
        });
        on(TaskDeletedEvent, ({ notification, payload: deletedTask }) => {
          handleSocketNotification(
            notification,
            createTodoListNotificationMessage({
              action: notification.action,
              actionCreatorDisplayName: userIdToUserMap.get(
                notification.actionCreatorId
              )?.displayName,
              todoListName: todoLists?.find(
                (td) => td.id === deletedTask.todoListId
              )?.name,
              taskName: deletedTask.text,
            })
          );
          updateQueriesAfterDeletingTask(deletedTask);
        });
        on(
          CollaborationRequestedEvent,
          ({ notification, payload }) => {
            handleSocketNotification(notification, {
              action: notification.action,
              actionCreatorDisplayName: userIdToUserMap.get(
                notification.actionCreatorId
              )?.displayName,
              todoListName: todoLists?.find(
                (td) => td.id === deletedTask.todoListId
              )?.name,
              taskName: deletedTask.text,
            });
            updateQueriesAfterDeletingTask(deletedTask);
          }
        );
      }
    },
    // disabled because dependencies 'todoLists' and 'userIdToUserMap' and 'handleSocketNotification' cause invocation of socket.on() many times
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
