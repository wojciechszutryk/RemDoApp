import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useSnackbar } from "framework/snackBar";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import {
  URL_COLLABORANTS,
  URL_INVITE_COLLABORANT,
  URL_REJECT,
} from "linked-models/collaboration/collaboration.urls";
import { URL_USER, URL_USERS } from "linked-models/user/user.urls";

export const useRejectCollaborationMutation = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { setSnackbar } = useSnackbar();

  if (!currentUser) throw new Error("No current user");

  const rejectCollaboration = async (collaborant: ICollaborantDTO) => {
    const isCurrentUserCreator = currentUser.id === collaborant.creator.id;
    const url = FRONTIFY_URL(
      URL_USERS +
        URL_USER(
          isCurrentUserCreator ? collaborant.user.id : collaborant.creator.id
        ) +
        URL_INVITE_COLLABORANT +
        URL_REJECT
    );
    return apiPut<{}, ICollaborationAttached>(url, {}).then((res) => res.data);
  };

  return useMutation(
    (collaborant: ICollaborantDTO) => rejectCollaboration(collaborant),
    {
      onSuccess: (newCollaboration, collaborant) => {
        //update userCollaborants query
        queryClient.setQueryData(
          [URL_USERS + URL_COLLABORANTS],
          (prev: ICollaborantDTO[] | undefined) => {
            const rejectedCollaboration = {
              ...collaborant,
              ...newCollaboration,
            };
            if (!prev) return [rejectedCollaboration];
            return prev.map((collaborant) =>
              collaborant.id === rejectedCollaboration.id
                ? rejectedCollaboration
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
