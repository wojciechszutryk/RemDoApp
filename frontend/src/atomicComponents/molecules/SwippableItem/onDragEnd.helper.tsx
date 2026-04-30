import { PanInfo } from "framer-motion";
import { Dispatch, SetStateAction, useCallback } from "react";

interface Args {
  isPresent: boolean;
  dragStartPosition: number | null;
  setDragStartPosition: Dispatch<SetStateAction<number | null>>;
  safeToRemove: null | undefined | (() => void);
  leftShiftAction?: () => void;
  leftShiftFullAction?: () => void;
  rightShiftAction?: () => void;
  rightShiftFullAction?: () => void;
}

const useOnDragEnd = ({
  dragStartPosition,
  isPresent,
  setDragStartPosition,
  safeToRemove,
  leftShiftAction,
  leftShiftFullAction,
  rightShiftAction,
  rightShiftFullAction,
}: Args) => {
  return useCallback<
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  >(
    (_, info) => {
      if (
        rightShiftFullAction &&
        dragStartPosition &&
        info.offset.x - dragStartPosition > 150
      ) {
        rightShiftFullAction();
      } else if (
        rightShiftAction &&
        dragStartPosition &&
        info.offset.x - dragStartPosition > (rightShiftFullAction ? 100 : 150)
      ) {
        rightShiftAction();
      } else if (
        leftShiftFullAction &&
        dragStartPosition &&
        info.offset.x - dragStartPosition < -150
      ) {
        leftShiftFullAction();
      } else if (
        leftShiftAction &&
        dragStartPosition &&
        info.offset.x - dragStartPosition < (leftShiftFullAction ? -100 : -150)
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
      leftShiftFullAction,
      rightShiftAction,
      rightShiftFullAction,
      safeToRemove,
      setDragStartPosition,
    ]
  );
};

export default useOnDragEnd;
