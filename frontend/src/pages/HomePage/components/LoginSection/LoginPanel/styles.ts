import { styled } from "@mui/material";

export const StyledWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow:
    "-1px -1px 15px rgba(0, 0, 0, 0.05), 1px 1px 15px rgba(0, 0, 0, 0.05)",
  borderRadius: "16px",
  background: theme.palette.primary.main,
  width: "100%",
  maxWidth: 524,
  padding: "30px 5% 10px 5%",
  [theme.breakpoints.up("sm")]: {
    boxSizing: "border-box",
    padding: "45px 55px 60px 55px",
  },
}));

export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "20px",
  marginTop: "16px",
  color: theme.palette.primary.main,
}));
