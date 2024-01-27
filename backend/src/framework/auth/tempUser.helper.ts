import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { IUserAttached, IUserPreferences } from "linked-models/user/user.model";
import { USER_PARAM } from "linked-models/user/user.urls";

export const TEMP_USER_ID = "tempUserId";

export const getTemUser = (
  id: string,
  accessTokenScopes: IAccessLinkScopes
) => {
  const tempUser: IUserAttached = {
    id: accessTokenScopes[USER_PARAM] || TEMP_USER_ID + id,
    authId: accessTokenScopes[USER_PARAM] || TEMP_USER_ID + id,
    password: "",
    integratedWithGoogle: false,
    displayName: "",
    email: "",
    accessScopes: {
      [USER_PARAM]: accessTokenScopes[USER_PARAM],
      [TODO_LIST_PARAM]: accessTokenScopes[TODO_LIST_PARAM],
      todoListRole: accessTokenScopes.todoListRole,
    },
    isTemporary: true,
    whenCreated: new Date(),
    preferences: {} as IUserPreferences,
  };
  return tempUser;
};
