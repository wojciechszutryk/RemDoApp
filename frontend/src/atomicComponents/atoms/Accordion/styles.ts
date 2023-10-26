import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, styled } from "@mui/material";

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: "transparent",
  backgroundImage: "none",
  boxShadow: "none",
}));

export const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));
