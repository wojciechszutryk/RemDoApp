import { IUserAttached } from "linked-models/user/user.model";

export interface ContextProps {
  currentUser: IUserAttached | undefined;
  setCurrentUser: (user: IUserAttached | undefined) => void;
}
