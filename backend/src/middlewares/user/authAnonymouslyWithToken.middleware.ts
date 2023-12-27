import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import passport from "passport";

@injectable()
export class AuthAnonymouslyWithToken extends BaseMiddleware {
  constructor() {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
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
          next();
        });
      }
    )(req, res, next);
  }
}
