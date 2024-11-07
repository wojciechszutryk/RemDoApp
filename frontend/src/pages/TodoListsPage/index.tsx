import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import EmptyTodoLists from "./components/EmptyTodoLists";
import TodoListsContainer from "./components/TodoListsContainer";
import { TodoListsLoader } from "./components/TodoListsLoader";
import TopPanel from "./components/TopPanel";
import { useGetUserExtendedTodoListsQuery } from "./queries/getUserExtendedTodoLists.query";
import { StyledTodoListsPageWrapper } from "./styles";

const TodoListsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { isLoading, isFetched, data } = useGetUserExtendedTodoListsQuery();

  useLayoutEffect(() => {
    const title = `${t(TranslationKeys.PageTitleMain)} - ${t(
      TranslationKeys.PageTitleTodoLists
    )}`;
    document.title = title;
  }, []);

  return (
    <StyledTodoListsPageWrapper>
      <TopPanel isEmpty={!isLoading && isFetched && !data?.length} />

      {isLoading ? (
        <TodoListsLoader />
      ) : isFetched && data?.length ? (
        <TodoListsContainer todoLists={data || []} />
      ) : (
        <EmptyTodoLists />
      )}
    </StyledTodoListsPageWrapper>
  );
};

export default memo(TodoListsPage);
