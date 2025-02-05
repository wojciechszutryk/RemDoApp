import { styled } from "@mui/material";

export const StyledIconsWrapper = styled("div")(({ theme }) => ({
  "& svg": {
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.secondary.contrastText,
    },
  },
  "& .MuiBadge-badge": {
    transform: "scale(0.8) translate(30%, -20%)",
  },
}));
