import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { TodoListsController } from "controllers/todoList/todoLists.controller";
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
import { mockedTodoList } from "../mocks/todoList.mock";
import { mockedUser } from "../mocks/user.mock";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe(`When calling todoLists controller`, () => {
  let todoListService = {} as TodoListService;
  let todoListsController = {} as TodoListsController;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getTodoListCollection().create(mockedTodoList);
    await getTaskCollection().create(mockedTask);

    const taskService = new TaskService(getTaskCollection());
    todoListService = new TodoListService(getTodoListCollection(), taskService);
    todoListsController = new TodoListsController(todoListService);
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return HTTP 200 status code when trying get todoList of user`, async () => {
    const result = await todoListsController.getTodoListsForUser(mockedUser);
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });

  it(`should return HTTP 400 when trying to create new todoList without field 'name' passed inside body`, async () => {
    const newTodoList = {
      name1: "wrong name",
    } as unknown as ITodoList;

    const result = await todoListsController.createTodoList(
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

    const result = await todoListsController.createTodoList(
      mockedUser,
      newTodoList
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });
});
