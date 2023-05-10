import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
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
import { useMediaQuery, useTheme } from "@mui/material";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { StyledTodoListsWrapper } from "pages/TodoListsPage/styles";
import { memo, useCallback, useState } from "react";
import TodoListCard from "../TodoListCard";

interface Props {
  todoLists: IExtendedTodoListDto[];
}

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const getTodoListsOrderLSKey = (userId: string) =>
  `todoListsOrderForUser${userId}`;

const getOrderedTodoLists = (
  todoLists: IExtendedTodoListDto[],
  userId: string | undefined
) => {
  if (!userId) return todoLists;
  const todoListsOrderFromLS = localStorage.getItem(
    getTodoListsOrderLSKey(userId)
  );
  if (!todoListsOrderFromLS) return todoLists;
  const todoListsOrder: string[] = JSON.parse(todoListsOrderFromLS);

  const orderedTodoLists = todoLists.sort((a, b) => {
    const indexOfA = todoListsOrder.indexOf(a.id);
    const indexOfB = todoListsOrder.indexOf(b.id);

    if (indexOfA === -1 || indexOfB === -1) {
      if (a.whenUpdated < b.whenUpdated) return -1;

      if (a.whenUpdated > b.whenUpdated) return 1;
    }

    if (indexOfA < indexOfB) return -1;

    if (indexOfA > indexOfB) return 1;

    return 0;
  });

  return orderedTodoLists;
};

const TodoListsContainer = ({ todoLists }: Props): JSX.Element => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const { currentUser } = useCurrentUser();
  const [orderedTodoLists, setOrderedTodoLists] = useState<
    IExtendedTodoListDto[]
  >(getOrderedTodoLists(todoLists, currentUser?.id));

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  let columns = 1;
  if (isSmallScreen) columns = 2;
  if (isLargeScreen) columns = 3;

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        setOrderedTodoLists((items) => {
          const itemIDs = items.map((item) => item.id);

          const oldIndex = itemIDs.indexOf(active.id as string);
          const newIndex = itemIDs.indexOf(over?.id as string);

          if (newIndex) {
            const reorderedItems = arrayMove(items, oldIndex, newIndex);
            if (currentUser)
              localStorage.setItem(
                getTodoListsOrderLSKey(currentUser?.id),
                JSON.stringify(reorderedItems.map((todoList) => todoList.id))
              );
            return reorderedItems;
          }

          return items;
        });
      }

      setActiveId(null);
    },
    [currentUser]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const activeTodoList = todoLists.find((td) => td.id === activeId);

  return (
    <DndContext
      measuring={measuringConfig}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={orderedTodoLists} strategy={rectSortingStrategy}>
        <StyledTodoListsWrapper columns={columns}>
          {orderedTodoLists.map((td) => (
            <TodoListCard
              key={td.id}
              todoList={td}
              withShakeAnimation={!!activeId && activeId !== td.id}
            />
          ))}
        </StyledTodoListsWrapper>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeId && activeTodoList ? (
          <TodoListCard todoList={activeTodoList} withShakeAnimation={false} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default memo(TodoListsContainer);
