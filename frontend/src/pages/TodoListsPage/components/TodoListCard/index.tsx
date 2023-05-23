import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ITaskAttached } from "linked-models/task/task.model";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import * as React from "react";
import { memo } from "react";
import CardActions from "./components/CardActions";
import CardContent from "./components/CardContent";
import CardHeader from "./components/CardHeader";
import { StyledTodoListCard, StyledTodoListCardWrapper } from "./styles";

const animateLayoutChanges: AnimateLayoutChanges = (args) => {
  const { isSorting, wasDragging } = args;

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
};

interface Props {
  todoList: IExtendedTodoListDto;
  withShakeAnimation?: boolean;
}

const TodoListCard = ({ todoList, withShakeAnimation }: Props): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todoList.id, animateLayoutChanges });

  const { activeTasks, finishedTasks } = React.useMemo(() => {
    const activeTasks: ITaskAttached[] = [];
    const finishedTasks: ITaskAttached[] = [];
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
    <StyledTodoListCardWrapper
      isDragging={isDragging}
      ref={setNodeRef}
      transition={transition}
      transform={CSS.Transform.toString(transform)}
    >
      <StyledTodoListCard withShakeAnimation={withShakeAnimation}>
        <CardHeader
          todoList={todoList}
          listeners={listeners}
          attributes={attributes}
          isDragging={isDragging}
        />
        <CardContent
          activeTasks={activeTasks}
          finishedTasks={finishedTasks}
          expanded={expanded}
        />
        <CardActions
          showExpandIcon={finishedTasks.length > 0 && activeTasks.length !== 0}
          setExpanded={setExpanded}
          expanded={expanded}
          todoList={todoList}
        />
      </StyledTodoListCard>
    </StyledTodoListCardWrapper>
  );
};

export default memo(TodoListCard);
