import { TranslationKeys } from "./translationKeys";

export const enTranslation: Record<TranslationKeys, string> = {
  [TranslationKeys.PageTitleMain]: "TodoList",
  [TranslationKeys.FieldRequired]: "* Required",

  [TranslationKeys.NoAccess]: "You are not allowed to access this resources.",

  [TranslationKeys.PageTitleHome]: "Home",
  [TranslationKeys.WelcomeTextHeader]: "TodoList",
  [TranslationKeys.WelcomeTextDescription]:
    "Welcome to our Todo/Reminder application! With our app, you can easily stay on top of your daily tasks and never forget an important appointment again. Our user-friendly interface and customizable features make it easy to create, organize, and prioritize your to-do lists and reminders. Get started today and take control of your busy schedule!",
  [TranslationKeys.LoginPanelSeparatorText]: "or",
  [TranslationKeys.GoToFeaturesButtonText]: "Explore features",
  [TranslationKeys.LoginPanelHeader]: "Sign in or Sign up",
  [TranslationKeys.SignInGoogle]: "With google:",
  [TranslationKeys.IntegrateWithGoogleDesc]:
    "To integrate with google you need to use same email as you current application email. If you use different new account will be created. After clicking button you will be redirected to google login page. After successful login you will be redirected back to our app.",
  [TranslationKeys.UserIntegratedWithGoogle]:
    "You are integrated with google already.",
  [TranslationKeys.Email]: "email",
  [TranslationKeys.JoinDate]: "date of joining",
  [TranslationKeys.DisplayName]: "nick name",
  [TranslationKeys.Password]: "password",
  [TranslationKeys.PasswordRepeat]: "password repeat",
  [TranslationKeys.LoginButtonText]: "sign in",
  [TranslationKeys.RegisterButtonText]: "sign up",
  [TranslationKeys.GoogleSignIn]: "google",
  [TranslationKeys.EmailRequired]: "email required",
  [TranslationKeys.DisplayNameRequired]: "name required",
  [TranslationKeys.PasswordRequired]: "password required",
  [TranslationKeys.WrongPassword]: "wrong password",
  [TranslationKeys.PasswordsNoMatch]: "passwords don't match",
  [TranslationKeys.LoginSuccess]: "Logged in successfully.",
  [TranslationKeys.InvalidCredentials]: "Invalid credentials, try again",
  [TranslationKeys.CurrentAccount]: "Your account",

  [TranslationKeys.PageTitleFeatures]: "Features",

  [TranslationKeys.PageTitleReminders]: "Reminders",
  [TranslationKeys.Reminder]: "Reminder",
  [TranslationKeys.ReminderInfo]:
    "Create new reminder. It will be visible only in yours callendar.",
  [TranslationKeys.ScopeChoose]: "Choose scope",
  [TranslationKeys.OrChooseTodoList]: "Or choose todo list",

  [TranslationKeys.Week]: "Week",
  [TranslationKeys.WorkWeek]: "WorkWeek",
  [TranslationKeys.Day]: "Day",
  [TranslationKeys.Month]: "Month",
  [TranslationKeys.Previous]: "Previous",
  [TranslationKeys.Next]: "Next",
  [TranslationKeys.Today]: "Today",
  [TranslationKeys.Agenda]: "Agenda",
  [TranslationKeys.NoEventsInRange]: "No events in this range",
  [TranslationKeys.AllDay]: "All day",
  [TranslationKeys.More]: "More",
  [TranslationKeys.Date]: "Date",
  [TranslationKeys.Time]: "Time",
  [TranslationKeys.Event]: "Event",

  [TranslationKeys.ShowMyCollaborations]: "Show my collaborations",
  [TranslationKeys.SearchForUser]: "Search for user",
  [TranslationKeys.InviteCollaborants]: "Invite someone",
  [TranslationKeys.YouHaveNoCollaborants]: "You have no collaborators",
  [TranslationKeys.EmptySearchResults]: "No search results for given criteria",
  [TranslationKeys.InviteUser]: "Invite user to collaborate",
  [TranslationKeys.CollaborationPending]: "Collaboration pending",
  [TranslationKeys.CollaborationAccepted]: "Collaboration accepted",
  [TranslationKeys.CollaborationRejected]: "Collaboration rejected",
  [TranslationKeys.CollaborationBlocked]: "Collaboration with user is blocked",
  [TranslationKeys.CollaborationReOpened]: "Collaboration re-opened",
  [TranslationKeys.WaitingForAcceptance]:
    "Waiting for user to accept invitation",
  [TranslationKeys.Accept]: "Accept",
  [TranslationKeys.Reject]: "Reject",
  [TranslationKeys.AlreadyCollaborant]: "You and this user are collaborators",
  [TranslationKeys.DeleteCollaboration]: "Delete user from collaborators list",
  [TranslationKeys.UserRejectedCollaboration]: "User rejected collaboration",
  [TranslationKeys.InviteAgain]: "Invite again",
  [TranslationKeys.YouRejectedButCanAccept]:
    "You rejected invitation, but you can accept it again",
  [TranslationKeys.YouBlockedButCanUnblock]:
    "You blocked user, but you can unblock him",
  [TranslationKeys.Block]: "Block",
  [TranslationKeys.Unblock]: "Unblock",

  [TranslationKeys.PageTitleTodoLists]: "TodoLists",
  [TranslationKeys.EmptyTodoLists]: "There are no todo lists. Create one!",
  [TranslationKeys.CreateNewTodoList]: "Create new todo list",
  [TranslationKeys.CreateTodoListDialogHeader]: "Create new todo list",
  [TranslationKeys.EditTodoListDialogHeader]: "Edit todo list",
  [TranslationKeys.ShareTodoList]: "Share todo list",
  [TranslationKeys.TodoListDialogInputTitle]: "List title",
  [TranslationKeys.TodoListDialogButton]: "Save",
  [TranslationKeys.ManageOwners]: "Manage owners",
  [TranslationKeys.ManageUsers]: "Manage users",
  [TranslationKeys.CurrentOwners]: "Owners",
  [TranslationKeys.CurrentUsers]: "Users",
  [TranslationKeys.DelteTodoList]: "Delete todo list",
  [TranslationKeys.DelteTodoListWarning]:
    "Are you sure you want to delete this todo list? This action cannot be undone. All tasks in this list will be deleted.",
  [TranslationKeys.Other]: "Other",
  [TranslationKeys.BackToTodoLists]: "Back to todo lists",

  [TranslationKeys.EmptyTasksList]: "No tasks in this list.",
  [TranslationKeys.DelteTask]: "Delete task",
  [TranslationKeys.AddTask]: "Add task",
  [TranslationKeys.EditTask]: "Edit task",
  [TranslationKeys.TaskName]: "Task name",
  [TranslationKeys.TaskImportant]: "Important",
  [TranslationKeys.DelteTaskWarning]:
    "Are you sure you want to delete this task? This action cannot be undone.",
  [TranslationKeys.TaskMarkedAsFinishedWithDate]:
    "Task was marked as finished with date",
  [TranslationKeys.TaskIsOnFinishedList]:
    "It is visible on finished tasks list.",
  [TranslationKeys.StartDate]: "Planned start date",
  [TranslationKeys.FinishDate]: "Planned finish date",
  [TranslationKeys.CompletionDate]: "Completion date",
  [TranslationKeys.Creator]: "Creator",
  [TranslationKeys.Days]: "days",
  [TranslationKeys.Hours]: "hours",
  [TranslationKeys.Ago]: "ago",

  [TranslationKeys.Notifications]: "Notifications",
  [TranslationKeys.ArchivedNotifications]: "Archived notifications",
  [TranslationKeys.ArchiveAll]: "Archive all",
  [TranslationKeys.UnarchiveAll]: "Unarchive all",
  [TranslationKeys.DeleteAllArchived]: "Delete all archived",
  [TranslationKeys.EmptyNotificationsList]: "There are no new notifications.",
  [TranslationKeys.EmptyArchivedNotificationsList]:
    "No archived notifications.",

  // Notifications messages
  [TranslationKeys.NotificationByUserPart]: ", by user: ",
  [TranslationKeys.NotificationInTodoListPart]: ", in todo list: ",
  [TranslationKeys.NotificationNewTodoListPart]: "New todo list ",
  [TranslationKeys.NotificationExistingTodoListPart]: "Todo list ",
  [TranslationKeys.NotificationNewTaskPart]: "New task ",
  [TranslationKeys.NotificationExistingTaskPart]: "Task ",
  [TranslationKeys.NotificationWasCreatedPart]: "was created ",
  [TranslationKeys.NotificationWasModifiedPart]: "was modified ",
  [TranslationKeys.NotificationWasDeletedPart]: "was deleted ",
  [TranslationKeys.NotificationUserInvitedPart]:
    "You've been invited to todo list ",
  [TranslationKeys.NotificationUserRemovedPart]:
    "You've been removed from members of todo list ",
  [TranslationKeys.NotificationUnknownAction]: "Unknown action was done",
  [TranslationKeys.UserSendYouCollaborationRequest]:
    "sent you collaboration request.",
  [TranslationKeys.UserAcceptedYourCollaborationRequest]:
    "accepted your collaboration request.",
  [TranslationKeys.UserRejectedYourCollaborationRequest]:
    "rejected your collaboration request.",
  [TranslationKeys.UserSendYouCollaborationSecondRequest]:
    "sent you collaboration request for second time.",
  [TranslationKeys.UserBlockedCollaborationWithYou]:
    "blocked collaboration with you.",

  [TranslationKeys.PageTitleUserSettings]: "User settings",
  [TranslationKeys.CurrentPasswordLabel]: "current password",
  [TranslationKeys.ChangePassword]: "Change password",
  [TranslationKeys.NewPasswordLabel]: "new password",
  [TranslationKeys.NewPasswordRepeatLabel]: "new password repeat",
  [TranslationKeys.PasswordChanged]: "New password set.",
  [TranslationKeys.ChangePassword]: "Change password",
  [TranslationKeys.ChangeAvatar]: "Change avatar",
  [TranslationKeys.GoogleIntegration]: "Google integration",
  [TranslationKeys.AvatarChanged]: "Avatar saved",
  [TranslationKeys.DispalyNameChanged]: "New display name set.",
  [TranslationKeys.ChangeDisplayName]: "Change display name",
  [TranslationKeys.Logout]: "Logout",
  [TranslationKeys.Theme]: "Theme",
  [TranslationKeys.LanguagePolish]: "Polish language",
  [TranslationKeys.LanguageEnglish]: "English language",

  [TranslationKeys.Save]: "Save",
  [TranslationKeys.Cancel]: "Anuluj",
  [TranslationKeys.Details]: "Details",
};
