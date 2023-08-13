export enum EventName {
  TaskCreated = "TASK_CREATED",
  TaskUpdated = "TASK_UPDATED",
  TaskDeleted = "TASK_DELETED",
  TodoListCreated = "TODOLIST_CREATED",
  TodoListUpdated = "TODOLIST_UPDATED",
  TodoListDeleted = "TODOLIST_DELETED",
  TodoListMemberAdded = "TODOLIST_MEMBER_ADDED",
  TodoListMemberRemoved = "TODOLIST_MEMBER_REMOVED",
  CollaboartionRequested = "COLLABOARTION_REQUESTED",
}

export enum EventSubject {
  Task = "TASK",
  TodoList = "TODOLIST",
  Collaboration = "COLLABORATION",
}
