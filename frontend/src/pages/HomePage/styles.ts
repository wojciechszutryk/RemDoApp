import { styled } from "@mui/material";

export const StyledFeaturesSection = styled("section")(({ theme }) => ({
  "& > h2": {
    color: theme.palette.primary.contrastText,
    fontSize: "2.5rem",
    marginBottom: 20,
    textAlign: "center",
  },
  "& > ul": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    "& li": {
      height: "100%",
      alignItems: "center",
      "& > p": {
        color: theme.palette.secondary.main,
        marginTop: 15,
        maxWidth: "400px",
        lineHeight: 1.5,
        "& > span": {
          color: theme.palette.primary.contrastText,
          textDecoration: "underline",
          cursor: "pointer",
          transition: "color 0.15s ease",
          "&:hover": {
            color: theme.palette.primary.main,
          },
        },
      },
      "& > div > svg": {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "50%",
        width: 100,
        "& path": {
          fill: theme.palette.primary.contrastText,
        },
      },
      "&:nth-of-type(2n)": {
        "& > p": {
          textAlign: "right",
        },
        "& > div > svg": {
          float: "right",
          marginLeft: 10,
          animation: "fadeInRight 0.5s ease",
        },
      },
      "&:nth-of-type(2n+1)": {
        "& > div > svg": {
          float: "left",
          marginRight: 10,
          animation: "fadeInLeft 0.5s ease",
        },
      },
    },
  },
}));

export const StyledHomePageWrapper = styled("div")(({ theme }) => ({
  overflowX: "hidden",
  scrollSnapType: "y mandatory",
  width: "100%",
  overflowY: "scroll",
  "& > section": {
    minHeight: "calc(100vh - 50px)",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    padding: "50px 20px",
    [theme.breakpoints.up("md")]: {
      padding: "50px 100px",
    },
    "@media(min-height: 900px)": {
      paddingTop: 200,
      minHeight: "calc(100vh - 250px)",
    },
  },
}));

export const StyledDetaildeSection = styled("section")(({ theme }) => ({
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  color: theme.palette.primary.contrastText,
  "& > h3": {
    fontSize: "2rem",
    marginBottom: 20,
    flexBasis: "100%",
  },
  "& > div:nth-of-type(2)": {
    width: "100%",
    maxWidth: 1000,
  },
  "& > div > svg": {
    width: 300,
    border: `2px solid ${theme.palette.primary.contrastText}`,
    borderRadius: "50%",
    "& path": {
      fill: theme.palette.primary.main,
    },
  },
  "& > p": {
    lineHeight: 1.5,
    maxWidth: 1000,
  },
}));
