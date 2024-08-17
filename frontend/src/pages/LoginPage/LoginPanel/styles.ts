import { styled } from "@mui/material";

export const StyledContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  overflow: "visible",
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.contrastText,
  padding: "50px 60px",
  backgroundImage: `url(${process.env.PUBLIC_URL}/images/wave-doodles.png)`,
  borderRadius: "200px 210px 200px 155px",
  width: "90%",

  [theme.breakpoints.up("sm")]: {
    width: `518px`,
    minHeight: "fit-content",
    animation: "borderWave 5s ease-in-out infinite",
  },
}));

export const StyledOuterWave = styled(StyledContentWrapper)({
  transform: "scale(1.05)",
  opacity: 0.5,
  position: "absolute",
  animationDelay: "1.5s !important",
  height: "100%",
  zIndex: -1,
});

export const StyledWrapper = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "20px",
  marginTop: "16px",
  color: theme.palette.primary.main,
}));

export const StyledGruppedButtons = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100%",
  gap: "20px",
  "& button": {
    flex: 1,
  },
});

export const StyledForgetPassBtn = styled("button")(({ theme }) => ({
  background: "transparent",
  border: "none",
  color: theme.palette.secondary.contrastText,
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    textDecoration: "underline",
  },
}));
