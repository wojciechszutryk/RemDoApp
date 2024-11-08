import { UseQueryResult } from "@tanstack/react-query";
import { LinearLoaderSticky } from "atomicComponents/atoms/Loaders/LinearLoader";
import { Pages } from "framework/routing/pages";
import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveSearchHistoryMutation } from "../../mutations/saveSearchHistory.mutation";
import { useGetSearchHistoryQuery } from "../../queries/getSearchHistory.query";
import CurrentSearchResults from "./CurrentSearchResults";
import HistoricalSearchResults from "./HistoricalSearchResults";
import HistoryInfoHeader from "./HistoryInfoHeader";
import NoResultFound from "./NoResultsFound";
import { SearchTabList } from "./SearchTabMenu";
import { SearchResultsWrapper, StyledSearchContainerWrapper } from "./styles";

interface SearchContainerProps {
  getSearchResultQuery: UseQueryResult<ISearchResults, unknown>;
  isSearchPhraseEmpty: boolean;
}

const SearchResults = ({
  getSearchResultQuery: { data, isFetched },
  isSearchPhraseEmpty,
}: SearchContainerProps): JSX.Element | null => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getSearchHistoryQuery = useGetSearchHistoryQuery();
  const saveSearchHistoryMutation = useSaveSearchHistoryMutation();

  const navigate = useNavigate();

  const handleRedirect = (
    todoListId?: string,
    taskId?: string,
    isReminder?: boolean,
    saveToHistory?: boolean
  ) => {
    if (!todoListId) return;
    let link = "";

    if (isReminder && taskId) {
      link = Pages.RemindersPage.path;
    } else if (taskId) link = Pages.TaskPage.path(todoListId, taskId);

    if (link) {
      navigate(link);
      if (saveToHistory)
        saveSearchHistoryMutation.mutate({
          searchedTodoListId: todoListId,
        });
    }
  };

  const showNoResultFound =
    isFetched &&
    data?.[SearchCategory.Reminder].length === 0 &&
    data?.[SearchCategory.TodoList].length === 0 &&
    data?.[SearchCategory.Task].length === 0;

  return (
    <StyledSearchContainerWrapper>
      <LinearLoaderSticky showLoader={getSearchHistoryQuery.isFetching} />
      {isSearchPhraseEmpty && getSearchHistoryQuery.data?.length ? (
        <HistoryInfoHeader />
      ) : (
        <SearchTabList
          value={activeTab}
          setActiveTab={setActiveTab}
          currentResults={data}
        />
      )}
      <SearchResultsWrapper>
        {isSearchPhraseEmpty ? (
          <HistoricalSearchResults
            handleRedirect={handleRedirect}
            searchHistory={getSearchHistoryQuery.data}
          />
        ) : showNoResultFound ? (
          <NoResultFound />
        ) : (
          data && (
            <CurrentSearchResults
              activeTab={activeTab}
              currentResults={data}
              handleRedirect={handleRedirect}
            />
          )
        )}
      </SearchResultsWrapper>
    </StyledSearchContainerWrapper>
  );
};

export default SearchResults;
