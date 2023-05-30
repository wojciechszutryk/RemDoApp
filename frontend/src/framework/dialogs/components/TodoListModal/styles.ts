import { Autocomplete, Chip, styled, Typography } from "@mui/material";

export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  [theme.breakpoints.up("sm")]: {
    maxHeight: "70vh",
    overflowX: "hidden",
    overflowY: "scroll",
  },
}));

export const StyledAutocompleteLabel = styled(Typography)({
  marginBottom: 10,
});

export const StyledInlineInputs = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

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
