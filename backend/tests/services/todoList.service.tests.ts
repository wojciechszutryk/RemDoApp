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
import { TaskService } from "services/task.service";
import { TodoListService } from "services/TodoList.service";
import { ID_THAT_DOES_NOT_EXITS } from "../mocks/constants.mock";
import { mockedTask } from "../mocks/task.mock";
import { mockedTodoList, MOCKED_TODO_ID } from "../mocks/todoList.mock";

describe(`TodoList service`, () => {
  const testUserId = mockedTodoList.creator;
  let taskService: TaskService;
  let todoListService: TodoListService;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await Promise.all([
      getTodoListCollection().create(mockedTodoList),
      getTodoListCollection().create({
        _id: "some_todo_id",
        name: "todoList2",
        creator: "some user id",
        assignedUsers: [testUserId],
        whenCreated: new Date(),
        whenUpdated: new Date(),
      }),
      getTaskCollection().create(mockedTask),
    ]);
    taskService = new TaskService(getTaskCollection());
    todoListService = new TodoListService(getTodoListCollection(), taskService);
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
      name: "todoList1",
    };
    const todoList = await todoListService.createTodoList(
      todoListToCreate,
      testUserId
    );

    expect(todoList.name).toEqual(todoListToCreate.name);
  });

  it(`should update and return new todoList`, async () => {
    const todoListToUpdate = {
      name: "updatedTodoListName",
    };
    const todoList = await todoListService.updateTodoList(
      MOCKED_TODO_ID,
      todoListToUpdate
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
          todoListToUpdate
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

    await todoListService.deleteTodoList(MOCKED_TODO_ID);
    const todoListAfterDelete = await todoListService.getTodoListById(
      MOCKED_TODO_ID
    );
    expect(todoListAfterDelete).toEqual(undefined);
  });

  it(`should throw proper error when trying to delete todoList that does not exist`, async () => {
    expect(
      async () => await todoListService.deleteTodoList(ID_THAT_DOES_NOT_EXITS)
    ).rejects.toThrow(
      `Cannot delete todoList: ${ID_THAT_DOES_NOT_EXITS}, because it does not exist.`
    );
  });
});
