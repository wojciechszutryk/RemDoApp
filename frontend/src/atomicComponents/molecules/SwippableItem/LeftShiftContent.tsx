import { motion, MotionValue, useTransform } from "framer-motion";
import { memo } from "react";
import { StyledSwipeLeftContainer } from "./styles";

interface Props {
  x: MotionValue<number>;
  LeftShiftIcon?: JSX.Element;
}

const LeftShiftContent = ({ LeftShiftIcon, x }: Props): JSX.Element => {
  const opacity = useTransform(x, [-75, 0], [1, 0]);
  const transform = useTransform(
    x,
    [-76, -75, 0],
    ["scale(1.5)", "scale(1.1)", "scale(1)"]
  );
  return (
    <StyledSwipeLeftContainer>
      <motion.div style={{ transform, zIndex: 1, opacity }}>
        {LeftShiftIcon}
      </motion.div>
    </StyledSwipeLeftContainer>
  );
};

export default memo(LeftShiftContent);
