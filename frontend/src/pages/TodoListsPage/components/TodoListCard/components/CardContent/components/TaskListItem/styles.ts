import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

export const StyledTaskListItem = styled(ListItem)(({ theme }) => ({
  flexWrap: "wrap",
  backgroundColor: "transparent",
  color: theme.palette.primary.contrastText,
  userSelect: "none",
  zIndex: 2,
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  flexBasis: "25px",
  marginRight: 15,
  minWidth: "unset",
  color: theme.palette.primary.contrastText,
  "& svg": {
    width: 15,
    height: 15,
  },
}));

export const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "isTaskFinished",
})<{
  isTaskFinished?: boolean;
}>(({ isTaskFinished }) => ({
  flexBasis: "calc(100% - 40px)",
  "& span": {
    fontFamily: "Lato",
    fontSize: "16px",
    textDecoration: isTaskFinished ? "line-through" : "unset",
  },
}));

export const StyledCancelExitTaskText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  cursor: "pointer",
  textDecoration: "underline",
}));

export const StyledDetailsColapse = styled(Collapse)({
  flexBasis: "100%",
});
