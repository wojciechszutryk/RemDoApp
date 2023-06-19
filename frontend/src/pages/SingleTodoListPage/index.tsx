import TodoListCard from "pages/SingleTodoListPage/components/TodoListCard";
import EmptyTodoLists from "pages/TodoListsPage/components/EmptyTodoLists";
import TopPanel from "pages/TodoListsPage/components/TopPanel";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { TodoListCardLoader } from "./components/TodoListCardLoader";
import { useGetExtendedTodoListQuery } from "./queries/getTodoList.query";
import { StyledSingleTodoListPageWrapper } from "./styles";

const SingleTodoListPage = (): JSX.Element => {
  const { todoListId, taskId } = useParams();

  const getTodoListWithTasksQuery = useGetExtendedTodoListQuery(todoListId);

  const content = useMemo(() => {
    let pageContent = null;

    if (getTodoListWithTasksQuery.isLoading)
      pageContent = <TodoListCardLoader />;
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
    <StyledSingleTodoListPageWrapper>
      <TopPanel />
      {content}
    </StyledSingleTodoListPageWrapper>
  );
};

export default memo(SingleTodoListPage);
