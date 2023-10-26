import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { TodoListController } from "controllers/todoList/todoList.controller";
import { getTaskCollection } from "dbSchemas/task.schema";
import { getTodoListCollection } from "dbSchemas/todoList.schema";
import { getUserCollection } from "dbSchemas/user.schema";
import { EventService } from "framework/events/event.service";
import { interfaces } from "inversify-express-utils";
import { AppLanguages } from "linked-models/language/languages.enum";
import { ITodoList } from "linked-models/todoList/todoList.model";
import {
  IUser,
  IUserAttached,
  NotificationPreferences,
} from "linked-models/user/user.model";
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
import { TaskService } from "services/task/task.service";
import { TodoListService } from "services/todoList/todoList.service";
import { UserService } from "services/user/user.service";
import {
  dropTestCollections,
  dropTestDB,
  setUpTestDB,
} from "../db.testSetup.helpers";
import { mockedTask } from "../mocks/task.mock";
import { MOCKED_TODO_ID, mockedTodoList } from "../mocks/todoList.mock";
import { MOCKED_USER_ID } from "../mocks/user.mock";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe(`When calling todoList controller`, () => {
  let todoListService = {} as TodoListService;
  let todoListController = {} as TodoListController;
  let eventService: EventService;
  let scheduleNotificationService: ScheduleNotificationService;
  let userService = {} as UserService;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await Promise.all([
      getTodoListCollection().create(mockedTodoList),
      getTaskCollection().create(mockedTask),
      getUserCollection().create({
        _id: "mockedUser12",
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

    const taskService = new TaskService(
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
    todoListController = new TodoListController(todoListService, taskService);
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return HTTP 400 status code when trying to update todoList that doesn't exist`, async () => {
    const update = {
      name: "correct name",
    } as unknown as Partial<ITodoList>;

    const result = await todoListController.updateTodoList(
      "incorrect id",
      update,
      { id: MOCKED_USER_ID } as IUserAttached
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
  });

  it(`should return HTTP 200 status code when trying to update correct todoList`, async () => {
    const update = {
      name: "correct name",
    } as unknown as Partial<ITodoList>;

    const result = await todoListController.updateTodoList(
      MOCKED_TODO_ID,
      update,
      { id: "mockedUser12" } as IUserAttached
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });

  it(`should return HTTP 400 status code when trying to delete todoList that doesn't exist`, async () => {
    const result = await todoListController.deleteTodoList("invalid id", {
      id: MOCKED_USER_ID,
    } as IUserAttached);
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
  });

  it(`should return HTTP 200 status code when trying to delete correct todoList`, async () => {
    const result = await todoListController.deleteTodoList(MOCKED_TODO_ID, {
      id: MOCKED_USER_ID,
    } as IUserAttached);
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });
});
