import { ListItem, styled } from "@mui/material";

export const StyledRemindersListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  flexWrap: "wrap",
  "& > li > ul > li:first-child": {
    borderTop: "none",
  },
  "& span, & > svg": {
    transition: "color 0.15s ease-in-out",
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
}));
