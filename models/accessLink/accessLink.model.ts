import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { USER_PARAM } from "linked-models/user/user.urls";

export interface IAccessLinkScopes {
  /** User scope of access token */
  [USER_PARAM]?: string;
  /** TodoList scope of access token */
  [TODO_LIST_PARAM]?: string;
}
