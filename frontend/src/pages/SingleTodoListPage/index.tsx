import { motion } from "framer-motion";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { Pages } from "framework/routing/pages";
import TodoListCard from "pages/SingleTodoListPage/components/TodoListCard";
import EmptyTodoLists from "pages/TodoListsPage/components/EmptyTodoLists";
import { getTodoListsOrderLSKey } from "pages/TodoListsPage/components/TodoListsContainer/helpers";
import TopPanel from "pages/TodoListsPage/components/TopPanel";
import { memo, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoListCardLoader } from "./components/TodoListCardLoader";
import { useGetExtendedTodoListQuery } from "./queries/getTodoList.query";
import {
  StyledSingleTodoListPageWrapper,
  StyledSwipeIndicator,
} from "./styles";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const SingleTodoListPage = (): JSX.Element => {
  const { todoListId } = useParams();
  const [direction, setDirection] = useState(0);
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const [animationKey, setAnimationKey] = useState("");

  const todoListsOrderFromLS: string[] = JSON.parse(
    localStorage.getItem(getTodoListsOrderLSKey(currentUser?.id || "")) || "[]"
  );

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (!todoListId) return;
    const currentIndex = todoListsOrderFromLS.indexOf(todoListId);
    const nextIndex =
      newDirection > 0
        ? currentIndex > todoListsOrderFromLS.length - 2
          ? 0
          : currentIndex + 1
        : currentIndex === 0
        ? todoListsOrderFromLS.length - 1
        : currentIndex - 1;
    const nextTodoListId = todoListsOrderFromLS[nextIndex];
    setAnimationKey(nextTodoListId);
    setTimeout(() => {
      navigate(Pages.TodoListPage.path(nextTodoListId));
    }, 200);
  };

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
    <StyledSingleTodoListPageWrapper key={animationKey}>
      <TopPanel />
      <motion.div
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          opacity: { duration: 0.2 },
        }}
      >
        {content}
      </motion.div>
      <StyledSwipeIndicator onClick={() => paginate(1)} />
      <StyledSwipeIndicator right onClick={() => paginate(-1)} />
    </StyledSingleTodoListPageWrapper>
  );
};

export default memo(SingleTodoListPage);
