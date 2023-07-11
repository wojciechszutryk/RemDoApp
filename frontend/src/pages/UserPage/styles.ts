import { Typography, styled } from "@mui/material";

export const StyledWrapper = styled("div")({
  width: "100%",
  maxWidth: "700px",
  "& > div": {
    width: "100%",
  },
});

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
