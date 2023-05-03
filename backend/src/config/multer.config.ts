import { AVATAR_FILENAME } from "linked-models/images/avatar";
import { USER_PARAM } from "linked-models/user/user.urls";
import { AVATARS_BULK_NAME } from "models/storage.const";
import { GridFsStorage } from "multer-gridfs-storage";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const url = process.env.DB_URI;

const storage = new GridFsStorage({
  url: url as string,
  file: (req, file) => {
    //If it is an avatar, save to avatar bucket
    if (file.mimetype === "image/png" && file.fieldname === AVATAR_FILENAME) {
      return {
        bucketName: AVATARS_BULK_NAME,
        filename: req.params[USER_PARAM] + ".png",
      };
    } else {
      //Otherwise save to default bucket
      return file.originalname;
    }
  },
});

export const multerConfig = { storage };
