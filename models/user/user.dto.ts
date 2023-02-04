export type IRegisterUserDTO = {
  email: string;
  password: string;
  displayName: string;
};

export type ILoginUserDTO = Omit<IRegisterUserDTO, "displayName">;
