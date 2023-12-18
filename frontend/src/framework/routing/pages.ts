import {
  URL_COLLABORANTS,
  URL_COLLABORATION,
} from "linked-models/collaboration/collaboration.urls";

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
    path: "/todoLists",
  },
  TodoListPage: {
    path: (todoListId?: string) => `/todoLists/${todoListId || ":todoListId"}`,
  },
  TaskPage: {
    path: (todoListId?: string, taskId?: string) =>
      `/todoLists/${todoListId || ":todoListId"}/task/${taskId || ":taskId"}`,
  },
};
