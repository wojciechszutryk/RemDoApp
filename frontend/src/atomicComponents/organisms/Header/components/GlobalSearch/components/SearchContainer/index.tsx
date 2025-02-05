import { UseQueryResult } from "@tanstack/react-query";
import { LinearLoaderSticky } from "atomicComponents/atoms/Loaders/LinearLoader";
import { Pages } from "framework/routing/pages";
import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";
import { useEffect, useState } from "react";
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
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const SearchResults = ({
  getSearchResultQuery: { data, isFetched },
  isSearchPhraseEmpty,
  onClose,
}: SearchContainerProps): JSX.Element | null => {
  const [activeTab, setActiveTab] = useState<SearchCategory>(
    SearchCategory.Reminder
  );

  const getSearchHistoryQuery = useGetSearchHistoryQuery();
  const saveSearchHistoryMutation = useSaveSearchHistoryMutation();

  const navigate = useNavigate();

  const handleResultClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    todoListId?: string,
    taskId?: string,
    isReminder?: boolean,
    entityData?: string,
    saveToHistory?: boolean
  ) => {
    if (!todoListId) return;
    let link = "";

    if (isReminder && taskId)
      link = Pages.RemindersPage.path(todoListId, entityData);
    else if (taskId) link = Pages.TaskPage.path(todoListId, taskId);
    else link = Pages.TodoListPage.path(todoListId);

    if (link) {
      navigate(link);

      const shouldSave =
        saveToHistory &&
        !getSearchHistoryQuery.data?.some(
          (item) =>
            item.searchedTodoListId === todoListId &&
            item.searchedTaskId == taskId
        );

      if (shouldSave)
        saveSearchHistoryMutation.mutate({
          searchedTodoListId: todoListId,
          searchedTaskId: taskId,
        });
    }

    setTimeout(() => onClose(e), 100);
  };

  const showNoResultFound =
    isFetched &&
    data?.[SearchCategory.Reminder]?.length === 0 &&
    data?.[SearchCategory.TodoList]?.length === 0 &&
    data?.[SearchCategory.Task]?.length === 0;

  useEffect(() => {
    if (!data || data?.[activeTab]?.length > 0) return;

    const nextCategory = Object.values(SearchCategory).find(
      (category) => data?.[category]?.length > 0 && category !== activeTab
    );

    if (nextCategory) setActiveTab(nextCategory);
  }, [data, activeTab]);

  return (
    <StyledSearchContainerWrapper>
      <LinearLoaderSticky showLoader={getSearchHistoryQuery.isLoading} />
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
            handleResultClick={handleResultClick}
            searchHistory={getSearchHistoryQuery.data}
          />
        ) : showNoResultFound ? (
          <NoResultFound />
        ) : (
          data && (
            <CurrentSearchResults
              activeTab={activeTab}
              currentResults={data}
              handleResultClick={handleResultClick}
            />
          )
        )}
      </SearchResultsWrapper>
    </StyledSearchContainerWrapper>
  );
};

export default SearchResults;
