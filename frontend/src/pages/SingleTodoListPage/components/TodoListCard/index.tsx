import { IExtendedTaskDto } from "linked-models/task/task.dto";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import * as React from "react";
import { memo } from "react";
import CardActions from "./components/CardActions";
import CardContent from "./components/CardContent";
import CardHeader, { IDraggingButtonProps } from "./components/CardHeader";
import { StyledTodoListCard } from "./styles";

interface Props {
  todoList: IExtendedTodoListDto;
  withShakeAnimation?: boolean;
  draggingProps?: IDraggingButtonProps;
  fixedContentHeight?: boolean;

}

const TodoListCard = ({
  todoList,
  withShakeAnimation,
  draggingProps,
  fixedContentHeight,
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
      <CardHeader todoList={todoList} draggingProps={draggingProps} />
      <CardContent
        fixedContentHeight={fixedContentHeight}
        activeTasks={activeTasks}
        finishedTasks={finishedTasks}
        expanded={expanded}
      />
      <CardActions
        showExpandIcon={!fixedContentHeight && finishedTasks.length > 0 && activeTasks.length !== 0}
        setExpanded={setExpanded}
        expanded={expanded}
        todoList={todoList}
      />
    </StyledTodoListCard>
  );
};

export default memo(TodoListCard);
