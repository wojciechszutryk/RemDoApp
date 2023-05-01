import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { StyledAccordion, StyledExpandMoreIcon } from "./styles";

interface Props {
  summaryText: string;
  children: JSX.Element | JSX.Element[];
}

const Accordion = ({ summaryText, children }: Props): JSX.Element => {
  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
        <Typography> {summaryText}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};

export default Accordion;
