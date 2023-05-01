import { UserController } from "controllers/user/user.controller";
import { UsersController } from "controllers/user/users.controller";
import { getUserCollection, UserCollectionName } from "dbSchemas/user.schema";
import { Container } from "inversify";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { UserService } from "services/user.service";

export const registerUserBindings = (container: Container) => {
  container.bind(UserCollectionName).toDynamicValue(() => getUserCollection());
  container.bind(UserService).toSelf();
  container.bind(SetCurrentUser).toSelf();
  container.bind(UsersController).toSelf();
  container.bind(UserController).toSelf();
};
