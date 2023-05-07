import { Button } from "atomicComponents/atoms/Button";
import { useDialogs } from "framework/dialogs";
import { memo } from "react";
import TodoListCard from "./components/TodoListCard";
import { useGetUserTodoListsWithTasksQuery } from "./queries/getUserTodoListsWithTasks.query";
import { StyledTodoListsPageWrapper, StyledTodoListsWrapper } from "./styles";

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
      <StyledTodoListsWrapper>
        {getUserTodoListsWithTasksQuery.data?.map((todoList) => (
          <TodoListCard key={todoList.id} todoList={todoList} />
        ))}
      </StyledTodoListsWrapper>
    </StyledTodoListsPageWrapper>
  );
};

export default memo(TodoListsPage);
