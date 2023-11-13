import { styled } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";

export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
export const StyledSubmitButton = styled(Button)({ marginTop: 10 });
