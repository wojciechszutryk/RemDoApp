import { IUserAttached } from "linked-models/user/user.model";

declare global {
  namespace Express {
    // interface User extends IUserDocument {}
    interface User extends IUserAttached {}
  }
}
