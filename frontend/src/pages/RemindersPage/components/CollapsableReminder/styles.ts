import { ListItem, styled } from "@mui/material";

export const StyledRemindersListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  flexWrap: "wrap",
  "& > li > ul > li:first-child": {
    borderTop: "none",
  },
}));
