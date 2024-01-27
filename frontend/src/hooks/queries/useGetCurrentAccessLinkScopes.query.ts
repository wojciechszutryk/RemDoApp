import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import {
  URL_ACCESS_LINK,
  URL_SCOPES,
} from "linked-models/accessLink/accessLink.url";

export const useGetCurrentAccessLinkScopesQuery = (
  options?: Omit<UseQueryOptions<IAccessLinkScopes>, "queryFn">
) => {
  const getAccessLink = async () => {
    // This return scopes of access link, thanks to the header set in the request
    return await apiGet<IAccessLinkScopes>(
      FRONTIFY_URL(URL_ACCESS_LINK, URL_SCOPES)
    ).then((res) => res.data);
  };

  return useQuery([URL_ACCESS_LINK], getAccessLink, options);
};
