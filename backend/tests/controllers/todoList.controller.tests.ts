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
import { ITodoList } from "linked-models/todoList/todoList.model";
import { IUserAttached } from "linked-models/User/User.model";
import { TaskService } from "services/task.service";
import { TodoListService } from "services/TodoList.service";
import {
  dropTestCollections,
  dropTestDB,
  setUpTestDB,
} from "../db.testSetup.helpers";
import { mockedTask } from "../mocks/task.mock";
import { mockedTodoList, MOCKED_TODO_ID } from "../mocks/todoList.mock";
import { mockedUser } from "../mocks/user.mock";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe(`When calling todoList controller`, () => {
  let todoListService = {} as TodoListService;
  let todoListController = {} as TodoListController;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getTodoListCollection().create(mockedTodoList);
    await getTaskCollection().create(mockedTask);

    const taskService = new TaskService(getTaskCollection());
    todoListService = new TodoListService(getTodoListCollection(), taskService);
    todoListController = new TodoListController(todoListService);
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return HTTP 200 status code when trying get todoList of user`, async () => {
    const result = await todoListController.getTodoListsForUser(mockedUser);
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });

  it(`should return HTTP 400 when trying to create new todoList without field 'name' passed inside body`, async () => {
    const newTodoList = {
      name1: "wrong name",
    } as unknown as ITodoList;

    const result = await todoListController.createTodoList(
      {} as IUserAttached,
      newTodoList
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
  });

  it(`should return HTTP 200 status code when trying to create correct todoList`, async () => {
    const newTodoList = {
      name: "correct name",
    } as unknown as ITodoList;

    const result = await todoListController.createTodoList(
      mockedUser,
      newTodoList
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });

  it(`should return HTTP 400 status code when trying to update todoList that doesn't exist`, async () => {
    const update = {
      name: "correct name",
    } as unknown as Partial<ITodoList>;

    const result = await todoListController.updateTodoList(
      "incorrect id",
      update
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
      update
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });

  it(`should return HTTP 400 status code when trying to delete todoList that doesn't exist`, async () => {
    const result = await todoListController.deleteTodoList("invalid id");
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
  });

  it(`should return HTTP 200 status code when trying to delete correct todoList`, async () => {
    const result = await todoListController.deleteTodoList(MOCKED_TODO_ID);
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });
});
