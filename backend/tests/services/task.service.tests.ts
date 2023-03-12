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
import { TaskService } from "services/task.service";

describe(`Task service`, () => {
  let taskService: TaskService;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getTaskCollection().create({
      _id: "111111111111",
      text: "task1",
      important: true,
      todoListId: "todoList1",
      creator: "User1",
      whenCreated: new Date(),
      whenUpdated: new Date(),
    });
    taskService = new TaskService(getTaskCollection());
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return tasks with given todoListId`, async () => {
    const task = await taskService.getTasksByTodoListId("todoList1");

    expect(task[0]?.text).toEqual("task1");
  });

  it(`should create and return new task in todoList with given id`, async () => {
    const task = await taskService.createTaskInTodoList(
      "todoList1",
      {
        text: "new task",
      },
      "creatorId"
    );

    expect(task?.text).toEqual("new task");
    expect(task?.todoListId).toEqual("todoList1");
    expect(task?.creator).toEqual("creatorId");
  });
});
