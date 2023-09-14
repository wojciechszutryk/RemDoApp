export const URL_COLLABORANTS = `/collaborants`;

export const COLLABORATION_PARAM = "collaborationId";

export const URL_COLLABORATION = (collaborationId?: string) =>
  `/${collaborationId || ":" + COLLABORATION_PARAM}`;

export const URL_INVITE_COLLABORANT = `/inviteCollaborant`;
export const URL_REJECT = `/reject`;
export const URL_ACCEPT = `/accept`;
