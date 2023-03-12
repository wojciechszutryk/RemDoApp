import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { TodoListController } from "controllers/todoList/todoList.controller";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { IUserAttached } from "linked-models/User/User.model";
import mongoose from "mongoose";
import { TodoListService } from "services/TodoList.service";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe(`When calling createTodoList`, () => {
  const todoListService = {} as TodoListService;
  const todoListController = new TodoListController(todoListService);

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
});

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.DB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });
});
