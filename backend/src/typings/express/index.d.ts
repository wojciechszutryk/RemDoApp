import { IUserDocument } from "dbSchemas/user.schema";

declare global {
  namespace Express {
    interface User extends IUserDocument {}
  }
}
