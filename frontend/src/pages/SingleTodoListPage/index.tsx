import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import useCheckLoader from "hooks/useCheckLoader";
import TodoListCard from "pages/SingleTodoListPage/components/TodoListCard";
import EmptyTodoLists from "pages/TodoListsPage/components/EmptyTodoLists";
import { getTodoListsOrderLSKey } from "pages/TodoListsPage/components/TodoListsContainer/helpers";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { TodoListCardLoader } from "./components/TodoListCardLoader";
import { useGetExtendedTodoListQuery } from "./queries/getTodoList.query";
import {
  StyledBackButton,
  StyledSingleTodoListPageWrapper,
  StyledSwipeIndicator,
} from "./styles";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 800 : -800,
      opacity: 0,
    };
  },
  initial: { opacity: 0 },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
};

const SingleTodoListPage = (): JSX.Element => {
  const { todoListId } = useParams();
  const [direction, setDirection] = useState(0);
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const [animationKey, setAnimationKey] = useState("");
  const { t } = useTranslation();
  const getTodoListWithTasksQuery = useGetExtendedTodoListQuery(todoListId);
  const showLoader = useCheckLoader(getTodoListWithTasksQuery.isLoading);

  const todoListsOrderFromLS: string[] = JSON.parse(
    localStorage.getItem(getTodoListsOrderLSKey(currentUser?.id || "")) || "[]"
  );

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      if (!todoListId) return;
      const currentIndex = todoListsOrderFromLS.indexOf(todoListId);
      const nextIndex =
        newDirection < 0
          ? currentIndex > todoListsOrderFromLS.length - 2
            ? 0
            : currentIndex + 1
          : currentIndex === 0
          ? todoListsOrderFromLS.length - 1
          : currentIndex - 1;

      const nextTodoListId = todoListsOrderFromLS[nextIndex];
      setAnimationKey(nextTodoListId);
      navigate(Pages.TodoListPage.path(nextTodoListId));
    },
    [todoListId, todoListsOrderFromLS, navigate]
  );

  const content = useMemo(() => {
    let pageContent = null;

    if (showLoader) pageContent = <TodoListCardLoader />;
    else if (
      getTodoListWithTasksQuery.isFetched &&
      !getTodoListWithTasksQuery.data
    ) {
      pageContent = <EmptyTodoLists />;
    } else if (!!getTodoListWithTasksQuery.data) {
      pageContent = (
        <TodoListCard
          disableHeaderRedirect
          todoList={getTodoListWithTasksQuery.data}
          scrollableContent
          actionsVariant="buttons"
        />
      );
    }

    return pageContent;
  }, [
    getTodoListWithTasksQuery.data,
    getTodoListWithTasksQuery.isFetched,
    showLoader,
  ]);

  if (!getTodoListWithTasksQuery.data && !showLoader) return <></>;

  return (
    <StyledSingleTodoListPageWrapper key={animationKey}>
      <StyledBackButton onClick={() => navigate(Pages.TodoListsPage.path)}>
        <ArrowBackIcon />
        <p>{t(TranslationKeys.BackToTodoLists)}</p>
      </StyledBackButton>
      <motion.div
        custom={direction}
        variants={variants}
        initial={direction ? "enter" : "initial"}
        animate="center"
        exit="exit"
        transition={{
          opacity: { duration: 0.2 },
        }}
      >
        {content}
      </motion.div>
      {todoListsOrderFromLS.length > 2 && (
        <>
          <StyledSwipeIndicator onClick={() => paginate(1)} />
          <StyledSwipeIndicator right onClick={() => paginate(-1)} />
        </>
      )}
    </StyledSingleTodoListPageWrapper>
  );
};

export default memo(SingleTodoListPage);
