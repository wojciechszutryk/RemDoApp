import { useQueryClient } from "@tanstack/react-query";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { URL_USERS } from "linked-models/user/user.urls";
import { useCallback } from "react";

const useUpdateQueriesAfterDeletingCollaboration = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (_: unknown, collaborationId: string) => {
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
    [queryClient]
  );
};

export default useUpdateQueriesAfterDeletingCollaboration;
