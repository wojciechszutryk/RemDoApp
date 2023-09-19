import { useMutation } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useSnackbar } from "framework/snackBar";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import {
  URL_ACCEPT,
  URL_INVITE_COLLABORANT,
} from "linked-models/collaboration/collaboration.urls";
import { URL_USER, URL_USERS } from "linked-models/user/user.urls";
import useUpdateQueriesAfterAcceptingCollaboration from "./useUpdateQueriesAfterAcceptingCollaboration";

export const useAcceptCollaborationMutation = () => {
  const { currentUser } = useCurrentUser();
  const { setSnackbar } = useSnackbar();
  const updateQueriesAfterAcceptingCollaboration =
    useUpdateQueriesAfterAcceptingCollaboration();

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
      onSuccess: updateQueriesAfterAcceptingCollaboration,
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
