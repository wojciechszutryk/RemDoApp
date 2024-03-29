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
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import {
  StyledListsCol,
  StyledListsColWrapper,
} from "pages/TodoListsPage/styles";
import { memo, useEffect, useMemo, useState } from "react";
import TodoListCard from "../../../SingleTodoListPage/components/TodoListCard";
import { getOrderedTodoLists } from "./helpers";
import SortableTodoListCard from "./SortableTodoListCard";
import useHandleDrag from "./useHandleDrag";

interface Props {
  todoLists: IExtendedTodoListDto[];
}

const TodoListsContainer = ({ todoLists }: Props): JSX.Element => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const { currentUser } = useCurrentUser();
  const [orderedTodoLists, setOrderedTodoLists] = useState<
    IExtendedTodoListDto[]
  >(getOrderedTodoLists(todoLists, currentUser?.id));

  useEffect(() => {
    setOrderedTodoLists(getOrderedTodoLists(todoLists, currentUser?.id));
  }, [todoLists, currentUser?.id]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  let columns = 1;
  if (isSmallScreen) columns = 2;
  if (isLargeScreen) columns = 3;

  const activeTodoList = todoLists.find((td) => td.id === activeId);

  const { handleDragStart, handleDragEnd, handleDragCancel } = useHandleDrag({
    setActiveId,
    setOrderedTodoLists,
    currentUser,
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
          strategy: MeasuringStrategy.Always,
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
          {/* {orderedTodoLists.map((td) => {
            return (
              <SortableTodoListCard
                key={td.id}
                todoList={td}
                withShakeAnimation={!!activeId && activeId !== td.id}
              />
            );
          })} */}
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
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeId && activeTodoList ? (
          <TodoListCard todoList={activeTodoList} actionsVariant="menu" />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default memo(TodoListsContainer);
