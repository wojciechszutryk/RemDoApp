import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Dispatch, SetStateAction, useState } from "react";

import { IExtendedTaskDto } from "linked-models/task/task.dto";
import useHandleDrag from "pages/TodoListsPage/components/TodoListsContainer/useHandleDrag";
import { SortableTaskItem } from "./SortableTaskItem";

interface SortableTaskListProps {
  todoListId: string;
  sortedTasks: IExtendedTaskDto[];
  setSortedTasks: Dispatch<SetStateAction<IExtendedTaskDto[]>>;
}

const SortableTaskList = ({
  todoListId,
  sortedTasks,
  setSortedTasks,
}: SortableTaskListProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { handleDragStart, handleDragEnd, handleDragCancel } = useHandleDrag({
    setActiveId,
    setOrderedItems: setSortedTasks,
    todoListId,
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      onDragStart={handleDragStart}
    >
      <SortableContext
        items={sortedTasks}
        strategy={verticalListSortingStrategy}
      >
        {sortedTasks.map((task) => (
          <SortableTaskItem
            key={task.id}
            task={task}
            withShakeAnimation={!activeId}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableTaskList;
