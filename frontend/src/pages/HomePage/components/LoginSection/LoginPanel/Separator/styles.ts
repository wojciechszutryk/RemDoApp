import { styled } from "@mui/material";

export const StyledWrapper = styled("div")({
  position: "relative",
  width: "100%",
  marginTop: "30px",
  height: "20px",
});

export const StyledLine = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "0px",
  height: "8px",
  width: "100%",
  borderBottom: `2px solid ${theme.palette.primary.light}`,
}));

export const StyledText = styled("span")(({ theme }) => ({
  position: "absolute",
  paddingLeft: "20px",
  paddingRight: "20px",
  left: "50%",
  top: "35%",
  transform: "translate(-50%, -50%)",
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
}));
