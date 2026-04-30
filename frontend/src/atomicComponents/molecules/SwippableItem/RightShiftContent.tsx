import { motion, MotionValue, useTransform } from "framer-motion";
import { memo } from "react";
import { StyledSwipeRightContainer } from "./styles";

interface Props {
  x: MotionValue<number>;
  RightShiftIcon?: JSX.Element;
  /** if true, it will animate till the end */
  untillFull?: boolean;
}

const RightShiftContent = ({
  RightShiftIcon,
  x,
  untillFull,
}: Props): JSX.Element => {
  const opacity = useTransform(
    x,
    untillFull ? [0, 75] : [0, 60, 80],
    untillFull ? [0, 1] : [0, 0.5, 1]
  );
  const transform = useTransform(
    x,
    untillFull ? [0, 75, 76] : [0, 60, 79, 80],
    untillFull
      ? ["scale(1)", "scale(1.1)", "scale(1.5)"]
      : ["scale(1)", "scale(1.1)", "scale(1.5)", "scale(0)"]
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
