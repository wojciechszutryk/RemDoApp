import { IUserAttached } from "linked-models/user/user.model";

export interface IGoogleAuthUser extends IUserAttached {
  registered?: boolean;
}
