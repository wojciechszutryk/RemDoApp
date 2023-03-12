import { PARAM_CURRENT_USER } from "decorators/currentUser.decorator";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import jwt from "jsonwebtoken";
import { IToken } from "models/authentication.model";
import { UserService } from "services/user.service";

const config = process.env;

@injectable()
export class SetCurrentUser extends BaseMiddleware {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY!);
      const userData = decoded as IToken;
      req.params[PARAM_CURRENT_USER] = (await this.userService.getUserByEmail(
        userData.email
      )) as unknown as string;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }

    return next();
  }
}

import { describe, expect, it } from "@jest/globals";
import { TodoListController } from "controllers/todoList/todoList.controller";
import { ITodoList } from "linked-models/todoList/todoList.model";
import { IUserAttached } from "linked-models/User/User.model";
import { TodoListService } from "services/TodoList.service";

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

