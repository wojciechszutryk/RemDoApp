import { ILoginUserResponseDTO } from "linked-models/user/user.dto";

export interface ContextProps {
  currentUser: ILoginUserResponseDTO | undefined;
  setCurrentUser: (user: ILoginUserResponseDTO | undefined) => void;
}
