import { useQuery } from "@tanstack/react-query";
import { apiGet } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import {
  SHARE_HASH_PARAM,
  URL_ACCESS_LINK,
  URL_IS_VALID,
  URL_SHARED,
} from "linked-models/accessLink/accessLink.url";

export const useCheckShareTokenValidityQuery = (
  hash: string | null,
  scopes: Partial<IAccessLinkScopes>
) => {
  const checkValidity = async () => {
    if (!hash) return Promise.resolve({ isValid: false });
    return await apiGet<{ isValid: boolean }>(
      FRONTIFY_URL(URL_ACCESS_LINK, URL_SHARED + URL_IS_VALID, {
        ...scopes,
        [SHARE_HASH_PARAM]: hash,
      })
    ).then((res) => res.data);
  };

  return useQuery([URL_SHARED, URL_IS_VALID], checkValidity);
};
