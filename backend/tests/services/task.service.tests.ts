import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { interfaces } from "inversify-express-utils";
import {
  dropTestCollections,
  dropTestDB,
  setUpTestDB,
} from "../db.testSetup.helpers";

import { getTaskCollection } from "dbSchemas/task.schema";
import { EventService } from "framework/events/event.service";
import { IUserAttached } from "linked-models/user/user.model";
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
import { TaskService } from "services/task/task.service";
import { ID_THAT_DOES_NOT_EXITS } from "../mocks/constants.mock";
import { MOCKED_TASK_ID, mockedTask } from "../mocks/task.mock";
import { MOCKED_USER_ID } from "../mocks/user.mock";

describe(`Task service`, () => {
  let taskService: TaskService;
  let eventService: EventService;
  let scheduleNotificationService: ScheduleNotificationService;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getTaskCollection().create(mockedTask);
    eventService = new EventService({} as interfaces.HttpContext);
    scheduleNotificationService = new ScheduleNotificationService();

    taskService = new TaskService(
      getTaskCollection(),
      eventService,
      scheduleNotificationService
    );
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return task with given taskId`, async () => {
    const task = await taskService.getTaskById(MOCKED_TASK_ID);

    expect(task?.text).toEqual("task1");
  });

  it(`should return tasks with given todoListId`, async () => {
    const tasks = await taskService.getTasksByTodoListId("todoList1");

    expect(tasks[0]?.text).toEqual("task1");
  });

  it(`should create and return new task in todoList with given id`, async () => {
    const task = await taskService.createTaskInTodoList(
      "todoList1",
      {
        text: "new task",
      },
      { id: "creatorId" } as IUserAttached
    );

    expect(task?.text).toEqual("new task");
    expect(task?.todoListId).toEqual("todoList1");
    expect(task?.creatorId).toEqual("creatorId");
  });

  it(`should update and return task`, async () => {
    const taskToUpdate = {
      text: "new task text",
    };

    const task = await taskService.updateTask(MOCKED_TASK_ID, taskToUpdate, {
      id: MOCKED_USER_ID,
    } as IUserAttached);

    expect(task?.text).toEqual(taskToUpdate.text);
  });

  it(`should throw proper error when trying to update task that does not exist`, async () => {
    const taskToUpdate = {
      text: "new task text",
    };

    expect(
      async () =>
        await taskService.updateTask(ID_THAT_DOES_NOT_EXITS, taskToUpdate, {
          id: MOCKED_USER_ID,
        } as IUserAttached)
    ).rejects.toThrow(
      `Cannot update task: ${ID_THAT_DOES_NOT_EXITS}, because it does not exist.`
    );
  });

  it(`should delete task`, async () => {
    const taskBeforeDelete = await taskService.getTaskById(MOCKED_TASK_ID);

    expect(taskBeforeDelete?.text).toEqual("task1");

    await taskService.deleteTask(MOCKED_TASK_ID, MOCKED_USER_ID);
    const taskAfterDelete = await taskService.getTaskById(MOCKED_TASK_ID);

    expect(taskAfterDelete).toEqual(undefined);
  });

  it(`should throw proper error when trying to delete task that does not exist`, async () => {
    expect(
      async () =>
        await taskService.deleteTask(ID_THAT_DOES_NOT_EXITS, MOCKED_USER_ID)
    ).rejects.toThrow(
      `Cannot delete task: ${ID_THAT_DOES_NOT_EXITS}, because it does not exist.`
    );
  });
});
