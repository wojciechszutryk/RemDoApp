export const USER_PARAM = "user";

export const URL_USER = (userId?: string) => `/${userId || ":" + USER_PARAM}`;

export const URL_USERS = `/user`;

export const URL_REGISTER = `/register`;
export const URL_LOGIN = `/login`;

export const URL_WITH_TOKEN = `/withToken`;
export const URL_PASSWORD = `/password`;
export const URL_DISPLAYNAME = `/displayName`;
export const URL_AVATAR = `/avatar`;
