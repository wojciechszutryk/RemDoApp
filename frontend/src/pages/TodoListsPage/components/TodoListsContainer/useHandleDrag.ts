import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useUpsertOrdersMutation } from "pages/TodoListsPage/mutations/upsertOrders/upsertOrders.mutation";
import { SetStateAction, useCallback } from "react";

interface Args<T extends { id: string }> {
  setOrderedItems: (value: SetStateAction<T[]>) => void;
  setActiveId: (value: SetStateAction<string | null>) => void;
  todoListId?: string;
}

const useHandleDrag = <T extends { id: string }>({
  setActiveId,
  setOrderedItems,
  todoListId,
}: Args<T>) => {
  const upsertOrdersMutation = useUpsertOrdersMutation();

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
        setOrderedItems((items) => {
          const oldIndex = items.findIndex((i) => i.id === active.id);
          const newIndex = items.findIndex((i) => i.id === over?.id);

          if (newIndex !== -1) {
            const reorderedList = arrayMove(items, oldIndex, newIndex);
            upsertOrdersMutation.mutate(
              //if todoListId is passed, we assume that we are reordering tasks within a single todo list (items are tasks), if not we assume that items are todo lists
              reorderedList.map((item, index) => ({
                taskId: !!todoListId ? item.id : undefined,
                todoListId: todoListId || item.id,
                value: index + 1,
              }))
            );

            return reorderedList;
          }

          return items;
        });
      }

      setActiveId(null);
    },
    [setActiveId, setOrderedItems, upsertOrdersMutation]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, [setActiveId]);

  return { handleDragStart, handleDragEnd, handleDragCancel };
};

export default useHandleDrag;
