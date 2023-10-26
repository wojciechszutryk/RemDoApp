import { IBaseModelAttached } from "../abstraction/base.interface";
import { CollaborationState } from "./collaboration.enum";

export interface ICollaboration {
  /** State of collaboration invitation */
  state: CollaborationState;
  /** Id of user who is invited for collaboration */
  userId: string;
}

export interface ICollaborationWithReadonlyProperties extends ICollaboration {
  /** Readonly creator id - user who invited for collaboration */
  readonly creatorId: string;
  /** Date when collaboration was modified */
  readonly whenUpdated: Date;
  /** Date when collaboration was created */
  readonly whenCreated: Date;
}

export type ICollaborationAttached = ICollaborationWithReadonlyProperties &
  IBaseModelAttached;
