import { Autocomplete, Chip, styled } from "@mui/material";

export const StyledAutocompleteChip = styled(Chip)(({ theme }) => ({
  zIndex: 1,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.contrastText,
  margin: "0 2px",
}));

export const StyledAutocomplete = styled(
  Autocomplete<string, true, false, true>
)({
  marginBottom: 10,
  "& .MuiFormControl-root": {
    height: "unset",
  },
});
