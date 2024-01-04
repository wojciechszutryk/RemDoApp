import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import { EventName } from "linked-models/event/event.enum";
import { IBaseModelAttached } from "../abstraction/base.interface";
import { AppLanguages } from "../language/languages.enum";

export type AppTheme = "light" | "dark";

export enum NotificationPreference {
  /** only push notifications */
  PUSH = "PUSH",
  /** only socket notifications */
  SOCKET = "SOCKET",
  /** only email notifications */
  EMAIL = "EMAIL",
  PUSH_AND_SOCKET = "PUSH_AND_SOCKET",
  PUSH_AND_EMAIL = "PUSH_AND_EMAIL",
  SOCKET_AND_EMAIL = "SOCKET_AND_EMAIL",
  /** all push, email and socket notifications */
  ALL = "ALL",
  /** no notifications */
  NONE = "NONE",
}

export interface NotificationPreferences {
  [EventName.CollaboartionAccepted]: NotificationPreference;
  [EventName.CollaboartionBlocked]: NotificationPreference;
  [EventName.CollaboartionReOpened]: NotificationPreference;
  [EventName.CollaboartionRejected]: NotificationPreference;
  [EventName.CollaboartionRequested]: NotificationPreference;
  [EventName.ReminderCreated]: NotificationPreference;
  [EventName.ReminderDeleted]: NotificationPreference;
  [EventName.ReminderUpdated]: NotificationPreference;
  [EventName.TaskCreated]: NotificationPreference;
  [EventName.TaskDeleted]: NotificationPreference;
  [EventName.TaskUpdated]: NotificationPreference;
  [EventName.TodoListCreated]: NotificationPreference;
  [EventName.TodoListDeleted]: NotificationPreference;
  [EventName.TodoListUpdated]: NotificationPreference;
  [EventName.TodoListMemberAdded]: NotificationPreference;
  [EventName.TodoListMemberRemoved]: NotificationPreference;
  [EventName.ScheduleTaskNotification]: NotificationPreference;
  [EventName.ScheduleReminderNotification]: NotificationPreference;
}

export interface IUserPreferences {
  /** User's prefered language */
  language: AppLanguages;
  /** User's prefered theme */
  theme: AppTheme;
  /** Disable animations of background */
  disableBgcAnimations: boolean;
  /** User's email unsubscribe token */
  emailUnsubscribeToken: string;
  /** User's notification preferences */
  notificationPreferences: NotificationPreferences;
}

export interface IUser {
  /** User's nickName */
  displayName: string;

  /** User's email */
  email: string;

  /** User's preferences */
  preferences: IUserPreferences;
}

export interface IUserWithReadonlyProperties extends IUser {
  /** Id of third party auth provider or id  */
  readonly authId: string;

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

  /** For temporary user (authenticated with link/token) - access scopes determined by link model */
  readonly accessScopes?: IAccessLinkScopes;

  /** Determines whether user is temporary or not (authenticated with link/token) */
  readonly isTemporary?: boolean;

  /** Determines whether user verified email, not applicable for temporary users and users authenticated with third party providers */
  readonly emailVerified?: boolean;
}

export type IUserAttached = IUserWithReadonlyProperties & IBaseModelAttached;
