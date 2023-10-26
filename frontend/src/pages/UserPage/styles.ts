import { styled, Typography } from "@mui/material";

export const StyledWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: "700px",
  backgroundColor: theme.palette.background.paper,
  overflowY: "auto",
  padding: 20,
  borderRadius: 10,
  "& > div": {
    width: "100%",
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: 20,
  marginBottom: 20,
}));

export const StyledSingleInputFormWrapper = styled("div")({
  display: "flex",
  gap: 20,
  flexWrap: "wrap",
});
