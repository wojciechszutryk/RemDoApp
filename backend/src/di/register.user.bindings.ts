import { getUserCollection, UserCollectionName } from "dbSchemas/user.schema";
import { UserController } from "controllers/user.controller";
import { Container } from "inversify";
import { UserService } from "services/user.service";

export const registerUserBindings = (container: Container) => {
  container.bind(UserCollectionName).toDynamicValue(() => getUserCollection());
  container.bind(UserService).toSelf();
  container.bind(UserController).toSelf();
};
