import { IUserAttached } from "./User.model";

export type IRegisterUserDTO = {
  email: string;
  password: string;
  displayName: string;
};

export type ILoginUserDTO = Omit<IRegisterUserDTO, "displayName">;

export interface ILoginUserResponseDTO extends Omit<IUserAttached, "password"> {
  token: string;
}
