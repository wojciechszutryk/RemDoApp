import { AvatarGroup, Typography, styled } from "@mui/material";

export const StyledHeaderTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "disableHover",
})<{ disableHover?: boolean }>(({ theme, disableHover }) => ({
  cursor: disableHover ? "unset" : "pointer",
  transition: "color 0.15s ease-in-out",
  "&:hover": {
    color: disableHover ? "unset" : theme.palette.primary.main,
  },
}));

export const StyledAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  "& .MuiAvatar-root": {
    borderColor: theme.palette.background.paper,
  },
}));
