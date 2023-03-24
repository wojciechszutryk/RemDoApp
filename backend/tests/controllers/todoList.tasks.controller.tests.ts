import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { TodoListTasksController } from "controllers/todoList/todoList.tasks.controller";
import { getTaskCollection } from "dbSchemas/task.schema";
import { ITask } from "linked-models/task/task.model";
import { IUserAttached } from "linked-models/User/User.model";
import { TaskService } from "services/task.service";
import {
  dropTestCollections,
  dropTestDB,
  setUpTestDB,
} from "../db.testSetup.helpers";
import { mockedTask } from "../mocks/task.mock";
import { MOCKED_TODO_ID } from "../mocks/todoList.mock";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe(`When calling todoListTasks controller`, () => {
  let todoListTasksController = {} as TodoListTasksController;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getTaskCollection().create(mockedTask);

    const taskService = new TaskService(getTaskCollection());
    todoListTasksController = new TodoListTasksController(taskService);
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return HTTP 400 status code and proper response content when trying to create invalid task`, async () => {
    const incorrectTask = {} as ITask;

    const result = await todoListTasksController.createTaskInTodoList(
      {} as IUserAttached,
      incorrectTask,
      MOCKED_TODO_ID
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
    expect(response.content).toEqual({
      _headers: { "content-type": "application/json" },
      content: '"Invalid data"',
    });
  });
});
