import { InputLabel as MuiInputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

export const InputLabel = styled(MuiInputLabel)(({ theme }) => ({
  color: theme.palette.primary.contrastText + " !important",
}));
