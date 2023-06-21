import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import * as React from "react";
import { memo } from "react";
import CardActions from "./components/CardActions";
import CardContent from "./components/CardContent";
import CardHeader, { IDraggingButtonProps } from "./components/CardHeader";
import CardActionsSkeleton from "./components/LoaderSkeletons/CardActionsSkeleton";
import CardContentSkeleton from "./components/LoaderSkeletons/CardContentSkeleton";
import CardHeaderSkeleton from "./components/LoaderSkeletons/CardHeaderSkeleton";
import { StyledTodoListCard } from "./styles";

interface Props {
  todoList: IExtendedTodoListDto;
  withShakeAnimation?: boolean;
  draggingProps?: IDraggingButtonProps;
  scrollableContent?: boolean;
  isLoading?: boolean;
}

const TodoListCard = ({
  todoList,
  withShakeAnimation,
  draggingProps,
  scrollableContent,
  isLoading,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);

  const { activeTasks, finishedTasks } = React.useMemo(() => {
    const activeTasks: IExtendedTaskDto[] = [];
    const finishedTasks: IExtendedTaskDto[] = [];
    todoList.tasks.forEach((task) => {
      if (!!task.finishDate) {
        finishedTasks.push(task);
      } else {
        activeTasks.push(task);
      }
    });
    return { activeTasks, finishedTasks };
  }, [todoList.tasks]);

  return (
    <StyledTodoListCard withShakeAnimation={withShakeAnimation}>
      {isLoading ? (
        <CardHeaderSkeleton />
      ) : (
        <CardHeader todoList={todoList} draggingProps={draggingProps} />
      )}
      {isLoading ? (
        <CardContentSkeleton />
      ) : (
        <CardContent
          scrollable={scrollableContent}
          activeTasks={activeTasks}
          finishedTasks={finishedTasks}
          expanded={expanded}
        />
      )}
      {isLoading ? (
        <CardActionsSkeleton />
      ) : (
        <CardActions
          showExpandIcon={
            !scrollableContent &&
            finishedTasks.length > 0 &&
            activeTasks.length !== 0
          }
          setExpanded={setExpanded}
          expanded={expanded}
          todoList={todoList}
        />
      )}
    </StyledTodoListCard>
  );
};

export default memo(TodoListCard);
