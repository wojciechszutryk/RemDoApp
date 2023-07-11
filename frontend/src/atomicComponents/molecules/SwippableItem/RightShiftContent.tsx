import { motion, MotionValue, useTransform } from "framer-motion";
import { memo } from "react";
import { StyledSwipeRightContainer } from "./styles";

interface Props {
  x: MotionValue<number>;
  RightShiftIcon?: JSX.Element;
}

const RightShiftContent = ({ RightShiftIcon, x }: Props): JSX.Element => {
  const opacity = useTransform(x, [0, 75], [0, 1]);
  const transform = useTransform(
    x,
    [0, 75, 76],
    ["scale(1)", "scale(1.1)", "scale(1.5)"]
  );
  return (
    <StyledSwipeRightContainer>
      <motion.div style={{ transform, zIndex: 1, opacity }}>
        {RightShiftIcon}
      </motion.div>
    </StyledSwipeRightContainer>
  );
};

export default memo(RightShiftContent);
