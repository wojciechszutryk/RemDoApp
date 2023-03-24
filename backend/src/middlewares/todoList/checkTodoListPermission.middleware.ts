import { TODO_LIST_PERMISSIONS_PARAM } from "decorators/currentPermissions.decorator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";

export const CheckTodoListPermission =
  (permission: TodoListPermissions): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const currentPermissions = req.params[
      TODO_LIST_PERMISSIONS_PARAM
    ] as unknown as TodoListPermissions[];

    const hasPermission = !!currentPermissions.includes(permission);

    if (!hasPermission) {
      res.sendStatus(403);
      return;
    }

    next();
  };
