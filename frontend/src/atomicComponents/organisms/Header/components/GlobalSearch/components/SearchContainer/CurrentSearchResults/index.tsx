import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";
import SearchLine from "../SearchLine";
import SearchResultIcon from "../SearchResultIcon";
import SearchTabPanel from "../SearchTabPanel";

interface CurrentSearchResultsProps {
  activeTab: number;
  currentResults: ISearchResults;
  handleRedirect: (
    todoListId?: string,
    taskId?: string,
    isReminder?: boolean,
    saveToHistory?: boolean
  ) => void;
}

const CurrentSearchResults = ({
  activeTab,
  currentResults,
  handleRedirect,
}: CurrentSearchResultsProps): JSX.Element | null => {
  return (
    <>
      <SearchTabPanel value={activeTab} index={1}>
        {currentResults[SearchCategory.Reminder].map((result, index) => (
          <SearchLine
            key={index}
            icon={<SearchResultIcon searchCategory={SearchCategory.Reminder} />}
            text={result.name}
            onClick={() =>
              handleRedirect(result.todoListId, result.taskId, true, true)
            }
          />
        ))}
      </SearchTabPanel>
      <SearchTabPanel value={activeTab} index={2}>
        {currentResults[SearchCategory.TodoList].map((result, index) => (
          <SearchLine
            key={index}
            icon={<SearchResultIcon searchCategory={SearchCategory.TodoList} />}
            text={result.name}
            onClick={() => handleRedirect(result.id, undefined, false, true)}
          />
        ))}
      </SearchTabPanel>
      <SearchTabPanel value={activeTab} index={3}>
        {currentResults[SearchCategory.Task].map((result, index) => (
          <SearchLine
            key={index}
            icon={<SearchResultIcon searchCategory={SearchCategory.Task} />}
            text={result.text!}
            onClick={() =>
              handleRedirect(result.todoListId, result.id, false, true)
            }
          />
        ))}
      </SearchTabPanel>
    </>
  );
};

export default CurrentSearchResults;
