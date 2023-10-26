export enum CollaborationState {
  /** The collaboration is pending - user has not accepted or rejected it yet */
  Pending = "PENDING",
  /** The collaboration is accepted */
  Accepted = "ACCEPTED",
  /** The collaboration was rejected for the first time */
  Rejected = "REJECTED",
  /** The collaboration request was rejected and then re-opened */
  ReOpened = "REOPENED",
  /** User has blocked the collaboration with other user or rejected it for the second time */
  Blocked = "BLOCKED",
}
