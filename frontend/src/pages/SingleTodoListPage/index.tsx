import TodoListCard from "pages/SingleTodoListPage/components/TodoListCard";
import EmptyTodoLists from "pages/TodoListsPage/components/EmptyTodoLists";
import { TodoListsLoader } from "pages/TodoListsPage/components/TodoListsLoader";
import TopPanel from "pages/TodoListsPage/components/TopPanel";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetExtendedTodoListQuery } from "./queries/getTodoList.query";
import { StyledTodoListsPageWrapper } from "./styles";

const SingleTodoListPage = (): JSX.Element => {
  const { todoListId } = useParams();
  console.log("todoListId", todoListId);

  const getTodoListWithTasksQuery = useGetExtendedTodoListQuery(todoListId);

  const content = useMemo(() => {
    let pageContent = null;

    if (getTodoListWithTasksQuery.isLoading) pageContent = <TodoListsLoader />;
    else if (
      getTodoListWithTasksQuery.isFetched &&
      !!getTodoListWithTasksQuery.data
    ) {
      pageContent = <TodoListCard todoList={getTodoListWithTasksQuery.data} />;
    } else {
      pageContent = <EmptyTodoLists />;
    }

    return pageContent;
  }, [
    getTodoListWithTasksQuery.data,
    getTodoListWithTasksQuery.isFetched,
    getTodoListWithTasksQuery.isLoading,
  ]);

  return (
    <StyledTodoListsPageWrapper>
      <TopPanel />
      {content}
    </StyledTodoListsPageWrapper>
  );
};

export default memo(SingleTodoListPage);
