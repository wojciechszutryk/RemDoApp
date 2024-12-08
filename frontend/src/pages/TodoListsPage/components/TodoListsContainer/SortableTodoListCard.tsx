import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { StyledTodoListCardWrapper } from "atomicComponents/molecules/TodoListCard/styles";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { memo } from "react";
import TodoListCard from "../TodoListCard";

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

const SortableTodoListCard = ({
  todoList,
  withShakeAnimation,
}: Props): JSX.Element => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: todoList.id,
    animateLayoutChanges,
  });

  return (
    <StyledTodoListCardWrapper
      isDragging={isDragging}
      ref={setNodeRef}
      transition={transition}
      transform={
        transform
          ? CSS.Transform.toString({ ...transform, scaleY: 1 })
          : undefined
      }
    >
      <TodoListCard
        todoList={todoList}
        withShakeAnimation={withShakeAnimation}
        draggingProps={{ listeners, attributes, isDragging }}
      />
    </StyledTodoListCardWrapper>
  );
};

export default memo(SortableTodoListCard);
