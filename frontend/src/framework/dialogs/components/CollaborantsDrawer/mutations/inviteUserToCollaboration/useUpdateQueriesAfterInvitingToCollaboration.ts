import { useQueryClient } from "@tanstack/react-query";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { ICollaborationAttached } from "linked-models/collaboration/collaboration.model";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { URL_USERS } from "linked-models/user/user.urls";
import { useCallback } from "react";

const useUpdateQueriesAfterInvitingToCollaboration = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (
      newCollaboration: ICollaborationAttached,
      user: IUserPublicDataDTO,
      creator: IUserPublicDataDTO
    ) => {
      //update userCollaborants query
      queryClient.setQueryData(
        [URL_USERS + URL_COLLABORANTS],
        (prev: ICollaborantDTO[] | undefined) => {
          const newCollaborant = {
            ...newCollaboration,
            user,
            creator,
          };
          if (!prev) return [newCollaborant];
          return prev.map((collaborant) =>
            collaborant.id === newCollaborant.id ? newCollaborant : collaborant
          );
        }
      );
    },
    [queryClient]
  );
};

export default useUpdateQueriesAfterInvitingToCollaboration;
