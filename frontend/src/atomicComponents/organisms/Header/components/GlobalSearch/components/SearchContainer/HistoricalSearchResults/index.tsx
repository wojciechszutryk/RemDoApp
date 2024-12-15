import { ISearchHistoryRespDto } from "linked-models/search/search.history.dto";
import { useDeleteSearchHistoryRecordMutation } from "../../../mutations/deleteSearchHistoryRecord.mutation";
import SearchLine from "../SearchLine";
import SearchResultIcon from "../SearchResultIcon";

interface Props {
  handleResultClick: (
    todoListId?: string,
    taskId?: string,
    isReminder?: boolean
  ) => void;
  searchHistory?: ISearchHistoryRespDto[];
}

const HistoricalSearchResults = ({
  handleResultClick,
  searchHistory,
}: Props): JSX.Element | null => {
  const deleteSearchHistoryRecordMutation =
    useDeleteSearchHistoryRecordMutation();

  return (
    <>
      {searchHistory?.map(
        ({
          id,
          displayName,
          searchedTaskId,
          searchedTodoListId,
          isReminder,
          category,
        }) => (
          <SearchLine
            key={displayName}
            icon={<SearchResultIcon searchCategory={category} />}
            text={displayName}
            onClick={() =>
              handleResultClick(searchedTodoListId, searchedTaskId, isReminder)
            }
            onDelete={() => deleteSearchHistoryRecordMutation.mutate(id)}
          />
        )
      )}
    </>
  );
};

export default HistoricalSearchResults;
