import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { useTheme } from "@mui/material";
import { motion, MotionValue, useTransform } from "framer-motion";
import { memo } from "react";
import { StyledSwipeRightContainer } from "../styles";

interface Props {
  x: MotionValue<number>;
  finished?: boolean;
}

const RightShiftContent = ({ finished, x }: Props): JSX.Element => {
  const theme = useTheme();
  const background = useTransform(
    x,
    [0, 75],
    ["rgba(255, 255, 255,0)", theme.palette.primary.contrastText]
  );
  const transform = useTransform(
    x,
    [0, 75, 76],
    ["scale(1)", "scale(1.1)", "scale(1.5)"]
  );
  return (
    <StyledSwipeRightContainer style={{ background }}>
      <motion.div style={{ transform }}>
        {finished ? <UnpublishedIcon /> : <CheckCircleIcon />}
      </motion.div>
    </StyledSwipeRightContainer>
  );
};

export default memo(RightShiftContent);
