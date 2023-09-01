import { IBaseModelAttached } from "../abstraction/base.interface";
import { UserLoginStrategy } from "./user.enum";

export interface IUser {
  /** User's nickName */
  displayName: string;

  /** User's email */
  email: string;
}

export interface IUserWithReadonlyProperties extends IUser {
  /** Id of third party auth provider or id  */
  readonly authId: string;

  /** Name of third party auth provider or 'local' */
  readonly loginStrategy: UserLoginStrategy;

  /** Date when user created his account. */
  readonly whenCreated: Date;

  /** Date when user created his account. */
  readonly hasAvatar?: boolean;

  /** User's password */
  readonly password: string;
}

export type IUserAttached = IUserWithReadonlyProperties & IBaseModelAttached;
