import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useSnackbar } from "framework/snackBar";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import {
  URL_COLLABORANTS,
  URL_INVITE_COLLABORANT,
} from "linked-models/collaboration/collaboration.urls";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { URL_USER, URL_USERS } from "linked-models/user/user.urls";

export const useInviteUserToCollaborationMutation = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { setSnackbar } = useSnackbar();

  const inviteUserToCollaboration = async (user: IUserPublicDataDTO) => {
    const url = FRONTIFY_URL(
      URL_USERS + URL_USER(user.id) + URL_INVITE_COLLABORANT
    );
    return apiPost<{}, ICollaborationAttached>(url, {}).then((res) => res.data);
  };

  return useMutation(
    (user: IUserPublicDataDTO) => inviteUserToCollaboration(user),
    {
      onSuccess: (newCollaboration, user) => {
        //update userCollaborants query
        queryClient.setQueryData(
          [URL_USERS + URL_COLLABORANTS],
          (prev: ICollaborantDTO[] | undefined) => {
            if (!currentUser) return prev;
            const newCollaborant = {
              ...newCollaboration,
              user,
              creator: currentUser,
            };
            if (!prev) return [newCollaborant];
            return prev.map((collaborant) =>
              collaborant.id === newCollaborant.id
                ? newCollaborant
                : collaborant
            );
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
    }
  );
};
