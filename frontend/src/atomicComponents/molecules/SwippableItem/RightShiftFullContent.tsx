import { motion, MotionValue, useTransform } from "framer-motion";
import { memo } from "react";
import { StyledSwipeRightContainer } from "./styles";

interface Props {
  x: MotionValue<number>;
  RightShiftFullIcon?: JSX.Element;
}

const RightShiftFullContent = ({
  RightShiftFullIcon,
  x,
}: Props): JSX.Element => {
  const fullOpacity = useTransform(x, [0, 80, 90], [0, 0, 1]);
  const fullTransform = useTransform(
    x,
    [0, 80, 90],
    ["scale(0)", "scale(1.1)", "scale(1.5)"]
  );

  return (
    <StyledSwipeRightContainer>
      <motion.div
        style={{ transform: fullTransform, zIndex: 1, opacity: fullOpacity }}
      >
        {RightShiftFullIcon}
      </motion.div>
    </StyledSwipeRightContainer>
  );
};

export default memo(RightShiftFullContent);
