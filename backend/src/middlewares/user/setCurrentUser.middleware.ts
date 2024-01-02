import { PARAM_CURRENT_USER } from "decorators/currentUser.decorator";
import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import passport from "passport";

@injectable()
export class SetCurrentUser extends BaseMiddleware {
  constructor() {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    // user from passport session
    const user = req.user;

    if (!user) {
      // user from token
      await passport.authenticate(
        "token",
        { session: false },
        function (err: Error, user: Express.User | undefined) {
          if (!err && user) {
            req.params[PARAM_CURRENT_USER] = user as unknown as string;
            return next();
          }
        }
      )(req, res, next);

      return res.status(401);
    }

    req.params[PARAM_CURRENT_USER] = user as unknown as string;

    return next();
  }
}
