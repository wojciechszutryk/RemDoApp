import { styled } from "@mui/material";

export const StyledWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  width: "100%",
  minHeight: "50px",
  borderRadius: "8px",
  padding: "0 16px 8px 0",
  opacity: 1,
  cursor: "pointer",
  transition: "opacity 0.2s",
  "&:hover": {
    opacity: 0.8,
  },
});
