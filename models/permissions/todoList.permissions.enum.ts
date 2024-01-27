export enum TodoListPermissions {
  CanReadTodoList = "CAN_READ_TODOLIST",
  CanEditTodoList = "CAN_EDIT_TODOLIST",
  CanShareTodoList = "CAN_SHARE_TODOLIST",
  CanDeleteTodoList = "CAN_DELETE_TODOLIST",
  CanCreateTask = "CAN_CREATE_TASK",
  CanEditTask = "CAN_EDIT_TASK",
  //** responsible for both archiving and unarchiving */
  CanArchiveTask = "CAN_ARCHIVE_TASK",
  CanDeleteTask = "CAN_DELETE_TASK",
}

export enum TodoListRole {
  Viewer = "VIEWER",
  Member = "MEMBER",
  Admin = "ADMIN",
}
