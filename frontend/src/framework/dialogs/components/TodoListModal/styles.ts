import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, Autocomplete, styled } from "@mui/material";

export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: "transparent",
  boxShadow: "none",
}));

export const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export const StyledAutocomplete = styled(
  Autocomplete<string, true, false, true>
)(({ theme }) => ({
  "& .MuiChip-root": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
  },
}));
