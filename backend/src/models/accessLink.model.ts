import { IBaseModelAttached } from "linked-models/abstraction/base.interface";
import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";

export interface IAccessLink {
  nonce: string;
  expiryDate: Date;
  whenCreated: Date;
}

export type IAccessLinkAttached = IAccessLink &
  IAccessLinkScopes &
  IBaseModelAttached;
