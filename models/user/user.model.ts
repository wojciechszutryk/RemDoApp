import { IBaseModelAttached } from "../abstraction/base.interface";

export interface IUser {
  /** User's nickName */
  displayName: string;

  /** User's email */
  email: string;

  /** User's password */
  password: string;

  /** Token passed to authenticate user */
  token: string;
}

export interface IUserWithReadonlyProperties extends IUser {
  /** Date when user created his account. */
  readonly whenCreated: Date;
}

export type IUserAttached = IUserWithReadonlyProperties & IBaseModelAttached;
