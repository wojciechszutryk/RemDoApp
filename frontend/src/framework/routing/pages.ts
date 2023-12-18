import {
  URL_COLLABORANTS,
  URL_COLLABORATION,
} from "linked-models/collaboration/collaboration.urls";
import { URL_TASK, URL_TASKS } from "linked-models/task/task.urls";
import {
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";

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
  RemindersPage: {
    path: "/reminders",
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
};
