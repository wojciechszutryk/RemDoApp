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
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe(`When calling createTodoList`, () => {
  let todoListService = {} as TodoListService;
  let todoListController = {} as TodoListController;
  const mockedUser = {
    id: "000000000000",
    displayName: "User1",
    email: "user1@email.com",
    token: "token",
    whenCreated: new Date(),
    whenUpdated: new Date(),
    password: "hashedPassword",
  };

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getTodoListCollection().create({
      _id: "111111111111",
      name: "todoList1",
      creator: "User1",
      whenCreated: new Date(),
      whenUpdated: new Date(),
    });
    await getTaskCollection().create({
      _id: "222222222222",
      text: "task1",
      important: true,
      todoListId: "todoList1",
      creator: "User1",
      whenCreated: new Date(),
      whenUpdated: new Date(),
    });

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

  it(`should return HTTP 400 status code when trying to upadate todoList that doesn't exist`, async () => {
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

  it(`should return HTTP 200 status code when trying to upadate correct todoList`, async () => {
    const update = {
      name: "correct name",
    } as unknown as Partial<ITodoList>;

    const result = await todoListController.updateTodoList(
      "111111111111",
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
    const result = await todoListController.deleteTodoList("111111111111");
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });
});
