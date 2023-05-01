import { Avatar as MuiAvatar, styled } from "@mui/material";

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));
