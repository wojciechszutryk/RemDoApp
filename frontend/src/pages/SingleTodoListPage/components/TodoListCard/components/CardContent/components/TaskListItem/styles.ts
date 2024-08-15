import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

export const StyledTaskListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "showHighlight",
})<{
  showHighlight?: boolean;
}>(({ showHighlight, theme }) => ({
  boxSizing: "border-box",
  flexWrap: "wrap",
  backgroundColor: "transparent",
  color: theme.palette.primary.contrastText,
  userSelect: "none",
  zIndex: 2,
  transition: "border 0.3s ease",
  padding: "7px 14px",

  ...(showHighlight && {
    border: "1px solid transparent",
    animation: "highlight 5s alternate",
  }),
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
  shouldForwardProp: (prop) => prop !== "isTaskFinished" && prop !== "isLink",
})<{
  isTaskFinished?: boolean;
  isLink?: boolean;
}>(({ isTaskFinished, isLink }) => ({
  wordBreak: "break-word",
  "& span": {
    fontFamily: "Lato",
    fontSize: "16px",
    textDecoration: isTaskFinished ? "line-through" : "unset",
    ...(isLink && {
      width: "max-content",
      cursor: "pointer",
      textDecoration: "underline",
      transition: 'opacity 0.1s',
      "&:hover": {
        opacity: 0.7,
      },
    }),
  },
}));

export const StyledCancelExitTaskText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  cursor: "pointer",
  textDecoration: "underline",
}));

export const StyledDetailsColapse = styled(Collapse)({
  flexBasis: "100%",
});
