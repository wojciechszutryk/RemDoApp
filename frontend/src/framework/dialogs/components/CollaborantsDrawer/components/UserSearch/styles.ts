import { List, ListItemText, styled } from "@mui/material";

export const StyledUsersList = styled(List)({
  width: "100%",
  maxWidth: 360,
});

export const StyledListItemText = styled(ListItemText)({
  "& span, & p": {
    overflow: "hidden",
    whiteSpace: "norap",
    textOverflow: "ellipsis",
  },
});
