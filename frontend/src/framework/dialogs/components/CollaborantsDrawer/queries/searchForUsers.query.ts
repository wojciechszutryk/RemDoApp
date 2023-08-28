import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { SEARCH_PHRASE } from "linked-models/search/search.urls";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { URL_USERS } from "linked-models/user/user.urls";

export const useSearchForUsersQuery = (
  searchPhrase: string,
  options?: Omit<UseQueryOptions<IUserPublicDataDTO[]>, "queryFn">
) => {
  const getUsersPublicData = async () => {
    return await apiGet<IUserPublicDataDTO[]>(
      FRONTIFY_URL(URL_USERS, undefined, { [SEARCH_PHRASE]: searchPhrase })
    ).then((res) => res.data);
  };

  return useQuery([URL_USERS, searchPhrase], getUsersPublicData, options);
};
