import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useSnackbar } from "framework/snackBar";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import {
  URL_ACCEPT,
  URL_COLLABORANTS,
  URL_INVITE_COLLABORANT,
} from "linked-models/collaboration/collaboration.urls";
import { URL_USER, URL_USERS } from "linked-models/user/user.urls";

export const useAcceptCollaborationMutation = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { setSnackbar } = useSnackbar();

  if (!currentUser) throw new Error("No current user");

  const acceptCollaboration = async (collaborant: ICollaborantDTO) => {
    const isCurrentUserCreator = currentUser.id === collaborant.creator.id;
    const url = FRONTIFY_URL(
      URL_USERS +
        URL_USER(
          isCurrentUserCreator ? collaborant.user.id : collaborant.creator.id
        ) +
        URL_INVITE_COLLABORANT +
        URL_ACCEPT
    );
    return apiPut<{}, ICollaborationAttached>(url, {}).then((res) => res.data);
  };

  return useMutation(
    (collaborant: ICollaborantDTO) => acceptCollaboration(collaborant),
    {
      onSuccess: (newCollaboration, collaborant) => {
        //update userCollaborants query
        queryClient.setQueryData(
          [URL_USERS + URL_COLLABORANTS],
          (prev: ICollaborantDTO[] | undefined) => {
            const acceptedCollaboration = {
              ...collaborant,
              ...newCollaboration,
            };
            if (!prev) return [acceptedCollaboration];
            return prev.map((collaborant) =>
              collaborant.id === acceptedCollaboration.id
                ? acceptedCollaboration
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
