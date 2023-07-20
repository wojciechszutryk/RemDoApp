import { List, ListItem, ListSubheader, styled } from "@mui/material";

export const StyledRemindersList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
  overflow: "auto",
  maxHeight: 300,
  "& ul": { padding: 0 },
  "& > li:nth-child(2) > ul > li:first-child": {
    borderTop: "none",
  },
}));

export const StyledDayListItem = styled("li", {
  shouldForwardProp: (prop) => prop !== "highlighted",
})<{ highlighted?: boolean }>(({ theme, highlighted }) => ({
  border: highlighted ? `1px solid ${theme.palette.primary.contrastText}` : "inherit",
}));

export const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.primary.main}`,
}));

export const StyledRemindersListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  flexWrap: "wrap",
  "& > li > ul > li:first-child": {
    borderTop: "none",
  },
}));
