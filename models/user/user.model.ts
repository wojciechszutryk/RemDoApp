import { EventName } from "linked-models/event/event.enum";
import { IBaseModelAttached } from "../abstraction/base.interface";
import { AppLanguages } from "../language/languages.enum";

export type AppTheme = "light" | "dark";

export enum NotificationPreference {
  /** only push notifications */
  PUSH = "PUSH",
  /** only socket notifications */
  SOCKET = "SOCKET",
  /** both push and socket notifications */
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
}

export type IUserAttached = IUserWithReadonlyProperties & IBaseModelAttached;
