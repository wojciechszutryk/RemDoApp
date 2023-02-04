import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { PARAM_CURRENT_USER } from "decorators/currentUser.decorator";
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
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY!);
      const userData = decoded as IToken;
      req.params[PARAM_CURRENT_USER] = this.userService.getUserByEmail(
        userData.email
      ) as unknown as string;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  }
}
