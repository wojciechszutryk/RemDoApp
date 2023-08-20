import { IBaseModelAttached } from "../abstraction/base.interface";

export interface IUser {
  /** User's nickName */
  displayName: string;

  /** User's email */
  email: string;
}

export interface IUserWithReadonlyProperties extends IUser {
  /** Date when user created his account. */
  readonly whenCreated: Date;

  /** Date when user created his account. */
  readonly hasAvatar?: boolean;

  /** User's password */
  readonly password: string;
}

export type IUserAttached = IUserWithReadonlyProperties & IBaseModelAttached;
