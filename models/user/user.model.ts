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

  /** Url to user's avatar - can be null */
  readonly avatarUrl?: string;

  /** User's password */
  readonly password: string;

  /** Is user integrated with google's callendar */
  readonly integratedWithGoogle: boolean;

  /** Google access token - applicable for users who are integrated with google. Applicable only for users who are integrated with google */
  readonly googleAccessToken?: string;

  /** Google refresh token - applicable for users who are integrated with google. Applicable only for users who are integrated with google */
  readonly googleRefreshToken?: string;

  /** Google access token expiry time. Applicable only for users who are integrated with google */
  readonly googleTokenExpiryDate?: number;
}

export type IUserAttached = IUserWithReadonlyProperties & IBaseModelAttached;
