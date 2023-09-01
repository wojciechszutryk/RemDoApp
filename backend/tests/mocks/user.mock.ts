import { UserLoginStrategy } from "linked-models/user/user.enum";

export const MOCKED_USER_ID = "mockedUserId";

export const mockedUser = {
  id: MOCKED_USER_ID,
  displayName: "User1",
  authId: MOCKED_USER_ID,
  loginStrategy: UserLoginStrategy.Local,
  email: "user1@email.com",
  whenCreated: new Date(),
  whenUpdated: new Date(),
  password: "hashedPassword",
};
