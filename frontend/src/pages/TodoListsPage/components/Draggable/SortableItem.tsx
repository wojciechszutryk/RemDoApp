import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { FC } from "react";
import Item, { ItemProps } from "./Item";

interface Props extends ItemProps {
  todoList: IExtendedTodoListDto;
}

const SortableItem: FC<Props> = (props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
