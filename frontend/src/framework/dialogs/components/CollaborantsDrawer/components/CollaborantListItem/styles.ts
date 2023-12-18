import { ListItem, styled } from "@mui/material";

export const StyledCollListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "highlighted",
})<{
  highlighted?: boolean;
}>(({ highlighted, theme }) => ({
  cursor: "pointer",
  ...(highlighted && {
    borderRadius: 10,
    boxShadow: `inset 0px 0px 0px 1px ${theme.palette.secondary.contrastText}`,
  }),
}));
