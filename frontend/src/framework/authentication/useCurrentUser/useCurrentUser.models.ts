import { IUserAttached } from "linked-models/user/user.model";
import { Dispatch, SetStateAction } from "react";

export interface ContextProps {
  currentUser: IUserAttached | undefined;
  setCurrentUser: Dispatch<SetStateAction<IUserAttached | undefined>>;
}
