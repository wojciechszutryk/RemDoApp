import { Checkbox as MuiCheckbox, styled } from "@mui/material";

export const Checkbox = styled(MuiCheckbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&.Mui-checked": {
    color: theme.palette.primary.contrastText,
  },
}));
