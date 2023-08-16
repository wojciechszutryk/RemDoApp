import { IUserAttached } from "./user.model";

/**
 * user without password
 */
export type IUserPublicDataDTO = Omit<IUserAttached, "password">;

export type IRegisterUserDTO = {
  email: string;
  password: string;
  displayName: string;
};

export type ILoginUserDTO = Omit<IRegisterUserDTO, "displayName">;

export interface ILoginUserResponseDTO extends Omit<IUserAttached, "password"> {
  token: string;
}

export type IChangePasswordDTO = {
  currentPassword: string;
  newPassword: string;
};

export type IChangeDisplayNameDTO = {
  newDisplayName: string;
};
