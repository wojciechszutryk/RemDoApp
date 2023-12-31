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
      passport.authenticate(
        "token",
        { session: false },
        function (err: Error, user: Express.User | undefined) {
          if (err || !user) {
            if (err?.message) {
              res.statusCode = 403;
              return res.send(err?.message);
            }
            return res.sendStatus(500);
          }
          req.logIn(user, function (err) {
            if (err) {
              return next(err);
            }

            req.params[PARAM_CURRENT_USER] = user as unknown as string;

            return next();
          });
        }
      )(req, res, next);

      return res.status(401).send({ message: "No current user found" });
    }

    req.params[PARAM_CURRENT_USER] = user as unknown as string;

    return next();
  }
}
