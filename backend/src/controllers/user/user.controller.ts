import { multerConfig } from "config/multer.config";
import { currentUser } from "decorators/currentUser.decorator";
import * as express from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  httpPut,
  interfaces,
  queryParam,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { EventName } from "linked-models/event/event.enum";
import { AVATAR_FILENAME } from "linked-models/images/avatar";
import { SEARCH_PHRASE } from "linked-models/search/search.urls";
import {
  IChangePasswordDTO,
  IUserPublicDataDTO,
} from "linked-models/user/user.dto";
import {
  IUserAttached,
  IUserPreferences,
  NotificationPreference,
  NotificationPreferences,
} from "linked-models/user/user.model";
import {
  EMAIL_UNSUB_TOKEN_PARAM,
  URL_AVATAR,
  URL_EMAIL,
  URL_PASSWORD,
  URL_PREFERENCES,
  URL_PUBLIC_DATA,
  URL_RESEND_EMAIL,
  URL_UNSUBSCRIBE,
  URL_USER,
  URL_USERS,
  URL_VERIFY_ACCOUNT,
  USER_PARAM,
} from "linked-models/user/user.urls";
import { DeleteUserAvatar } from "middlewares/user/deleteUserAvatar.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { AVATARS_BULK_NAME } from "models/storage.const";
import mongoose from "mongoose";
import multer from "multer";
import { EmailNotificationService } from "services/notification/email.notification.service";
import { UserAuthService } from "services/user/user.auth.service";
import { UserSearchService } from "services/user/user.search.service";
import { UserService } from "services/user/user.service";

const upload = multer(multerConfig);

@controller(URL_USERS)
export class UserController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(EmailNotificationService)
    private readonly emailNotificationService: EmailNotificationService,
    @inject(UserSearchService)
    private readonly userSearchService: UserSearchService,
    @inject(UserAuthService) private readonly userAuthService: UserAuthService
  ) {
    super();
  }

  @httpGet("")
  async searchForUsers(
    @queryParam(SEARCH_PHRASE) searchPhrase: string,
    @response() res: express.Response
  ) {
    try {
      const searchResults = await this.userSearchService.searchForUsers(
        searchPhrase,
        20
      );
      return this.ok(searchResults);
    } catch (error) {
      res.status(500).send({
        message: "Error Something went wrong",
        error,
      });
    }
  }

  @httpGet(`${URL_USER()}${URL_EMAIL}${URL_UNSUBSCRIBE()}`)
  async unsubscribeEmail(
    @requestParam(USER_PARAM) userId: string,
    @requestParam(EMAIL_UNSUB_TOKEN_PARAM) token: string
  ) {
    const user = await this.userService.getUserByAuthId(userId);
    if (!user) {
      return this.json("User not found", 404);
    }
    if (user.preferences.emailUnsubscribeToken !== token) {
      return this.json("Invalid token", 400);
    }

    const updatedNotificationPreferences = (
      Object.keys(user.preferences.notificationPreferences) as EventName[]
    ).reduce((acc: NotificationPreferences, key: EventName) => {
      const value = user.preferences.notificationPreferences[key];
      if (value === "SOCKET_AND_EMAIL") {
        acc[key] = NotificationPreference.SOCKET;
      } else if (value === "PUSH_AND_EMAIL") {
        acc[key] = NotificationPreference.PUSH;
      } else if (value === "ALL") {
        acc[key] = NotificationPreference.PUSH_AND_SOCKET;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as NotificationPreferences);

    await this.userService.updateUserPreferences(user, {
      notificationPreferences: updatedNotificationPreferences,
    });

    return this.ok();
  }

  @httpGet(URL_USER() + URL_AVATAR)
  async getUserAvatar(
    @response() res: express.Response,
    @requestParam(USER_PARAM) userId: string
  ) {
    try {
      const { db } = mongoose.connection;

      const imageBucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: AVATARS_BULK_NAME,
      });
      res.writeHead(200, { "Content-type": "image/png" });

      const downloadStream = imageBucket.openDownloadStreamByName(
        `${userId}.png`
      );

      downloadStream.on("data", function (data) {
        return res.write(data);
      });

      downloadStream.on("error", () => {
        return;
      });

      downloadStream.on("end", () => {
        res.end();
      });
    } catch (error) {
      res.status(500).send({
        message: "Error Something went wrong",
        error,
      });
    }
  }

  @httpPost(URL_VERIFY_ACCOUNT + URL_RESEND_EMAIL)
  async resendVerificationEmail(@requestBody() body: { email?: string }) {
    try {
      if (!body.email) {
        return this.json("User not found", 404);
      }
      const user = await this.userService.getUserByEmail(body.email);
      if (!user) {
        return this.json("User not found", 404);
      }
      await this.emailNotificationService.sendWelcomeEmail(user, true);
    } catch (error) {
      return this.json(error, 400);
    }
  }

  @httpPost(URL_USER() + URL_VERIFY_ACCOUNT, SetCurrentUser)
  async verifyAccount(@currentUser() currentUser: IUserAttached | undefined) {
    try {
      if (!currentUser) {
        return this.json("User not found", 404);
      }
      await this.userService.verifyUserAccount(currentUser.id);
      return this.ok();
    } catch (error) {
      return this.json(error, 400);
    }
  }

  @httpPut(
    URL_USER() + URL_AVATAR,
    SetCurrentUser,
    DeleteUserAvatar,
    upload.single(AVATAR_FILENAME)
  )
  async uploadUserAvatar(
    @request() req: express.Request,
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    const file = req.file;

    if (!file) {
      return this.badRequest();
    }

    await this.userService.updateUserPublicData(currentUser.id, {
      avatarUrl:
        process.env.SERVER_URL +
        URL_USERS +
        URL_USER(currentUser.id) +
        URL_AVATAR,
    });

    return this.ok(file);
  }

  @httpPut(URL_PUBLIC_DATA, SetCurrentUser)
  async changeDisplayName(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: Partial<IUserPublicDataDTO>
  ): Promise<OkResult> {
    try {
      await this.userService.updateUserPublicData(currentUser.id, body);
      return this.ok();
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }

  @httpPut(URL_USER() + URL_PREFERENCES, SetCurrentUser)
  async changePreferences(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: Partial<IUserPreferences>
  ): Promise<OkResult> {
    try {
      await this.userService.updateUserPreferences(currentUser, body);
      return this.ok();
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }

  @httpPut(URL_PASSWORD, SetCurrentUser)
  async changePassword(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: IChangePasswordDTO
  ): Promise<OkResult> {
    if (!body.newPassword || !body.currentPassword) {
      return this.json("invalid data", 400);
    }

    try {
      const todoList = await this.userAuthService.changePassword(
        currentUser,
        body.currentPassword,
        body.newPassword
      );
      return this.ok(todoList);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
