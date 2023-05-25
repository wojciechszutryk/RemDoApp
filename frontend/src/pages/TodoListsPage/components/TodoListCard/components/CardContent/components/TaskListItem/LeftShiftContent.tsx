import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion, MotionValue, useTransform } from "framer-motion";
import { memo } from "react";
import { StyledSwipeLeftContainer } from "./styles";

interface Props {
  x: MotionValue<number>;
  finished?: boolean;
}

const LeftShiftContent = ({ finished, x }: Props): JSX.Element => {
  const opacity = useTransform(x, [-75, 0], [1, 0]);
  const transform = useTransform(
    x,
    [-76, -75, 0],
    ["scale(1.5)", "scale(1.1)", "scale(1)"]
  );
  return (
    <StyledSwipeLeftContainer>
      <motion.div style={{ transform, zIndex: 1, opacity }}>
        {finished ? <DeleteIcon /> : <EditIcon />}
      </motion.div>
    </StyledSwipeLeftContainer>
  );
};

export default memo(LeftShiftContent);
