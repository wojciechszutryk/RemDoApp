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
import { getUserCollection } from "dbSchemas/user.schema";
import { EventService } from "framework/events/event.service";
import { interfaces } from "inversify-express-utils";
import { AppLanguages } from "linked-models/language/languages.enum";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { IUser, NotificationPreferences } from "linked-models/user/user.model";
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
import { TaskService } from "services/task/task.service";
import { TodoListService } from "services/todoList/todoList.service";
import { UserService } from "services/user/user.service";
import { ID_THAT_DOES_NOT_EXITS } from "../mocks/constants.mock";
import { mockedTask } from "../mocks/task.mock";
import { MOCKED_TODO_ID, mockedTodoList } from "../mocks/todoList.mock";
import { MOCKED_USER_ID } from "../mocks/user.mock";

describe(`TodoList service`, () => {
  const testUserId = mockedTodoList.creatorId;
  let taskService: TaskService;
  let todoListService: TodoListService;
  let eventService: EventService;
  let scheduleNotificationService: ScheduleNotificationService;
  let userService: UserService;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await Promise.all([
      getTodoListCollection().create(mockedTodoList),
      getTodoListCollection().create({
        _id: "some_todo_id",
        name: "todoList2",
        creatorId: "some user id",
        assignedUsers: [testUserId],
        whenCreated: new Date(),
        whenUpdated: new Date(),
        icon: TodoListIconEnum.Child,
      } as ITodoList),
      getTaskCollection().create(mockedTask),
      getUserCollection().create({
        _id: testUserId,
        displayName: "test user",
        email: "email",
        preferences: {
          language: AppLanguages.en,
          theme: "dark",
          notificationPreferences: {} as NotificationPreferences,
        },
        whenCreated: new Date(),
      } as IUser),
    ]);
    eventService = new EventService({} as interfaces.HttpContext);
    scheduleNotificationService = new ScheduleNotificationService();
    taskService = new TaskService(
      getTaskCollection(),
      eventService,
      scheduleNotificationService
    );
    userService = new UserService(getUserCollection());
    todoListService = new TodoListService(
      getTodoListCollection(),
      taskService,
      userService,
      scheduleNotificationService,
      eventService
    );
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return todoList with given todoListId`, async () => {
    const todoLists = await todoListService.getTodoListById(MOCKED_TODO_ID);

    expect(todoLists?.name).toEqual(mockedTodoList.name);
  });

  it(`should return todoLists that are owned by user or user is assigned to`, async () => {
    const todoLists = await todoListService.getTodoListsForUser(testUserId);

    const todoListNames = todoLists.map((todoList) => todoList.name);
    expect(todoLists.length).toEqual(2);
    expect(todoListNames).toContain(mockedTodoList.name);
    expect(todoListNames).toContain("todoList2");
  });

  it(`should create and return new todoList`, async () => {
    const todoListToCreate = {
      icon: TodoListIconEnum.Child,
      name: "todoList1",
    };

    const todoList = await todoListService.createTodoList(
      todoListToCreate,
      testUserId,
      false,
      false
    );

    expect(todoList.name).toEqual(todoListToCreate.name);
  });

  it(`should update and return new todoList`, async () => {
    const todoListToUpdate = {
      name: "updatedTodoListName",
    };
    const todoList = await todoListService.updateTodoList(
      MOCKED_TODO_ID,
      todoListToUpdate,
      MOCKED_USER_ID,
      false
    );

    expect(todoList.name).toEqual(todoListToUpdate.name);
  });

  it(`should throw proper error when trying to update todoList that does not exist`, async () => {
    const todoListToUpdate = {
      name: "updatedTodoListName",
    };
    expect(
      async () =>
        await todoListService.updateTodoList(
          ID_THAT_DOES_NOT_EXITS,
          todoListToUpdate,
          MOCKED_USER_ID
        )
    ).rejects.toThrow(
      `Cannot update todoList: ${ID_THAT_DOES_NOT_EXITS}, because it does not exist.`
    );
  });

  it(`should delete task`, async () => {
    const todoListBeforeDelete = await todoListService.getTodoListById(
      MOCKED_TODO_ID
    );

    expect(todoListBeforeDelete?.name).toEqual(mockedTodoList.name);

    await todoListService.deleteTodoList(MOCKED_TODO_ID, MOCKED_USER_ID);
    const todoListAfterDelete = await todoListService.getTodoListById(
      MOCKED_TODO_ID
    );
    expect(todoListAfterDelete).toEqual(undefined);
  });

  it(`should throw proper error when trying to delete todoList that does not exist`, async () => {
    expect(
      async () =>
        await todoListService.deleteTodoList(
          ID_THAT_DOES_NOT_EXITS,
          MOCKED_USER_ID
        )
    ).rejects.toThrow(
      `Cannot delete todoList: ${ID_THAT_DOES_NOT_EXITS}, because it does not exist.`
    );
  });
});
