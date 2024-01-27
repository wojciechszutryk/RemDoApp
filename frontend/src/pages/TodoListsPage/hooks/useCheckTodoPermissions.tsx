import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useGetCurrentAccessLinkScopesQuery } from "hooks/queries/useGetCurrentAccessLinkScopes.query";
import { SHARE_HASH_PARAM } from "linked-models/accessLink/accessLink.url";
import {
  AssignedToTodoListAndTaskCreatorPermissions,
  AssignedToTodoListPermissions,
  TodoListViewerPermissions,
} from "linked-models/permissions/todoList.permissions.constants";
import {
  TodoListPermissions,
  TodoListRole,
} from "linked-models/permissions/todoList.permissions.enum";
import { useGetExtendedTodoListQuery } from "pages/SingleTodoListPage/queries/getTodoList.query";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const useCheckTodoPermissions = () => {
  const { todoListId } = useParams();
  const getUserTodoListsWithTasksQuery = useGetUserExtendedTodoListsQuery({
    enabled: !todoListId,
  });
  const getTodoListWithTasksQuery = useGetExtendedTodoListQuery(todoListId, {
    enabled: !!todoListId,
  });

  const data = todoListId
    ? getTodoListWithTasksQuery.data
    : getUserTodoListsWithTasksQuery.data;

  const [searchParams] = useSearchParams();
  const isAccessViaLink = !!searchParams.get(SHARE_HASH_PARAM);

  const getCurrentAccessLinkQuery = useGetCurrentAccessLinkScopesQuery({
    enabled: isAccessViaLink,
  });
  const { currentUser } = useCurrentUser();

  return useCallback(
    (permission: TodoListPermissions, todoListId: string, taskId?: string) => {
      const accessScopes = getCurrentAccessLinkQuery.data;
      const anonymousRole =
        !!accessScopes && accessScopes.todoListId === todoListId
          ? accessScopes.todoListRole
          : null;

      const todoList = Array.isArray(data)
        ? data?.find((todoList) => todoList.id === todoListId)
        : data?.id === todoListId
        ? data
        : null;

      if (!todoList) {
        return false;
      }

      const isCreator = todoList.creator.id === currentUser?.id;

      if (isCreator) {
        return true;
      }

      const isOwner =
        todoList.assignedOwners.some((m) => m.id === currentUser?.id) ||
        anonymousRole === TodoListRole.Admin;

      if (isOwner) {
        return true;
      }

      const isMember =
        todoList.assignedUsers.some((m) => m.id === currentUser?.id) ||
        anonymousRole === TodoListRole.Member;

      if (isMember) {
        const isTaskCreator = taskId
          ? todoList.tasks.some(
              (t) => t.creator?.id === currentUser?.id && t.id === taskId
            )
          : false;

        if (isTaskCreator) {
          return AssignedToTodoListAndTaskCreatorPermissions.includes(
            permission
          );
        } else {
          return AssignedToTodoListPermissions.includes(permission);
        }
      }

      const isViewer = anonymousRole === TodoListRole.Viewer;

      if (isViewer) return TodoListViewerPermissions.includes(permission);
    },
    [currentUser?.id, data, getCurrentAccessLinkQuery.data]
  );
};

export default useCheckTodoPermissions;
