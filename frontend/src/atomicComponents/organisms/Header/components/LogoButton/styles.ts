import { styled } from "@mui/material";

export const StyledLogoWrapper = styled("div")(({ theme }) => ({
  zIndex: 1,
  cursor: "pointer",
  "& svg path": {
    transition: "0.15s",
    fill: theme.palette.primary.light,
  },
  "&:hover svg path": {
    opacity: 0.9,
  },
}));
