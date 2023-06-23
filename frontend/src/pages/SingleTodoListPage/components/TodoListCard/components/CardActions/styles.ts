import { MenuItem, styled } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";

export const StyledCreateTaskButton = styled(Button)({
  marginRight: "auto",
});

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "& .MuiListItemIcon-root": {
    transition: "color 0.15s ease-in-out",
  },
  "&:hover": {
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
    backgroundColor: "inherit",
  },
}));
