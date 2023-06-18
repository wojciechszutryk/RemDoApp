export const Pages = {
  HomePage: {
    path: "/",
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
