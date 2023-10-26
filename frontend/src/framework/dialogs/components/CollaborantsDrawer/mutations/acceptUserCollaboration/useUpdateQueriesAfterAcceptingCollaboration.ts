import { useQueryClient } from "@tanstack/react-query";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { URL_USERS } from "linked-models/user/user.urls";
import { useCallback } from "react";

const useUpdateQueriesAfterAcceptingCollaboration = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (
      newCollaboration: ICollaborationAttached,
      collaborant: ICollaborantDTO
    ) => {
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
    [queryClient]
  );
};

export default useUpdateQueriesAfterAcceptingCollaboration;
