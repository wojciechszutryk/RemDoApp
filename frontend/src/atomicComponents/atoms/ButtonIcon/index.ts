import { IconButton as MuiIconButton, styled } from "@mui/material";

export const IconButton = styled(MuiIconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  border: `3px solid ${theme.palette.primary.main}`,
  height: 46,
  width: 46,
}));
