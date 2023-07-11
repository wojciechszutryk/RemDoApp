import { requestParam } from "inversify-express-utils";

export const TODO_LIST_PERMISSIONS_PARAM = "currentPermissions";

export const todoListPermissions: () => ParameterDecorator = () =>
  requestParam(TODO_LIST_PERMISSIONS_PARAM);
