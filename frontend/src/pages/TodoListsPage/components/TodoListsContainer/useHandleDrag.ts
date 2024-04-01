import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { IUserAttached } from "linked-models/user/user.model";
import { useUpsertOrdersMutation } from "pages/TodoListsPage/mutations/upsertOrders/upsertOrders.mutation";
import { SetStateAction, useCallback } from "react";

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
  const upsertOrdersMutation = useUpsertOrdersMutation(currentUser?.id);

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
            const reorderedList = arrayMove(items, oldIndex, newIndex);
            upsertOrdersMutation.mutate(
              reorderedList.map((td, index) => ({
                todoListId: td.id,
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
    [setActiveId, setOrderedTodoLists, upsertOrdersMutation]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, [setActiveId]);

  return { handleDragStart, handleDragEnd, handleDragCancel };
};

export default useHandleDrag;
