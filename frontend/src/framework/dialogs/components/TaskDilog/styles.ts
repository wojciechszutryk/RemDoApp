import { styled } from "@mui/material";

export const StyledNotifyInputsWrapper = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "40px",
  "& > div": { flexBasis: "calc(32% - 9px)" },
  "& > div:last-of-type": { flexBasis: "100%", marginTop: "1rem" },
});

export const StyledCheckboxesWrapper = styled("div")({
  display: "flex",
});
