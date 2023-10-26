import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { URL_USERS } from "linked-models/user/user.urls";

export const useGetUserCollaborantsQuery = (
  options?: Omit<UseQueryOptions<ICollaborantDTO[]>, "queryFn">
) => {
  const getUserCollaborants = async () => {
    return await apiGet<ICollaborantDTO[]>(
      FRONTIFY_URL(URL_USERS + URL_COLLABORANTS)
    ).then((res) => res.data);
  };

  return useQuery([URL_USERS + URL_COLLABORANTS], getUserCollaborants, options);
};
