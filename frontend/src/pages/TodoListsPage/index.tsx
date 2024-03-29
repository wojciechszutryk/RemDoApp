import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useLayoutEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import EmptyTodoLists from "./components/EmptyTodoLists";
import TodoListsContainer from "./components/TodoListsContainer";
import { TodoListsLoader } from "./components/TodoListsLoader";
import TopPanel from "./components/TopPanel";
import { useGetUserExtendedTodoListsQuery } from "./queries/getUserExtendedTodoLists.query";
import { StyledTodoListsPageWrapper } from "./styles";

const TodoListsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const getUserTodoListsWithTasksQuery = useGetUserExtendedTodoListsQuery();

  useLayoutEffect(() => {
    const title = `${t(TranslationKeys.PageTitleMain)} - ${t(
      TranslationKeys.PageTitleTodoLists
    )}`;
    document.title = title;
  }, []);

  const pageContent = useMemo(() => {
    let pageContent = null;

    if (getUserTodoListsWithTasksQuery.isLoading)
      pageContent = <TodoListsLoader />;
    else if (
      getUserTodoListsWithTasksQuery.isFetched &&
      !!getUserTodoListsWithTasksQuery.data?.length
    ) {
      pageContent = (
        <TodoListsContainer
          todoLists={getUserTodoListsWithTasksQuery.data || []}
        />
      );
    } else {
      pageContent = <EmptyTodoLists />;
    }

    return pageContent;
  }, [
    getUserTodoListsWithTasksQuery.data,
    getUserTodoListsWithTasksQuery.isFetched,
    getUserTodoListsWithTasksQuery.isLoading,
  ]);

  return (
    <StyledTodoListsPageWrapper>
      <TopPanel />
      {pageContent}
    </StyledTodoListsPageWrapper>
  );
};

export default memo(TodoListsPage);
