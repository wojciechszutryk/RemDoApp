import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { USER_PARAM } from "linked-models/user/user.urls";
import { AVATARS_BULK_NAME } from "models/storage.const";
import mongoose from "mongoose";

@injectable()
export class DeleteUserAvatar extends BaseMiddleware {
  constructor() {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    const userId = req.params[USER_PARAM];
    const { db } = mongoose.connection;

    const imageBucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: AVATARS_BULK_NAME,
    });

    const documents = await imageBucket
      .find({ filename: `${userId}.png` })
      .toArray();

    if (documents.length > 0) {
      Promise.all(
        documents.map((doc) => {
          return imageBucket.delete(doc._id);
        })
      );
    }

    return next();
  }
}
