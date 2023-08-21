import {
  Avatar,
  debounce,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { TextField } from "atomicComponents/atoms/TextField";
import UserAvatar from "atomicComponents/organisms/UserAvatar";
import { memo, useCallback, useEffect, useState } from "react";
import { useSearchForUsersQuery } from "../../queries/searchForUsers.query";

const UserSearch = (): JSX.Element => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const isSearchPhraseEmpty =
    searchPhrase && searchPhrase.length > 0 ? false : true;

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
    if (searchPhrase && !isSearchPhraseEmpty && !searchForUsersQuery.isLoading)
      debouncedEnableRefetch();
  }, [
    debouncedEnableRefetch,
    searchPhrase,
    isSearchPhraseEmpty,
    searchForUsersQuery.isLoading,
  ]);

  return (
    <>
      <TextField
        onChange={(e) => {
          setSearchPhrase(e.target.value);
        }}
      />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {searchForUsersQuery.data?.map((u) => (
          <ListItem key={u.id}>
            <ListItemAvatar>
              <Avatar>
                <UserAvatar userData={u} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={u.displayName} secondary={u.email} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default memo(UserSearch);
