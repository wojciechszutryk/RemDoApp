import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";
import { memo } from "react";
import { StyledTooltip } from "./styles";

const Tooltip = ({ children, ...props }: TooltipProps): JSX.Element => {
  return (
    <MuiTooltip
      {...props}
      slots={{ tooltip: StyledTooltip }}
      slotProps={{ popper: { ...props.PopperProps } }}
    >
      <div>{children}</div>
    </MuiTooltip>
  );
};

export default memo(Tooltip);
