import { styled } from "@mui/material";

export const StyledContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  overflow: "visible",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: "50px 60px",
  backgroundImage: `url(${process.env.PUBLIC_URL}/images/wave-doodles.png)`,
  borderRadius: "200px 210px 200px 155px",

  "@keyframes borderWave": {
    "0%": {
      borderRadius: "200px 210px 200px 155px",
    },
    "25%": {
      borderRadius: "210px 200px 190px 175px",
    },
    "50%": {
      borderRadius: "220px 190px 200px 195px",
    },
    "75%": {
      borderRadius: "210px 200px 190px 175px",
    },
    "100%": {
      borderRadius: "200px 210px 200px 155px",
    },
  },
  width: "90%",

  [theme.breakpoints.up("sm")]: {
    width: `518px`,
    minHeight: "fit-content",
    animation: "borderWave 5s ease-in-out infinite",
  },
  [theme.breakpoints.up("md")]: {
    // height: "auto",
    width: `573px`,
  },
  [theme.breakpoints.up("lg")]: {
    width: `618px`,
  },
  [theme.breakpoints.up("xl")]: {
    // height: "fit-content",
    width: `750px`,
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
