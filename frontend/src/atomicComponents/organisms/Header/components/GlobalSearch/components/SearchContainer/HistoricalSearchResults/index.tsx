import DeleteIcon from "@mui/icons-material/Delete";
import { ISearchHistoryRespDto } from "linked-models/search/search.history.dto";
import { useDeleteSearchHistoryRecordMutation } from "../../../mutations/deleteSearchHistoryRecord.mutation";
import SearchLine from "../SearchLine";
import SearchResultIcon from "../SearchResultIcon";
import SearchResultsWrapper from "../SearchResultsWrapper";

interface Props {
  handleResultClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    todoListId?: string,
    taskId?: string,
    isReminder?: boolean,
    entityDate?: string
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
    <SearchResultsWrapper>
      {searchHistory?.map(
        ({
          id,
          displayName,
          searchedTaskId,
          searchedTodoListId,
          isReminder,
          entityDate,
          category,
        }) => (
          <SearchLine
            key={id}
            icon={<SearchResultIcon searchCategory={category} />}
            text={displayName}
            onClick={(e) =>
              handleResultClick(
                e,
                searchedTodoListId,
                searchedTaskId,
                isReminder,
                entityDate
              )
            }
          >
            <DeleteIcon
              sx={{ marginLeft: "auto", "&:hover": { color: "error.main" } }}
              onClick={(e) => {
                e.stopPropagation();
                deleteSearchHistoryRecordMutation.mutate(id);
              }}
            />
          </SearchLine>
        )
      )}
    </SearchResultsWrapper>
  );
};

export default HistoricalSearchResults;
