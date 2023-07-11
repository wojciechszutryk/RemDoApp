import { TODO_LIST_PERMISSIONS_PARAM } from "decorators/currentPermissions.decorator";
import { PARAM_CURRENT_USER } from "decorators/currentUser.decorator";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { PermissionsService } from "services/user/permission.service";

@injectable()
export class SetPermissions extends BaseMiddleware {
  constructor(
    @inject(PermissionsService)
    private readonly permissionsService: PermissionsService
  ) {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    const curentUser = req.params[
      PARAM_CURRENT_USER
    ] as unknown as IUserAttached;
    const todoListId = req.params[TODO_LIST_PARAM] as unknown as string;
    const permissions = await this.permissionsService.getPermissionsForUser(
      curentUser.id,
      todoListId
    );

    req.params[TODO_LIST_PERMISSIONS_PARAM] = permissions as unknown as string;
    next();
  }
}
