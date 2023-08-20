import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { URL_COLLABORANTS } from "linked-models/collaboration/collaboration.urls";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { URL_USERS } from "linked-models/user/user.urls";

export const useGetUserCollaborantsQuery = (
  options?: Omit<UseQueryOptions<IUserPublicDataDTO[]>, "queryFn">
) => {
  const getUserCollaborants = async () => {
    return await apiGet<IUserPublicDataDTO[]>(
      FRONTIFY_URL(URL_USERS + URL_COLLABORANTS)
    ).then((res) => res.data);
  };

  return useQuery([URL_USERS + URL_COLLABORANTS], getUserCollaborants, options);
};
