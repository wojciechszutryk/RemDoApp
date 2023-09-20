import { useMutation } from "@tanstack/react-query";
import { apiPut } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { useSnackbar } from "framework/snackBar";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import {
  URL_INVITE_COLLABORANT,
  URL_REJECT,
} from "linked-models/collaboration/collaboration.urls";
import { URL_USER, URL_USERS } from "linked-models/user/user.urls";
import useUpdateQueriesAfterRejectingCollaboration from "./useUpdateQueriesAfterRejectingCollaboration";

/** mutation to reject collaboration - updates state of collaboration (created by other user):
 * 1) if previous state was pending, it will be changed to rejected
 * 2) if previous state was reopened, it will be changed to blocked
 */
export const useRejectCollaborationMutation = () => {
  const { currentUser } = useCurrentUser();
  const { setSnackbar } = useSnackbar();
  const updateQueriesAfterRejectingCollaboration =
    useUpdateQueriesAfterRejectingCollaboration();

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
      onSuccess: updateQueriesAfterRejectingCollaboration,
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
