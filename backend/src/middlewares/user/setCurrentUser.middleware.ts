import { PARAM_CURRENT_USER } from "decorators/currentUser.decorator";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { IToken } from "models/authentication.model";
import { UserAuthService } from "services/user/user.auth.service";

const config = process.env;

@injectable()
export class SetCurrentUser extends BaseMiddleware {
  constructor(
    @inject(UserAuthService) private readonly userService: UserAuthService
  ) {
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
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Access Token was expired!" });
      }

      return res.status(401).send("Invalid Token");
    }

    return next();
  }
}
