import { PARAM_CURRENT_USER } from "decorators/currentUser.decorator";
import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";

@injectable()
export class SetCurrentUser extends BaseMiddleware {
  constructor() {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    console.log("handler user ", user);
    console.log("handler req", req);

    if (!user)
      return res.status(401).send({ message: "No current user found" });

    req.params[PARAM_CURRENT_USER] = user as unknown as string;

    return next();
  }
}
