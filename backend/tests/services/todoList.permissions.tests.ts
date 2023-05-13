import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  dropTestCollections,
  dropTestDB,
  setUpTestDB,
} from "../db.testSetup.helpers";

import { getTaskCollection } from "dbSchemas/task.schema";
import { getTodoListCollection } from "dbSchemas/todoList.schema";
import {
  AssignedToTodoListAndTaskCreatorPermissions,
  AssignedToTodoListPermissions,
} from "linked-models/permissions/todoList.permissions.constants";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { PermissionsService } from "services/permission.service";
import { TaskService } from "services/task.service";
import { TodoListService } from "services/TodoList.service";
import { MOCKED_TASK_ID } from "../mocks/task.mock";
import { MOCKED_TODO_ID } from "../mocks/todoList.mock";

describe(`TodoList permissions service`, () => {
  const todoListOwnerId = "OwnerId";
  const assignedUserId = "assignedUserId";
  const assignedOwnerId = "assignedOwnerId";
  let taskService: TaskService;
  let todoListService: TodoListService;
  let todoListPermissionsService: PermissionsService;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await Promise.all([
      getTodoListCollection().create({
        _id: MOCKED_TODO_ID,
        name: "todoList1",
        creator: todoListOwnerId,
        assignedUsers: [assignedUserId],
        assignedOwners: [assignedOwnerId],
        whenCreated: new Date(),
        whenUpdated: new Date(),
      }),
      getTaskCollection().create({
        _id: MOCKED_TASK_ID,
        text: "task1",
        important: true,
        todoListId: MOCKED_TODO_ID,
        creator: assignedUserId,
        whenCreated: new Date(),
        whenUpdated: new Date(),
      }),
      getTaskCollection().create({
        _id: "othertaskId_",
        text: "task2",
        todoListId: MOCKED_TODO_ID,
        creator: "some user",
        whenCreated: new Date(),
        whenUpdated: new Date(),
      }),
    ]);
    taskService = new TaskService(getTaskCollection());
    todoListService = new TodoListService(getTodoListCollection(), taskService);
    todoListPermissionsService = new PermissionsService(
      todoListService,
      taskService
    );
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return all permissions when user is owner of todoList`, async () => {
    const permissions = await todoListPermissionsService.getPermissionsForUser(
      todoListOwnerId,
      MOCKED_TODO_ID
    );

    expect(permissions).toEqual(Object.values(TodoListPermissions));
  });

  it(`should return all permissions when user is one of assignedOwners of todoList`, async () => {
    const permissions = await todoListPermissionsService.getPermissionsForUser(
      assignedOwnerId,
      MOCKED_TODO_ID
    );

    expect(permissions).toEqual(Object.values(TodoListPermissions));
  });

  it(`should return AssignedToTodoListAndTaskCreatorPermissions when user is one of assignedUsers of todoList and is creator of task`, async () => {
    const permissions = await todoListPermissionsService.getPermissionsForUser(
      assignedUserId,
      MOCKED_TODO_ID,
      MOCKED_TASK_ID
    );

    expect(permissions).toEqual(AssignedToTodoListAndTaskCreatorPermissions);
  });

  it(`should return AssignedToTodoListAndTaskCreatorPermissions when user is one of assignedUsers of todoList and is creator of task`, async () => {
    const permissions = await todoListPermissionsService.getPermissionsForUser(
      assignedUserId,
      MOCKED_TODO_ID,
      MOCKED_TASK_ID
    );

    expect(permissions).toEqual(AssignedToTodoListAndTaskCreatorPermissions);
  });

  it(`should return AssignedToTodoListPermissions when user is one of assignedUsers of todoList and is not creator of task`, async () => {
    const permissions = await todoListPermissionsService.getPermissionsForUser(
      assignedUserId,
      MOCKED_TODO_ID,
      "othertaskId_"
    );

    expect(permissions).toEqual(AssignedToTodoListPermissions);
  });

  it(`should return empty array when user neither owner nor assigned user of todoList`, async () => {
    const permissions = await todoListPermissionsService.getPermissionsForUser(
      "some user",
      MOCKED_TODO_ID,
      "othertaskId_"
    );

    expect(permissions).toEqual([]);
  });
});
