import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { IUserAttached } from "linked-models/user/user.model";
import { SetStateAction, useCallback } from "react";
import { getTodoListsOrderLSKey } from "./helpers";

interface Args {
  setOrderedTodoLists: (value: SetStateAction<IExtendedTodoListDto[]>) => void;
  setActiveId: (value: SetStateAction<string | null>) => void;
  currentUser: IUserAttached | undefined;
}

const useHandleDrag = ({
  setActiveId,
  setOrderedTodoLists,
  currentUser,
}: Args) => {
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id as string);
    },
    [setActiveId]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        setOrderedTodoLists((items) => {
          const oldIndex = items.findIndex((i) => i.id === active.id);
          const newIndex = items.findIndex((i) => i.id === over?.id);

          if (newIndex !== -1) {
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
    [currentUser, setActiveId, setOrderedTodoLists]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, [setActiveId]);

  return { handleDragStart, handleDragEnd, handleDragCancel };
};

export default useHandleDrag;
