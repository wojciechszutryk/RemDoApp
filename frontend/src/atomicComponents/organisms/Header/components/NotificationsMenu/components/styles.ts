import { List, ListSubheader, styled } from "@mui/material";
import { LinearLoader } from "atomicComponents/atoms/LinearLoader";

export const StyledLoader = styled(LinearLoader)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 3,
  backgroundColor: theme.palette.background.paper,
}));

export const StyledTopPanelWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "curosorPointer",
})<{ cursorPointer?: boolean }>(({ theme, cursorPointer }) => ({
  position: "sticky",
  zIndex: 2,
  top: 4,
  height: 40,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 1rem",
  backgroundColor: theme.palette.background.paper,
  cursor: cursorPointer ? "pointer" : "default",
}));

export const StyledList = styled(List)({
  paddingTop: 0,
});

export const StyledTodoListSubHeader = styled(ListSubheader)(({ theme }) => ({
  position: "sticky",
  zIndex: 1,
  top: 44,
  height: 40,
  display: "flex",
  alignItems: "center",
  padding: "0 1rem",
  backgroundColor: theme.palette.background.paper,
}));
