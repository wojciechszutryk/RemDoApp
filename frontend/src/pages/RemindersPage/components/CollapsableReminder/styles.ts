import { ListItem, styled } from "@mui/material";

export const StyledRemindersListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "highlight",
})<{ highlight?: boolean }>(({ theme, highlight }) => ({
  color: theme.palette.primary.contrastText,
  flexWrap: "wrap",
  ...(highlight && {
    "& > div > span": {
      color: theme.palette.secondary.contrastText,
      fontWeight: 900,
    },
  }),
  "& > li > ul > li:first-child": {
    borderTop: "none",
  },
  "& > div > span, & > svg": {
    transition: "color 0.15s ease-in-out",
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  },
}));
