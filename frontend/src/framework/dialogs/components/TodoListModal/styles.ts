import { Autocomplete, styled } from "@mui/material";

export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const StyledAutocomplete = styled(
  Autocomplete<string, true, false, true>
)(({ theme }) => ({
  "& .MuiChip-root": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
  },
}));
