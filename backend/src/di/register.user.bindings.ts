import { UserAuthController } from "controllers/user/user.auth.controller";
import { UserController } from "controllers/user/user.controller";
import { getUserCollection, UserCollectionName } from "dbSchemas/user.schema";
import { Container } from "inversify";
import { DeleteUserAvatar } from "middlewares/user/deleteUserAvatar.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { UserAuthService } from "services/user.auth.service";
import { UserService } from "services/user.service";

export const registerUserBindings = (container: Container) => {
  container.bind(UserCollectionName).toDynamicValue(() => getUserCollection());
  container.bind(UserAuthService).toSelf();
  container.bind(UserService).toSelf();
  container.bind(SetCurrentUser).toSelf();
  container.bind(DeleteUserAvatar).toSelf();
  container.bind(UserAuthController).toSelf();
  container.bind(UserController).toSelf();
};
