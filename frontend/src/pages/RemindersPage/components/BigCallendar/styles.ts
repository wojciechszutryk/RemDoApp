import { styled } from "@mui/material";

export const StyledCallendarWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "contentAnimation",
})<{ contentAnimation?: string }>(({ theme, contentAnimation }) => ({
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  "@keyframes fadeIn1": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  width: "100vw",
  maxHeight: "600px",
  maxWidth: "1000px",
  color: theme.palette.primary.contrastText,
  paddingTop: "80px",
  "& *": {
    borderColor: theme.palette.primary.main + " !important",
  },
  "& .rbc-calendar": {
    position: "relative",
    margin: "0 auto",
    padding: "0 0 15px 0",
    "& .rbc-toolbar": {
      marginLeft: 40,
      marginBottom: 0,
      justifyContent: "space-between",
      "& span:first-of-type": {
        width: "330px",
        alignSelf: "flex-end",
        "& > button": {
          height: "60px",
          verticalAlign: "top",
          border: "none",
          padding: "30px 16px 0px",
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.background.paper,
          transition: "color 0.1s ease-in-out",
          cursor: "pointer",
          "&:first-of-type": {
            borderTopLeftRadius: "25px",
          },
          "&:last-of-type": {
            borderTopRightRadius: "25px",
          },
          "&:hover": {
            color: theme.palette.primary.main,
          },
        },
        "&:before": {
          content: '""',
          display: "inline-block",
          width: 40,
          height: 40,
          background: `radial-gradient(circle 40px at 0px 0px,transparent 40px,${theme.palette.background.paper} 10px)`,
          backgroundRepeat: "no-repeat",
          verticalAlign: "bottom",
        },
        "&:after": {
          content: '""',
          display: "inline-block",
          width: 40,
          height: 40,
          background: `radial-gradient(circle 40px at 40px 0px,transparent 40px,${theme.palette.background.paper} 20px)`,
          backgroundRepeat: "no-repeat",
          verticalAlign: "bottom",
        },
      },
      "& span:nth-of-type(2)": {
        position: "absolute",
        top: "10px",
        left: "200px",
        transform: "translateX(-50%)",
      },
      "& span:nth-of-type(3)": {
        display: "block",
        position: "absolute",
        borderRadius: "50px",
        height: 40,
        top: -60,
        left: 0,
        [theme.breakpoints.up(780)]: {
          left: "unset",
          top: 0,
          right: 0,
        },
        "& > button": {
          height: "40px",
          margin: 10,
          borderRadius: "50px",
          border: "none",
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.background.paper,
          transition: "color 0.1s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    "& .rbc-time-view": {
      overflow: "hidden",
      "& > div": {
        animation: contentAnimation,
      },
      width: "calc(100% - 40px)",
      borderRadius: 20,
      outline: `20px solid ${theme.palette.background.paper}`,
      margin: "20px",
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
