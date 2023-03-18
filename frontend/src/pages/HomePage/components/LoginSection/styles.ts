import { styled } from "@mui/material";

export const StyledLoginSection = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
  gap: "20px",
  padding: "128px 16px 60px 16px",

  [theme.breakpoints.up("sm")]: {
    padding: "128px 121px 60px 121px",
  },

  [theme.breakpoints.up("md")]: {
    padding: "128px 190px 60px 190px",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "100px",
  },

  [theme.breakpoints.up("lg")]: {
    padding: "180px 190px 60px 190px",
    gap: "200px",
  },
}));
