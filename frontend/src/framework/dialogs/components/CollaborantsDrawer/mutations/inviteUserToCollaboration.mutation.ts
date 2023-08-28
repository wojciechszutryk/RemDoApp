import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useSnackbar } from "framework/snackBar";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import {
  URL_COLLABORANTS,
  URL_INVITE_COLLABORANT,
} from "linked-models/collaboration/collaboration.urls";
import { URL_USER, URL_USERS } from "linked-models/user/user.urls";

export const useInviteUserToCollaborationMutation = () => {
  const queryClient = useQueryClient();
  const { setSnackbar } = useSnackbar();

  const inviteUserToCollaboration = async (userId: string) => {
    const url = FRONTIFY_URL(
      URL_USERS + URL_USER(userId) + URL_INVITE_COLLABORANT
    );
    return apiPost<{}, ICollaborationAttached>(url, {}).then((res) => res.data);
  };

  return useMutation((userId: string) => inviteUserToCollaboration(userId), {
    onSuccess: (newCollaboration) => {
      //update userCollaborants query
      queryClient.setQueryData(
        [URL_USERS + URL_COLLABORANTS],
        (prev: ICollaborationAttached[] | undefined) => {
          if (!prev) return [newCollaboration];
          return [...prev, newCollaboration];
        }
      );
    },
    onError: (e) => {
      //TODO: ADD PROPER ERROR MESSAGE
      setSnackbar({
        severity: "error",
        message: e?.toString(),
      });
    },
  });
};
