import { Button } from "atomicComponents/atoms/Button";
import { useDialogs } from "framework/dialogs";
import { memo } from "react";
import { DraggableList } from "./components/DraggableList";
import { useGetExtendedTodoListsForUser } from "./queries/getExtendedTodoListsForUser.query";
import { StyledTodoListsPageWrapper } from "./styles";

const TodoListsPage = (): JSX.Element => {
  const { dialogsActions } = useDialogs();
  const getExtendedTodoListsForUser = useGetExtendedTodoListsForUser();

  const handleOpenCreateTodoListDialog = () => {
    dialogsActions.updateTodoListDialog({ visible: true });
  };

  return (
    <StyledTodoListsPageWrapper>
      <h1>Todo Lists</h1>
      <Button onClick={handleOpenCreateTodoListDialog}>Dodaj todoliste</Button>
      {/* <StyledTodoListsWrapper>
        {getExtendedTodoListsForUser.data?.map((todoList) => (
          <TodoListCard key={todoList.id} todoList={todoList} />
        ))}
      </StyledTodoListsWrapper> */}
      <DraggableList />
    </StyledTodoListsPageWrapper>
  );
};

export default memo(TodoListsPage);
