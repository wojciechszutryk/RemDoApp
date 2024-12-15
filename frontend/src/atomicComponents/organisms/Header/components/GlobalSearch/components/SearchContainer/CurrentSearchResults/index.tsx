import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";
import SearchLine from "../SearchLine";
import SearchResultIcon from "../SearchResultIcon";
import SearchTabPanel from "../SearchTabPanel";

interface CurrentSearchResultsProps {
  activeTab: SearchCategory;
  currentResults: ISearchResults;
  handleResultClick: (
    todoListId?: string,
    taskId?: string,
    isReminder?: boolean,
    saveToHistory?: boolean
  ) => void;
}

const CurrentSearchResults = ({
  activeTab,
  currentResults,
  handleResultClick,
}: CurrentSearchResultsProps): JSX.Element | null => {
  return (
    <>
      <SearchTabPanel value={activeTab} index={SearchCategory.Reminder} key={0}>
        {currentResults[SearchCategory.Reminder].map((result, index) => (
          <SearchLine
            key={index}
            icon={<SearchResultIcon searchCategory={SearchCategory.Reminder} />}
            text={result.name}
            onClick={() =>
              handleResultClick(result.todoListId, result.taskId, true, true)
            }
          />
        ))}
      </SearchTabPanel>
      <SearchTabPanel value={activeTab} index={SearchCategory.TodoList} key={1}>
        {currentResults[SearchCategory.TodoList].map((result, index) => (
          <SearchLine
            key={index}
            icon={<SearchResultIcon searchCategory={SearchCategory.TodoList} />}
            text={result.name}
            onClick={() => handleResultClick(result.id, undefined, false, true)}
          />
        ))}
      </SearchTabPanel>
      <SearchTabPanel value={activeTab} index={SearchCategory.Task} key={2}>
        {currentResults[SearchCategory.Task].map((result, index) => (
          <SearchLine
            key={index}
            icon={<SearchResultIcon searchCategory={SearchCategory.Task} />}
            text={result.text!}
            onClick={() =>
              handleResultClick(result.todoListId, result.id, false, true)
            }
          />
        ))}
      </SearchTabPanel>
    </>
  );
};

export default CurrentSearchResults;
