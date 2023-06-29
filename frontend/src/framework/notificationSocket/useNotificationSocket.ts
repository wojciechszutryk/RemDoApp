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
import { useInitializeNotificationSocket } from "./useInitializeNotificationSocket";
import { useNotifications } from "./useNotifications";

const useNotificationSocket = () => {
  const { notificationSocketReady, on } = useInitializeNotificationSocket();

  const { handleSocketNotification } = useNotifications();

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
            handleSocketNotification(notification, {
              action: notification.action,
              actionCreatorDisplayName: createdTodoList.assignedOwners.find(
                (u) => u.id === notification.actionCreatorId
              )?.displayName,
              todoListName: createdTodoList.name,
            });
            updateQueriesAfterCreatingTodoList(createdTodoList);
          }
        );
        on(
          TodoListUpdatedEvent,
          ({ notification, payload: updatedTodoList }) => {
            handleSocketNotification(notification, {
              action: notification.action,
              actionCreatorDisplayName: updatedTodoList.assignedOwners.find(
                (u) => u.id === notification.actionCreatorId
              )?.displayName,
              todoListName: updatedTodoList.name,
            });
            updateQueriesAfterEditingTodoList(updatedTodoList);
          }
        );
        on(
          TodoListDeletedEvent,
          ({ notification, payload: deletedTodoList }) => {
            handleSocketNotification(notification, {
              action: notification.action,
              actionCreatorDisplayName: userIdToUserMap.get(
                notification.actionCreatorId
              )?.displayName,
              todoListName: deletedTodoList.name,
            });
            updateQueriesAfterDeletingTodoList(deletedTodoList);
          }
        );

        on(TaskCreatedEvent, ({ notification, payload: createTask }) => {
          handleSocketNotification(notification, {
            action: notification.action,
            actionCreatorDisplayName: userIdToUserMap.get(
              notification.actionCreatorId
            )?.displayName,
            todoListName: todoLists?.find(
              (td) => td.id === createTask.todoListId
            )?.name,
            taskName: createTask.text,
          });
          updateQueriesAfterCreatingTask(createTask);
        });
        on(TaskUpdatedEvent, ({ notification, payload: updatedTask }) => {
          handleSocketNotification(notification, {
            action: notification.action,
            actionCreatorDisplayName: userIdToUserMap.get(
              notification.actionCreatorId
            )?.displayName,
            todoListName: todoLists?.find(
              (td) => td.id === updatedTask.todoListId
            )?.name,
            taskName: updatedTask.text,
          });
          updateQueriesAfterEditingTask(updatedTask, {
            todoListId: updatedTask.todoListId,
          });
        });
        on(TaskDeletedEvent, ({ notification, payload: deletedTask }) => {
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
        });
      }
    },
    // disabled because dependencies 'todoLists' and 'userIdToUserMap' cause invocation of socket.on() many times
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      handleSocketNotification,
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
