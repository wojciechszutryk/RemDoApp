import {
  motion,
  useMotionValue,
  usePresence,
  useTransform,
} from "framer-motion";
import { memo, useState } from "react";
import LeftShiftContent from "./LeftShiftContent";
import RightShiftContent from "./RightShiftContent";
import RightShiftFullContent from "./RightShiftFullContent";
import { SwippableItemContextProvider } from "./context";
import useOnDragEnd from "./onDragEnd.helper";
import { listItemAnimations } from "./styles";

interface SideShiftProps {
  color: string;
  Icon: JSX.Element;
  action: () => void;
}

interface SwippableItemProps {
  defaultColor?: string;
  rightShiftFull?: SideShiftProps;
  rightShift?: SideShiftProps;
  leftShift?: SideShiftProps;
  leftShiftFull?: SideShiftProps;
  children: JSX.Element;
}

const SwippableItem = ({
  defaultColor,
  rightShift,
  rightShiftFull,
  leftShift,
  leftShiftFull,
  children,
}: SwippableItemProps): JSX.Element => {
  const [isPresent, safeToRemove] = usePresence();
  const [dragStartPosition, setDragStartPosition] = useState<null | number>(
    null
  );
  const x = useMotionValue(0);
  const onDragEnd = useOnDragEnd({
    isPresent,
    dragStartPosition,
    setDragStartPosition,
    safeToRemove,
    leftShiftAction: leftShift?.action,
    leftShiftFullAction: leftShiftFull?.action,
    rightShiftAction: rightShift?.action,
    rightShiftFullAction: rightShiftFull?.action,
  });

  const background = useTransform(
    x,
    [-75, 0, 75],
    [leftShift?.color, defaultColor, rightShift?.color]
  );

  return (
    <motion.div
      {...listItemAnimations(isPresent)}
      style={{
        cursor: "grab",
        borderRadius: 8,
        position: isPresent ? "static" : "absolute",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background,
        }}
      >
        <RightShiftContent x={x} RightShiftIcon={rightShift?.Icon} />
        {rightShiftFull && (
          <RightShiftFullContent
            x={x}
            RightShiftFullIcon={rightShiftFull?.Icon}
          />
        )}
        <LeftShiftContent x={x} LeftShiftIcon={leftShift?.Icon} />
        {/* {leftShiftFull && ( */}
        {/* // <RightShiftFullContent x={x} RightShiftIcon={leftShiftFull?.Icon} /> */}
        {/* )} */}
        <motion.div
          drag={"x"}
          style={{ x }}
          dragDirectionLock
          dragConstraints={{ right: 0, left: 0 }}
          dragTransition={{
            bounceStiffness: 600,
          }}
          dragElastic={0.5}
          onDragStart={(_, info) => {
            setDragStartPosition(info.offset.x);
          }}
          onDragEnd={onDragEnd}
          whileTap={{ cursor: "grabbing" }}
        >
          <SwippableItemContextProvider
            value={{ isPresent, x, dragStartPosition }}
          >
            {children}
          </SwippableItemContextProvider>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default memo(SwippableItem);
