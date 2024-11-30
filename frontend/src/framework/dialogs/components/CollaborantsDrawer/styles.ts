import { Drawer, ListItemText, styled } from "@mui/material";

export const StyledDrawer = styled(Drawer)({ padding: 10 });

export const StyledTabsWrapper = styled("div")(({ theme }) => ({
  width: "300px",

  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  borderBottom: 1,
  borderColor: theme.palette.secondary.contrastText,
}));

export const StyledCollaborantListItemText = styled(ListItemText)(
  ({ theme }) => ({
    borderBottom: 1,
    borderColor: "divider",
    "& span": {
      width: "158px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      [theme.breakpoints.up("sm")]: {
        width: "308px",
      },
    },
  })
);
