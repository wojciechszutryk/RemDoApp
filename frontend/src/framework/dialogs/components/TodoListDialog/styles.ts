import { Autocomplete, Chip, styled } from "@mui/material";

export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: "10px 0",
  [theme.breakpoints.up("sm")]: {
    maxHeight: "70vh",
    overflowX: "hidden",
    overflowY: "auto",
  },
}));

export const StyledInlineInputs = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledAutocompleteChip = styled(Chip)(({ theme }) => ({
  zIndex: 1,
  backgroundColor: theme.palette.secondary.contrastText,
  color: theme.palette.primary.contrastText,
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
