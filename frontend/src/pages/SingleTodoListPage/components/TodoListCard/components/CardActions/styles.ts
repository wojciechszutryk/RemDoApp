import { MenuItem, styled } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";

export const StyledCreateTaskButton = styled(Button)(({ theme }) => ({
  marginRight: "auto",
  "& > span": {
    borderRight: `2px solid ${theme.palette.divider}`,
    "& > svg": {
      transition: "0.2s",
    },
    "&:hover": {
      "& > svg": {
        color: theme.palette.primary.main,
      },
    },
  },
}));

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
