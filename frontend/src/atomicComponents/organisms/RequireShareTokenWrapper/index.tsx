import { CircularProgress } from "@mui/material";
import NoPermissionTemplate from "atomicComponents/molecules/NoPermissionTemplate";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import { SHARE_HASH_PARAM } from "linked-models/accessLink/accessLink.url";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { USER_PARAM } from "linked-models/user/user.urls";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useCheckShareTokenValidityQuery } from "./checkShareTokenValidity.query";

interface Props {
  children: JSX.Element;
}

export const RequireShareTokenWrapper = ({ children }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const shareParam = searchParams.get(SHARE_HASH_PARAM);
  const userIdParam = params[USER_PARAM];
  const todoListIdParam = params[TODO_LIST_PARAM];

  const tokenScopes: Partial<IAccessLinkScopes> = {};
  if (userIdParam) tokenScopes[USER_PARAM] = userIdParam;
  if (todoListIdParam) tokenScopes[TODO_LIST_PARAM] = todoListIdParam;

  const checkShareTokenValidityQuery = useCheckShareTokenValidityQuery(
    shareParam,
    tokenScopes
  );

  if (checkShareTokenValidityQuery.isLoading) {
    return <CircularProgress />;
  }

  if (!shareParam || checkShareTokenValidityQuery.data?.isValid === false) {
    return (
      <NoPermissionTemplate altText={t(TranslationKeys.NoValidTokenInfo)} />
    );
  } else {
    return children;
  }
};
