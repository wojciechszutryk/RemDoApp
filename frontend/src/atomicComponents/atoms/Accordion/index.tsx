import { AccordionDetails, AccordionSummary, Typography, AccordionProps } from "@mui/material";
import { StyledAccordion, StyledExpandMoreIcon } from "./styles";

interface Props extends AccordionProps {
  summaryText: string;
  children: JSX.Element | JSX.Element[];
}

const Accordion = ({ summaryText, children, ...rest }: Props): JSX.Element => {
  return (
    <StyledAccordion {...rest}>
      <AccordionSummary expandIcon={<StyledExpandMoreIcon />}>
        <Typography> {summaryText}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};

export default Accordion;
