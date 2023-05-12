import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

const TodoListCard = ({
  todoList: { tasks, name, id, icon, assignedOwners, assignedUsers },
  withShakeAnimation,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, animateLayoutChanges });

  return (
    <StyledTodoListCardWrapper
      isDragging={isDragging}
      ref={setNodeRef}
      transition={transition}
      transform={CSS.Transform.toString(transform)}
    >
      <StyledTodoListCard withShakeAnimation={withShakeAnimation}>
        <CardHeader
          assignedOwners={assignedOwners}
          assignedUsers={assignedUsers}
          listeners={listeners}
          attributes={attributes}
          name={name}
          icon={icon}
          isDragging={isDragging}
        />
        <CardContent tasks={tasks} expanded={expanded} />
        <CardActions setExpanded={setExpanded} expanded={expanded} />
      </StyledTodoListCard>
    </StyledTodoListCardWrapper>
  );
};

export default memo(TodoListCard);
