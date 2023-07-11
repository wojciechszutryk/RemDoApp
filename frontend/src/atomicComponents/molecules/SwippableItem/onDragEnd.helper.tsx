import { PanInfo } from "framer-motion";
import { Dispatch, SetStateAction, useCallback } from "react";

interface Args {
  isPresent: boolean;
  dragStartPosition: number | null;
  setDragStartPosition: Dispatch<SetStateAction<number | null>>;
  safeToRemove: null | undefined | (() => void);
  leftShiftAction?: () => void;
  rightShiftAction?: () => void;
}

const useOnDragEnd = ({
  dragStartPosition,
  isPresent,
  setDragStartPosition,
  safeToRemove,
  leftShiftAction,
  rightShiftAction,
}: Args) => {
  return useCallback<
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  >(
    (_, info) => {
      if (
        rightShiftAction &&
        dragStartPosition &&
        info.offset.x - dragStartPosition > 150
      ) {
        rightShiftAction();
      } else if (
        leftShiftAction &&
        dragStartPosition &&
        info.offset.x - dragStartPosition < -150
      ) {
        leftShiftAction();
      }

      setDragStartPosition(null);
      if (!isPresent && safeToRemove) safeToRemove();
    },
    [
      dragStartPosition,
      isPresent,
      leftShiftAction,
      rightShiftAction,
      safeToRemove,
      setDragStartPosition,
    ]
  );
};

export default useOnDragEnd;
