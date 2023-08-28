import { styled, Typography } from "@mui/material";

export const StyledMarkedText = styled(Typography)(({ theme }) => ({
  '& > mark':{
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
  }
}));
