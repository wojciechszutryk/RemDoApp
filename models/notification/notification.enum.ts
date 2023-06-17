export enum UserNotificationState {
  Archived = "ARCHIVED",
  Fresh = "FRESH",
  Read = "READ",
}

export enum NotificationAction {
  TaskCreated = "TASK_CREATED",
  TaskUpdated = "TASK_UPDATED",
  TaskDeleted = "TASK_DELETED",
  TodoListCreated = "TODOLIST_CREATED",
  TodoListUpdated = "TODOLIST_UPDATED",
  TodoListDeleted = "TODOLIST_DELETED",
  TodoListMemberAdded = "TODOLIST_MEMBER_ADDED",
  TodoListMemberRemoved = "TODOLIST_MEMBER_REMOVED",
}
