import { styled } from "@mui/material";
import Accordion from "atomicComponents/atoms/Accordion";

export const StyledCopyArea = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 46,
  "& > div": {
    flex: 1,
    display: "flex",
    padding: "3px 15px 3px 5px",
    marginRight: 5,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "20px",
    color: theme.palette.background.default,
    "& > button:first-of-type": {
      "& > svg": {
        color: theme.palette.background.paper,
      },
      padding: "3px",
      height: 44,
    },
    "& > textarea": {
      flex: 1,
      resize: "none",
      lineHeight: 1.4,
      padding: 3,
      border: "none",
      outline: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
    },
  },
}));

export const StyledShareAccordion = styled(Accordion)({
  "& .MuiAccordionDetails-root": {
    padding: "5px 10px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  "&.Mui-expanded": {
    margin: "0 !important",
  },
  "& .MuiAccordionSummary-root.Mui-expanded": {
    minHeight: "unset",
  },
});
