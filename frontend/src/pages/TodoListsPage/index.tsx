import { Skeleton } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { useDialogs } from "framework/dialogs";
import { memo } from "react";
import TodoListsContainer from "./components/TodoListsContainer";
import { useGetUserTodoListsWithTasksQuery } from "./queries/getUserTodoListsWithTasks.query";
import { StyledTodoListsPageWrapper } from "./styles";

const TodoListsPage = (): JSX.Element => {
  const { dialogsActions } = useDialogs();
  const getUserTodoListsWithTasksQuery = useGetUserTodoListsWithTasksQuery();

  const handleOpenCreateTodoListDialog = () => {
    dialogsActions.updateTodoListDialog({ visible: true });
  };

  return (
    <StyledTodoListsPageWrapper>
      <h1>Todo Lists</h1>
      <Button onClick={handleOpenCreateTodoListDialog}>Dodaj todoliste</Button>
      {!getUserTodoListsWithTasksQuery.data ||
      getUserTodoListsWithTasksQuery.isLoading ? (
        <Skeleton />
      ) : (
        <TodoListsContainer
          todoLists={getUserTodoListsWithTasksQuery.data || []}
        />
      )}
    </StyledTodoListsPageWrapper>
  );
};

export default memo(TodoListsPage);
