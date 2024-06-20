import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { Pages } from "framework/routing/pages";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import useCheckLoader from "hooks/useCheckLoader";
import TodoListCard from "pages/SingleTodoListPage/components/TodoListCard";
import EmptyTodoLists from "pages/TodoListsPage/components/EmptyTodoLists";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { memo, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { TodoListCardLoader } from "../../atomicComponents/atoms/Loaders/TodoListCardLoader";
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

interface Props {
  disableListsNavigate?: boolean;
}

const SingleTodoListPage = ({ disableListsNavigate }: Props): JSX.Element => {
  const { todoListId } = useParams();
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();
  const [animationKey, setAnimationKey] = useState("");
  const { t } = useTranslation();
  const getUserTodoListsWithTasksQuery = useGetUserExtendedTodoListsQuery();
  const showLoader = useCheckLoader(getUserTodoListsWithTasksQuery.isLoading);

  useLayoutEffect(() => {
    const title = `${t(TranslationKeys.PageTitleMain)} - ${t(
      TranslationKeys.PageTitleTodoLists
    )}`;
    document.title = title;
  }, []);

  const [orderedTodoListIDs, currentTodoList] = useMemo(
    () => [
      getUserTodoListsWithTasksQuery.data?.map((todoList) => todoList.id) || [],
      getUserTodoListsWithTasksQuery.data?.find(
        (todoList) => todoList.id === todoListId
      ),
    ],
    [getUserTodoListsWithTasksQuery.data, todoListId]
  );

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      if (!todoListId) return;
      const currentIndex = orderedTodoListIDs.indexOf(todoListId);
      const nextIndex =
        newDirection < 0
          ? currentIndex > orderedTodoListIDs.length - 2
            ? 0
            : currentIndex + 1
          : currentIndex === 0
          ? orderedTodoListIDs.length - 1
          : currentIndex - 1;

      const nextTodoListId = orderedTodoListIDs[nextIndex];
      setAnimationKey(nextTodoListId);
      navigate(Pages.TodoListPage.path(nextTodoListId));
    },
    [todoListId, orderedTodoListIDs, navigate]
  );

  const content = useMemo(() => {
    let pageContent = null;

    if (showLoader) pageContent = <TodoListCardLoader />;
    else if (getUserTodoListsWithTasksQuery.isFetched && !currentTodoList) {
      pageContent = <EmptyTodoLists />;
    } else if (!!currentTodoList) {
      pageContent = (
        <TodoListCard
          disableHeaderRedirect
          todoList={currentTodoList}
          scrollableContent
          actionsVariant="buttons"
        />
      );
    }

    return pageContent;
  }, [currentTodoList, getUserTodoListsWithTasksQuery.isFetched, showLoader]);

  if (!currentTodoList && !showLoader) return <></>;

  return (
    <StyledSingleTodoListPageWrapper key={animationKey}>
      {!disableListsNavigate && (
        <StyledBackButton onClick={() => navigate(Pages.TodoListsPage.path)}>
          <ArrowBackIcon />
          <p>{t(TranslationKeys.BackToTodoLists)}</p>
        </StyledBackButton>
      )}
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
      {orderedTodoListIDs.length > 2 && !disableListsNavigate && (
        <>
          <StyledSwipeIndicator onClick={() => paginate(1)} />
          <StyledSwipeIndicator right onClick={() => paginate(-1)} />
        </>
      )}
    </StyledSingleTodoListPageWrapper>
  );
};

export default memo(SingleTodoListPage);
