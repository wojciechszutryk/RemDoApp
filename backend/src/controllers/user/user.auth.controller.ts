import { render } from "@react-email/render";
import sendgrid from "@sendgrid/mail";
import { currentUser } from "decorators/currentUser.decorator";
import * as express from "express";
import { getWelcomeEmailSubject } from "helpers/emails/welcomeEmail.translations";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  response,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { URL_PUSH } from "linked-models/pushSubscription/pushSubscription.urls";
import { ExpiryParam, SessionAge } from "linked-models/user/auth.consts";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_GOOGLE,
  URL_LOGIN,
  URL_LOGOUT,
  URL_REDIRECT,
  URL_REGISTER,
  URL_USERS,
  URL_WITH_COOKIE,
} from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { IGoogleAuthUser } from "models/auth.models";
import passport from "passport";
import React from "react";
import { EmailNotificationService } from "services/notification/email.notification.service";
import WelcomeTemplateplate from "../../emails/emails/WelcomeTemplate";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@controller(URL_USERS)
export class UserAuthController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(EmailNotificationService)
    private emailNotificationService: EmailNotificationService
  ) {
    super();
  }

  @httpGet(URL_PUSH)
  async getPushSubscription(): Promise<OkResult> {
    // const pushSubscription = await this.pushSubscriptionCollection.findOne();
    return this.json("");
  }

  @httpGet(
    URL_GOOGLE,
    passport.authenticate("google", {
      accessType: "offline",
    })
  )
  @httpGet(URL_GOOGLE + URL_REDIRECT, function (req, res, next) {
    passport.authenticate(
      "google",
      {
        successRedirect: `${process.env.CLIENT_URL!}?${ExpiryParam}=${
          new Date().getTime() + SessionAge
        }`,
        failureRedirect: process.env.CLIENT_URL!,
        // passReqToCallback: true,
        // pauseStream: true,
        accessType: "offline",
      },
      function (err, user: IGoogleAuthUser) {
        if (user && user?.registered) {
          const sendGridClient = sendgrid;
          sendGridClient.setApiKey(process.env.SENDGRID_API_KEY!);

          const subject = getWelcomeEmailSubject(user?.preferences?.language);
          sendGridClient.send({
            from: process.env.FROM_EMAIL!,
            to: user.email,
            subject,
            html: render(
              React.createElement(WelcomeTemplateplate, {
                preview: subject,
                name: user.displayName,
                language: user.preferences.language,
                isDarkTheme: user.preferences.theme === "dark",
              })
            ),
          });
        }

        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.redirect(
            `${process.env.CLIENT_URL!}?${ExpiryParam}=${
              new Date().getTime() + SessionAge
            }`
          );
        });
      }
    )(req, res, next);
  })
  @httpGet(URL_LOGOUT)
  async logout(@request() req: express.Request) {
    req.logout({ keepSessionInfo: false }, (err) => {
      return this.json(err, 400);
    });
    return this.ok();
  }

  @httpPost(URL_LOGIN, function (req, res, next) {
    passport.authenticate(
      "local",
      function (err: { message?: string }, user: Express.User | undefined) {
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
  })
  async loginUser(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL!);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, *");

    return this.ok(req.user);
  }

  @httpPost(URL_REGISTER, function (req, res, next) {
    passport.authenticate(
      "local-signup",
      function (err: { message?: string }, user: Express.User | undefined) {
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
  })
  async registerUser(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<OkResult> {
    const user = req.user as IUserAttached;

    this.emailNotificationService.sendWelcomeEmail(user, true);

    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL!);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, *");

    return this.ok(req.user);
  }

  @httpPost(URL_LOGIN + URL_WITH_COOKIE, SetCurrentUser)
  async loginUserWithCookie(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    console.log("currentUser: ", currentUser);

    return this.ok(currentUser);
  }
}
