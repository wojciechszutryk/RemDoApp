import { SendRounded } from "@mui/icons-material";
import {
  debounce,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  Tooltip,
} from "@mui/material";
import MarkedText from "atomicComponents/atoms/MarkedText";
import { TextField } from "atomicComponents/atoms/TextField";
import ExtendableUserAvatar from "atomicComponents/organisms/UserAvatar/ExtendableUserAvatar";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInviteUserToCollaborationMutation } from "../../mutations/inviteUserToCollaboration.mutation";
import { useSearchForUsersQuery } from "../../queries/searchForUsers.query";
import EmptySearchResults from "./EmptySearchResults";
import { StyledListItemText, StyledUsersList } from "./styles";

const UserSearch = (): JSX.Element => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const { t } = useTranslation();
  const inviteUserToCollaborationMutation =
    useInviteUserToCollaborationMutation();

  const searchForUsersQuery = useSearchForUsersQuery(searchPhrase, {
    enabled: false,
  });

  const debouncedEnableRefetch = useCallback(
    debounce(function enableRefetch() {
      searchForUsersQuery.refetch();
    }, 400),
    []
  );

  useEffect(() => {
    if (searchPhrase.length > 0 && searchForUsersQuery.isStale) {
      debouncedEnableRefetch();
    }
  }, [debouncedEnableRefetch, searchForUsersQuery.isStale, searchPhrase]);

  return (
    <>
      <TextField
        placeholder={t(TranslationKeys.SearchForUser)}
        onChange={(e) => {
          setSearchPhrase(e.target.value);
        }}
      />
      {searchForUsersQuery.isFetching ? (
        <LinearProgress sx={{ marginTop: "5px" }} />
      ) : (
        <div style={{ marginTop: 9 }}></div>
      )}
      {searchForUsersQuery.data && searchForUsersQuery.data?.length > 0 ? (
        <StyledUsersList>
          {searchForUsersQuery.data?.map((u) => (
            <ListItem key={u.id} dense>
              <ListItemAvatar>
                <ExtendableUserAvatar userData={u} />
              </ListItemAvatar>
              <StyledListItemText
                primary={
                  <MarkedText
                    text={u.displayName}
                    highlightLength={searchPhrase.length}
                    highlightStartIndex={u.displayName.indexOf(searchPhrase)}
                  />
                }
                secondary={
                  <MarkedText
                    text={u.email}
                    highlightLength={searchPhrase.length}
                    highlightStartIndex={u.email.indexOf(searchPhrase)}
                  />
                }
              />
              <Tooltip title={t(TranslationKeys.InviteUser)}>
                <div>
                  <SendRounded
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      inviteUserToCollaborationMutation.mutate(u.id);
                    }}
                  />
                </div>
              </Tooltip>
            </ListItem>
          ))}
        </StyledUsersList>
      ) : (
        <EmptySearchResults />
      )}
    </>
  );
};

export default memo(UserSearch);
