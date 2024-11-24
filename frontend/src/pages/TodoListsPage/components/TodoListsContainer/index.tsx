import {
  closestCenter,
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useMediaQuery, useTheme } from "@mui/material";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  StyledListsCol,
  StyledListsColWrapper,
} from "pages/TodoListsPage/styles";
import { memo, useEffect, useMemo, useState } from "react";
import TodoListCard from "../../../SingleTodoListPage/components/TodoListCard";
import SortableTodoListCard from "./SortableTodoListCard";
import useHandleDrag from "./useHandleDrag";

interface Props {
  todoLists: IExtendedTodoListDto[];
}

const TodoListsContainer = ({ todoLists }: Props): JSX.Element => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  //we need to keep ordered todoLists in separate state
  const [orderedTodoLists, setOrderedTodoLists] = useState(todoLists);
  useEffect(() => {
    setOrderedTodoLists(todoLists);
  }, [todoLists]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  let columns = 1;
  if (isSmallScreen) columns = 2;
  if (isLargeScreen) columns = 3;

  const activeTodoList = todoLists.find((td) => td.id === activeId);

  const { handleDragStart, handleDragEnd, handleDragCancel } = useHandleDrag({
    setActiveId,
    setOrderedItems: setOrderedTodoLists,
  });

  const columsData = useMemo(() => {
    const colums: IExtendedTodoListDto[][] = Array.from(
      { length: columns },
      () => []
    );

    orderedTodoLists.forEach((td, index) => {
      colums[index % columns].push(td);
    });

    return colums;
  }, [columns, orderedTodoLists]);

  return (
    <DndContext
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.BeforeDragging,
        },
      }}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={orderedTodoLists} strategy={rectSortingStrategy}>
        <StyledListsColWrapper>
          {columsData.map((column, index) => {
            return (
              <StyledListsCol key={index} columns={columns}>
                {column.map((td) => {
                  return (
                    <SortableTodoListCard
                      key={td.id}
                      todoList={td}
                      withShakeAnimation={!!activeId && activeId !== td.id}
                    />
                  );
                })}
              </StyledListsCol>
            );
          })}
        </StyledListsColWrapper>
      </SortableContext>
      <DragOverlay adjustScale={false} style={{ transformOrigin: "0 0 " }}>
        {activeId && activeTodoList ? (
          <TodoListCard todoList={activeTodoList} actionsVariant="menu" />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default memo(TodoListsContainer);
