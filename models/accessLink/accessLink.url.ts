import { TodoListRole } from "../permissions/todoList.permissions.enum";

export const SHARE_HASH_PARAM = "share";
export const ROLE_PARAM = "role";

export const ACCESS_LINK_HEADER = "remdo-access-token";

export const URL_SHARED = `/shared`;
export const URL_IS_VALID = `/isValid`;

export const URL_ACCESS_LINK = `/accessLink`;
export const URL_SCOPES = `/scopes`;
export const URL_ROLES = `/roles`;

export const URL_ROLE = (role?: TodoListRole) => `/${role || ":" + ROLE_PARAM}`;
