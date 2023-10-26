import { requestParam } from "inversify-express-utils";

export const PARAM_CURRENT_USER = "currentUser";

export const currentUser: () => ParameterDecorator = () =>
  requestParam(PARAM_CURRENT_USER);

export const PARAM_CURRENT_USER_OAUTH2_CLIENT = "currentUserOAuth2Client";

export const currentUserOAuth2Client: () => ParameterDecorator = () =>
  requestParam(PARAM_CURRENT_USER_OAUTH2_CLIENT);
