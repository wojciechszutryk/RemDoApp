import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { USER_PARAM } from "linked-models/user/user.urls";
import { IAccessLink, IAccessLinkAttached } from "models/accessLink.model";
import mongoose, { Document, Schema } from "mongoose";

export const AccessLinkCollectionName = "AccessLink";

const AccessLinkSchema = new Schema({
  nonce: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: false,
  },
  whenCreated: {
    type: Date,
    required: true,
  },
  [USER_PARAM]: {
    type: String,
    required: false,
  },
  [TODO_LIST_PARAM]: {
    type: String,
    required: false,
  },
  todoListRole: {
    type: String,
    required: false,
  },
});
export type AccessLinkCollectionType = mongoose.Model<AccessLinkDocument>;
export interface AccessLinkDocument
  extends IAccessLink,
    IAccessLinkScopes,
    Document {}
export const AccessLinkCollection = mongoose.model<AccessLinkDocument>(
  AccessLinkCollectionName,
  AccessLinkSchema
);

export const getAccessLinkCollection = () =>
  mongoose.model<AccessLinkDocument>(
    AccessLinkCollectionName,
    AccessLinkSchema
  );

export const mapAccessLinkToAttached = (
  accessLink: AccessLinkDocument
): IAccessLinkAttached => {
  return {
    id: accessLink.id,
    nonce: accessLink.nonce,
    expiryDate: accessLink.expiryDate,
    whenCreated: accessLink.whenCreated,
    [USER_PARAM]: accessLink[USER_PARAM],
    [TODO_LIST_PARAM]: accessLink[TODO_LIST_PARAM],
    todoListRole: accessLink.todoListRole,
  };
};
