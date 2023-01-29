import { IUser } from "./user.model";

export type IRegisterUserDTO = Omit<IUser, "token">;
