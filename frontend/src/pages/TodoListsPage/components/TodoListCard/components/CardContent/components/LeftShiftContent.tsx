import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material";
import { motion, MotionValue, useTransform } from "framer-motion";
import { memo } from "react";
import { StyledSwipeLeftContainer } from "../styles";

interface Props {
  x: MotionValue<number>;
  finished?: boolean;
}

const LeftShiftContent = ({ finished, x }: Props): JSX.Element => {
  const theme = useTheme();
  const background = useTransform(
    x,
    [-75, 0],
    [theme.palette.primary.contrastText, "rgba(255, 255, 255,0)"]
  );
  const transform = useTransform(
    x,
    [-76, -75, 0],
    ["scale(1.5)", "scale(1.1)", "scale(1)"]
  );
  return (
    <StyledSwipeLeftContainer style={{ background }}>
      <motion.div style={{ transform }}>
        {finished ? <DeleteIcon /> : <EditIcon />}
      </motion.div>
    </StyledSwipeLeftContainer>
  );
};

export default memo(LeftShiftContent);
