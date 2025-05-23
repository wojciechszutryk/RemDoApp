import { getUserCollection, UserCollectionName } from "dbSchemas/user.schema";
import { Container } from "inversify";
import { AuthAnonymouslyWithToken } from "middlewares/user/authAnonymouslyWithToken.middleware";
import { DeleteUserAvatar } from "middlewares/user/deleteUserAvatar.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { SetOAuth2Client } from "middlewares/user/setOAuth2Client";
import { PermissionsService } from "services/user/permission.service";
import { UserAuthService } from "services/user/user.auth.service";
import { PasswordRecoverService } from "services/user/user.passwordRecover.service";
import { UserService } from "services/user/user.service";

export const registerUserBindings = (container: Container) => {
  container.bind(UserCollectionName).toDynamicValue(() => getUserCollection());
  container.bind(UserAuthService).toSelf();
  container.bind(UserService).toSelf();
  container.bind(PasswordRecoverService).toSelf();
  container.bind(SetCurrentUser).toSelf();
  container.bind(AuthAnonymouslyWithToken).toSelf();
  container.bind(SetOAuth2Client).toSelf();
  container.bind(DeleteUserAvatar).toSelf();
  container.bind(PermissionsService).toSelf();
};
