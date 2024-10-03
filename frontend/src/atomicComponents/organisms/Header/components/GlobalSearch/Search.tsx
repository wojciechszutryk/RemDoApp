import { debounce } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchContainer";
import { useGetSearchResultQuery } from "./queries/getSearchResult.query";
import { GlobalSearchWrapper } from "./styles";

const Search = (): JSX.Element | null => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [todoListIDs, setTodoListIDs] = useState<string[]>([]);
  const isSearchPhraseEmpty =
    searchPhrase && searchPhrase.length > 0 ? false : true;

  const getSearchResultQuery = useGetSearchResultQuery(
    searchPhrase,
    JSON.stringify(todoListIDs),
    undefined,
    10,
    {
      enabled: false,
    }
  );

  const debouncedEnableRefetch = useCallback(
    debounce(function enableRefetch() {
      getSearchResultQuery.refetch();
    }, 400),
    []
  );

  useEffect(() => {
    if (searchPhrase && !isSearchPhraseEmpty && !getSearchResultQuery.isLoading)
      debouncedEnableRefetch();
  }, [
    debouncedEnableRefetch,
    searchPhrase,
    isSearchPhraseEmpty,
    todoListIDs,
    getSearchResultQuery.isLoading,
  ]);

  return (
    <GlobalSearchWrapper>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        todoListIds={todoListIDs}
        setTodoListIDs={setTodoListIDs}
      />
      <SearchResults
        getSearchResultQuery={getSearchResultQuery}
        isSearchPhraseEmpty={!searchPhrase}
      />
    </GlobalSearchWrapper>
  );
};

export default memo(Search);
