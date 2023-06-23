import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import TodoListCard from "pages/SingleTodoListPage/components/TodoListCard";
import { StyledTodoListCardWrapper } from "pages/SingleTodoListPage/components/TodoListCard/styles";
import { memo } from "react";

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
  } = useSortable({ id: todoList.id, animateLayoutChanges });

  return (
    <StyledTodoListCardWrapper
      isDragging={isDragging}
      ref={setNodeRef}
      transition={transition}
      transform={CSS.Transform.toString(transform)}
    >
      <TodoListCard
        todoList={todoList}
        withShakeAnimation={withShakeAnimation}
        draggingProps={{ listeners, attributes, isDragging }}
        actionsVariant="menu"
      />
    </StyledTodoListCardWrapper>
  );
};

export default memo(SortableTodoListCard);
