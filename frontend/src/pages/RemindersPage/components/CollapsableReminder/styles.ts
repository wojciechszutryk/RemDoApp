import { ListItem, styled } from "@mui/material";

export const StyledRemindersListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  flexWrap: "wrap",
  "& > li > ul > li:first-child": {
    borderTop: "none",
  },
}));
