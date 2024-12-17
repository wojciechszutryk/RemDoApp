import { URL_SHARED } from "linked-models/accessLink/accessLink.url";
import {
  URL_COLLABORANTS,
  URL_COLLABORATION,
} from "linked-models/collaboration/collaboration.urls";
import { URL_TASK, URL_TASKS } from "linked-models/task/task.urls";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import {
  URL_FORGET_PASSWORD,
  URL_USER,
  URL_USERS,
  URL_VERIFY_ACCOUNT,
} from "linked-models/user/user.urls";

export const Pages = {
  HomePage: {
    path: "/",
  },
  CollaborantsPage: {
    path: URL_COLLABORANTS,
    Collaborant: {
      path: `${URL_COLLABORANTS}${URL_COLLABORATION()}`,
    },
  },
  FeaturesPage: {
    path: "/features",
  },
  RegisterPage: {
    path: "/register",
  },
  UserPage: {
    path: "/user",
    ChangePassword: {
      path: "/changePassword",
    },
    ChangeDisplayName: {
      path: "/changePassword",
    },
    ChangeAvatar: {
      path: "/changePassword",
    },
  },
  LoginPage: {
    path: "/login",
  },
  VerifyAccountPage: {
    path: (userId?: string) =>
      `${URL_USERS}${URL_USER(userId)}${URL_VERIFY_ACCOUNT}`,
  },
  RemindersPage: {
    path: (highlightTodoListId?: string, initialDate?: string) => {
      const base = "/reminders";
      if (!initialDate && !highlightTodoListId) return base;

      const params = new URLSearchParams();
      if (highlightTodoListId)
        params.set("highlightTodoListId", highlightTodoListId);
      if (initialDate) params.set("initialDate", initialDate);

      const paramsString = params.toString();

      return `${base}?${paramsString}`;
    },
  },
  TodoListsPage: {
    path: URL_TODO_LISTS,
  },
  TodoListPage: {
    path: (todoListId?: string) =>
      `${URL_TODO_LISTS}${URL_TODO_LIST(todoListId)}`,
  },
  TaskPage: {
    path: (todoListId?: string, taskId?: string) =>
      `${URL_TODO_LISTS}${URL_TODO_LIST(todoListId)}${URL_TASKS}${URL_TASK(
        taskId
      )}`,
  },
  SharedForgotPasswordPage: {
    path: (userId?: string) =>
      `${URL_SHARED}${URL_FORGET_PASSWORD}${URL_USERS}${URL_USER(userId)}`,
  },
  SharedTodoListPage: {
    path: (todoListId?: string) =>
      `${URL_SHARED}${URL_TODO_LISTS}${URL_TODO_LIST(todoListId)}`,
  },
};
