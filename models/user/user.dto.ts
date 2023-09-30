import { AppLanguages } from "../language/languages.enum";
import { IUserAttached } from "./user.model";

export type IUserPublicDataDTO = Pick<
  IUserAttached,
  "avatarUrl" | "whenCreated" | "displayName" | "email" | "id"
>;

export type IRegisterUserDTO = {
  email: string;
  password: string;
  displayName: string;
  language: AppLanguages;
};

export type ILoginUserDTO = Omit<IRegisterUserDTO, "displayName" | "language">;

export type IChangePasswordDTO = {
  currentPassword: string;
  newPassword: string;
};

export type IChangeDisplayNameDTO = {
  newDisplayName: string;
};
