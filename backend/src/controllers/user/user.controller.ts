import { multerConfig } from "config/multer.config";
import { currentUser } from "decorators/currentUser.decorator";
import * as express from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPut,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { AVATAR_FILENAME } from "linked-models/images/avatar";
import {
  IChangeDisplayNameDTO,
  IChangePasswordDTO,
} from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/User/User.model";
import {
  URL_AVATAR,
  URL_DISPLAYNAME,
  URL_PASSWORD,
  URL_USER,
  URL_USERS,
  USER_PARAM,
} from "linked-models/user/user.urls";
import { DeleteUserAvatar } from "middlewares/user/deleteUserAvatar.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { AVATARS_BULK_NAME } from "models/storage.const";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import multer from "multer";
import { UserAuthService } from "services/user.auth.service";
import { UserService } from "services/user.service";

const upload = multer(multerConfig);

@controller(URL_USERS)
export class UserController extends BaseHttpController {
  constructor(
    @inject(UserService) private readonly userService: UserService,
    @inject(UserAuthService) private readonly userAuthService: UserAuthService
  ) {
    super();
  }

  @httpGet(URL_USER() + URL_AVATAR)
  async getUserAvatar(
    @response() res: express.Response,
    @requestParam(USER_PARAM) userId: string
  ) {
    try {
      const { db } = mongoose.connection;

      const imageBucket = new GridFSBucket(db, {
        bucketName: AVATARS_BULK_NAME,
      });
      res.writeHead(200, { "Content-type": "image/png" });

      const downloadStream = imageBucket.openDownloadStreamByName(
        `${userId}.png`
      );

      downloadStream.on("data", function (data) {
        return res.write(data);
      });

      downloadStream.on("end", () => {
        return res.end();
      });
    } catch (error) {
      res.status(500).send({
        message: "Error Something went wrong",
        error,
      });
    }
  }

  @httpPut(
    URL_USER() + URL_AVATAR,
    SetCurrentUser,
    DeleteUserAvatar,
    upload.single(AVATAR_FILENAME)
  )
  async uploadUserAvatar(@request() req: express.Request): Promise<OkResult> {
    const file = req.file;

    if (!file) {
      return this.badRequest();
    }

    return this.ok(file);
  }

  @httpPut(URL_DISPLAYNAME, SetCurrentUser)
  async changeDisplayName(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: IChangeDisplayNameDTO
  ): Promise<OkResult> {
    try {
      await this.userService.updateDisplayName(
        currentUser.id,
        body.newDisplayName
      );
      return this.ok();
    } catch (e) {
      return this.json(e, 400);
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
    } catch (e) {
      return this.json((e as Error).message, 400);
    }
  }
}