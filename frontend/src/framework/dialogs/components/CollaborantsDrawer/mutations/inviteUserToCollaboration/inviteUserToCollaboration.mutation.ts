import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useSnackbar } from "framework/snackBar";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import { URL_INVITE_COLLABORANT } from "linked-models/collaboration/collaboration.urls";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { URL_USER, URL_USERS } from "linked-models/user/user.urls";
import useUpdateQueriesAfterInvitingToCollaboration from "./useUpdateQueriesAfterInvitingToCollaboration";

/**
 * Creates a new collaboration between users [creator - currentUser, user - user passed as argument] in two cases:
 * 1) if there is no collaboration between users
 * 2) if there is a collaboration between users created by current user, and it was rejected by other user - new collaboration will be created with reopened state
 */
export const useInviteUserToCollaborationMutation = () => {
  const { setSnackbar } = useSnackbar();
  const { currentUser } = useCurrentUser();
  const updateQueriesAfterInvitingToCollaboration =
    useUpdateQueriesAfterInvitingToCollaboration();

  const inviteUserToCollaboration = async (user: IUserPublicDataDTO) => {
    const url = FRONTIFY_URL(
      URL_USERS + URL_USER(user.id) + URL_INVITE_COLLABORANT
    );
    return apiPost<{}, ICollaborationAttached>(url, {}).then((res) => res.data);
  };

  return useMutation(
    (user: IUserPublicDataDTO) => inviteUserToCollaboration(user),
    {
      onSuccess: (
        newCollaboration: ICollaborationAttached,
        user: IUserPublicDataDTO
      ) => {
        if (currentUser)
          updateQueriesAfterInvitingToCollaboration(
            newCollaboration,
            user,
            currentUser
          );
      },
      onError: (e) => {
        //TODO: ADD PROPER ERROR MESSAGE
        setSnackbar({
          severity: "error",
          message: e?.toString(),
        });
      },
    }
  );
};
