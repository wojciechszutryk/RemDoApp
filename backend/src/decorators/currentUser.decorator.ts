import { requestParam } from "inversify-express-utils";

export const PARAM_CURRENT_USER = "currentUser";

export const currentUser: () => ParameterDecorator = () =>
  requestParam(PARAM_CURRENT_USER);
