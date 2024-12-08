import { AvatarGroup, Typography, styled } from "@mui/material";

export const StyledHeaderTitle = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  transition: "color 0.15s ease-in-out",
  "&:hover": {
    color: theme.palette.secondary.contrastText,
  },
}));

export const StyledAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  "& .MuiAvatar-root": {
    borderColor: theme.palette.background.paper,
  },
}));

export const CollapseHandlersWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  width: 20,
  "& svg": {
    cursor: "pointer",
    transition: "color 0.15s ease-in-out",
    "&:hover": {
      path: theme.palette.secondary.contrastText,
    },
  },
}));
