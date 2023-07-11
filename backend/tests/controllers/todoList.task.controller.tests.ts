import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { TodoListTaskController } from "controllers/todoList/todoList.task.controller";
import { getTaskCollection } from "dbSchemas/task.schema";
import { ITask } from "linked-models/task/task.model";
import { TaskService } from "services/task/task.service";
import {
  dropTestCollections,
  dropTestDB,
  setUpTestDB,
} from "../db.testSetup.helpers";
import { MOCKED_TASK_ID, mockedTask } from "../mocks/task.mock";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe(`When calling todoListTask controller`, () => {
  let todoListTaskController = {} as TodoListTaskController;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getTaskCollection().create(mockedTask);

    const taskService = new TaskService(getTaskCollection());
    todoListTaskController = new TodoListTaskController(taskService);
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return HTTP 400 status code and proper response content when trying to update task that is invalid`, async () => {
    const incorrectUpdate = {} as unknown as Partial<ITask>;

    const result = await todoListTaskController.editTaskInTodoList(
      "some id",
      incorrectUpdate
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
    expect(response.content).toEqual({
      _headers: { "content-type": "application/json" },
      content: '"Invalid data"',
    });
  });

  it(`should return HTTP 400 status code when trying to update task that doesn't exist`, async () => {
    const update = {
      text: "updatedText",
    } as unknown as Partial<ITask>;

    const result = await todoListTaskController.editTaskInTodoList(
      "incorrect id",
      update
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
  });

  it(`should return HTTP 200 status code when trying to update task`, async () => {
    const update = {
      text: "updatedText",
    } as unknown as Partial<ITask>;

    const result = await todoListTaskController.editTaskInTodoList(
      MOCKED_TASK_ID,
      update
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });

  it(`should return HTTP 400 status code when trying to delete task that doesn't exist`, async () => {
    const result = await todoListTaskController.deleteTaskInTodoList(
      "incorrect id"
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
  });

  it(`should return HTTP 200 status code when trying to delete task`, async () => {
    const result = await todoListTaskController.deleteTaskInTodoList(
      MOCKED_TASK_ID
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });
});
