import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Button } from "atomicComponents/atoms/Button";
import { useDialogs } from "framework/dialogs";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { memo, useCallback, useEffect, useState } from "react";
import Item from "./components/Draggable/Item";
import SortableItem from "./components/Draggable/SortableItem";
import { useGetUserTodoListsWithTasksQuery } from "./queries/getUserTodoListsWithTasks.query";
import { StyledTodoListsPageWrapper, StyledTodoListsWrapper } from "./styles";

const TodoListsPage = (): JSX.Element => {
  const { dialogsActions } = useDialogs();
  const getUserTodoListsWithTasksQuery = useGetUserTodoListsWithTasksQuery();

  const handleOpenCreateTodoListDialog = () => {
    dialogsActions.updateTodoListDialog({ visible: true });
  };

  const [items, setItems] = useState<IExtendedTodoListDto[]>([]);

  useEffect(() => {
    setItems(getUserTodoListsWithTasksQuery.data || []);
  }, [getUserTodoListsWithTasksQuery.data]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const itemIDs = items.map((item) => item.id);

        const oldIndex = itemIDs.indexOf(active.id as string);
        const newIndex = itemIDs.indexOf(over?.id as string);

        if (newIndex) return arrayMove(items, oldIndex, newIndex);
        return items;
      });
    }

    setActiveId(null);
  }, []);
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const activeTodoList = getUserTodoListsWithTasksQuery.data?.find(
    (td) => td.id === activeId
  );
  return (
    <StyledTodoListsPageWrapper>
      <h1>Todo Lists</h1>
      <Button onClick={handleOpenCreateTodoListDialog}>Dodaj todoliste</Button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <StyledTodoListsWrapper columns={5}>
            {items.map((td) => (
              <SortableItem key={td.id} id={td.id} todoList={td} />
            ))}
          </StyledTodoListsWrapper>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {activeId && activeTodoList ? (
            <Item id={activeId} isDragging todoList={activeTodoList} />
          ) : null}
        </DragOverlay>
      </DndContext>
      {/* {getUserTodoListsWithTasksQuery.data?.map((todoList) => (
        <TodoListCard key={todoList.id} todoList={todoList} />
      ))} */}
    </StyledTodoListsPageWrapper>
  );
};

export default memo(TodoListsPage);
