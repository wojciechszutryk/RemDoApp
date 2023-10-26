import { useQueryClient } from "@tanstack/react-query";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { URL_USERS } from "linked-models/user/user.urls";
import { useCallback } from "react";

const useUpdateQueriesAfterRejectingCollaboration = () => {
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
    [queryClient]
  );
};

export default useUpdateQueriesAfterRejectingCollaboration;
