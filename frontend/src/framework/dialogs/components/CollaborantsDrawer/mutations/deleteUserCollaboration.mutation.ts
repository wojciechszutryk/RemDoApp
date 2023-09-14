import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useSnackbar } from "framework/snackBar";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import {
  URL_COLLABORANTS,
  URL_COLLABORATION,
} from "linked-models/collaboration/collaboration.urls";
import { URL_USERS } from "linked-models/user/user.urls";

export const useDeleteCollaborationMutation = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { setSnackbar } = useSnackbar();

  if (!currentUser) throw new Error("No current user");

  const deleteCollaboration = async (collaborationId: string) => {
    const url = FRONTIFY_URL(
      URL_USERS + URL_COLLABORANTS,
      URL_COLLABORATION(collaborationId)
    );
    return apiDelete(url).then((res) => res.data);
  };

  return useMutation(
    (collaborationId: string) => deleteCollaboration(collaborationId),
    {
      onSuccess: (_, collaborationId) => {
        //update userCollaborants query
        queryClient.setQueryData(
          [URL_USERS + URL_COLLABORANTS],
          (prev: ICollaborantDTO[] | undefined) => {
            if (!prev) return [];
            return prev.filter(
              (collaborant) => collaborant.id !== collaborationId
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
