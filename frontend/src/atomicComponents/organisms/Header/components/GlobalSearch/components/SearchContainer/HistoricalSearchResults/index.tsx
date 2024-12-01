import { ISearchHistoryRespDto } from "linked-models/search/search.history.dto";
import { useDeleteSearchHistoryRecordMutation } from "../../../mutations/deleteSearchHistoryRecord.mutation";
import SearchLine from "../SearchLine";
import SearchResultIcon from "../SearchResultIcon";

interface Props {
  handleRedirect: (
    todoListId?: string,
    taskId?: string,
    isReminder?: boolean
  ) => void;
  searchHistory?: ISearchHistoryRespDto[];
}

const HistoricalSearchResults = ({
  handleRedirect,
  searchHistory,
}: Props): JSX.Element | null => {
  const deleteSearchHistoryRecordMutation =
    useDeleteSearchHistoryRecordMutation();

  //todo: handle history

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
              handleRedirect(searchedTodoListId, searchedTaskId, isReminder)
            }
            onDelete={() => deleteSearchHistoryRecordMutation.mutate(id)}
          />
        )
      )}
    </>
  );
};

export default HistoricalSearchResults;
