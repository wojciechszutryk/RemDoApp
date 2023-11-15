import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { AccordionDetails, AccordionSummary, Tooltip } from "@mui/material";
import { StyledAccordion } from "atomicComponents/atoms/Accordion/styles";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import TodoListSelect from "../TodoListSelect";

interface Props {
  expandedAccordion: string;
  handleAccordionChange: (panel: string) => () => void;
}

const ScopesChoose = ({
  expandedAccordion,
  handleAccordionChange,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <StyledAccordion
      expanded={expandedAccordion === "scope"}
      onChange={handleAccordionChange("scope")}
      disableGutters
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Tooltip title={t(TranslationKeys.ScopeDescription)}>
          <div>
            <WidgetsIcon sx={{ transform: "translate(-5px, -3px)" }} />
          </div>
        </Tooltip>
        {t(TranslationKeys.ScopeChoose)}
      </AccordionSummary>
      <AccordionDetails>
        <TodoListSelect />
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default memo(ScopesChoose);
