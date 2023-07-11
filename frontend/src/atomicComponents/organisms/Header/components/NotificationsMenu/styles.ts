import { styled } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";

export const StyledDrawerListWrapper = styled("div")(({ theme }) => ({
  width: "90vw",
  [theme.breakpoints.up("sm")]: {
    width: 400,
  },
}));

export const StyledNotificationButton = styled(Button)({
  width: "40px",
  minWidth: "unset",
  height: "40px",
  padding: 0,
  "&:before": {
    border: "none",
  },
});
