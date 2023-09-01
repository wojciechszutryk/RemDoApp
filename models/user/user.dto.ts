import { IUserAttached } from "./user.model";

export type IUserPublicDataDTO = Omit<
  IUserAttached,
  "password" | "loginStrategy" | "authId"
>;

export type IRegisterUserDTO = {
  email: string;
  password: string;
  displayName: string;
};

export type ILoginUserDTO = Omit<IRegisterUserDTO, "displayName">;

export type IChangePasswordDTO = {
  currentPassword: string;
  newPassword: string;
};

export type IChangeDisplayNameDTO = {
  newDisplayName: string;
};
