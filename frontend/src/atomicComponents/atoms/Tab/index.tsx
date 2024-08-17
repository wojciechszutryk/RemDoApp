import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { TabProps } from "@mui/material";
import { memo } from "react";
import { StyledTab } from "./styles";

interface Props extends TabProps {
  error?: boolean;
}

const Tab = ({ error, ...props }: Props): JSX.Element => {
  return (
    <StyledTab
      disableRipple
      {...props}
      error={error}
      label={
        <div style={{ display: "flex" }}>
          {error && <PriorityHighIcon sx={{ height: 15 }} />}
          {props.label}
        </div>
      }
    ></StyledTab>
  );
};

export default memo(Tab);
