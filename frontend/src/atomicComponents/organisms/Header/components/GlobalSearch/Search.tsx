import { debounce } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchContainer";
import { useGetSearchResultQuery } from "./queries/getSearchResult.query";
import { GlobalSearchWrapper } from "./styles";

const Search = (): JSX.Element | null => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const isSearchPhraseEmpty =
    searchPhrase && searchPhrase.length > 0 ? false : true;

  const getSearchResultQuery = useGetSearchResultQuery(
    searchPhrase,
    undefined,
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
    if (
      searchPhrase &&
      !isSearchPhraseEmpty &&
      !getSearchResultQuery.isFetching
    ) {
      debouncedEnableRefetch();
    }
  }, [debouncedEnableRefetch, searchPhrase, isSearchPhraseEmpty]);

  return (
    <GlobalSearchWrapper>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      />
      <SearchResults
        getSearchResultQuery={getSearchResultQuery}
        isSearchPhraseEmpty={!searchPhrase}
      />
    </GlobalSearchWrapper>
  );
};

export default memo(Search);
