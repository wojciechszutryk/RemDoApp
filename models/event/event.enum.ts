export enum EventName {
  TaskCreated = "TASK_CREATED",
  TaskUpdated = "TASK_UPDATED",
  /**
   * Subtype of TaskUpdated, handled with same handler as TaskUpdated on BE, used to distinguish general update from changing start/finish date
   */
  TaskRescheduled = "TASK_RESCHEDULED",
  /**
   * Subtype of TaskUpdated, handled with same handler as TaskUpdated on BE, used to distinguish general update from changing completion date
   */
  TaskStateChanged = "TASK_STATE_CHANGED",
  TaskDeleted = "TASK_DELETED",
  TodoListCreated = "TODOLIST_CREATED",
  TodoListUpdated = "TODOLIST_UPDATED",
  TodoListDeleted = "TODOLIST_DELETED",
  TodoListMemberAdded = "TODOLIST_MEMBER_ADDED",
  TodoListMemberRemoved = "TODOLIST_MEMBER_REMOVED",

  CollaboartionRequested = "COLLABOARTION_REQUESTED",
  CollaboartionAccepted = "COLLABOARTION_ACCEPTED",
  CollaboartionReOpened = "COLLABOARTION_RE_OPENED",
  CollaboartionRejected = "COLLABOARTION_REJECTED",
  CollaboartionBlocked = "COLLABOARTION_BLOCKED",

  ReminderCreated = "REMINDER_CREATED",
  ReminderUpdated = "REMINDER_UPDATED",
  ReminderDeleted = "REMINDER_DELETED",

  ScheduleTaskNotification = "SCHEDULE_TASK_NOTIFICATION",
  ScheduleReminderNotification = "SCHEDULE_REMINDER_NOTIFICATION",
}

export enum EventSubject {
  Task = "TASK",
  TodoList = "TODOLIST",
  Collaboration = "COLLABORATION",
  Reminder = "REMINDER",
  ScheduleNotification = "SCHEDULE_NOTIFICATION",
}
