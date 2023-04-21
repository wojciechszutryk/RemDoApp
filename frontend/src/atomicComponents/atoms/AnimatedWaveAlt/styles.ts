import { Theme } from "@mui/material";

const numOfBlobs = 4;

export const AnimatedWaveAltStyles = (theme: Theme) => ({
  zIndex: 1,
  position: "relative",
  backgroundColor: "transparent",
  outline: "none",
  transition: "color 0.5s",
  "&:before": {
    content: "''",
    zIndex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    border: `2px solid ${theme.palette.primary.contrastText}`,
    borderRadius: "30px",
  },
  "&:after": {
    content: "''",
    zIndex: -2,
    position: "absolute",
    left: "3px",
    top: "3px",
    width: "100%",
    height: "100%",
    transition: "all 0.3s 0.2s",
    borderRadius: "30px",
  },
  "&:hover": {
    color: theme.palette.primary.light,
    "& > div:last-of-type > div > span": {
      transform: "translateZ(0) scale(1.7)",
      "@supports (filter: url('#goo'))": {
        transform: "translateZ(0) scale(1.4)",
      },
    },
    "&:after": {
      transition: "all 0.3s",
      left: 0,
      top: 0,
    },
  },
  "& > div:last-of-type": {
    zIndex: "-1",
    overflow: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    borderRadius: "30px",
    background: theme.palette.primary.light,
    "& > div": {
      position: "relative",
      display: "block",
      height: "100%",
      filter: "url('#goo')",
      "& > span": {
        position: "absolute",
        top: "2px",
        width: `calc(100% / ${numOfBlobs})`,
        height: "100%",
        background: theme.palette.primary.contrastText,
        borderRadius: "100%",
        transform: "translate3d(0,150%,0) scale(1.7)",
        transition: "transform 0.45s",
        "@supports (filter: url('#goo'))": {
          transform: "translate3d(0,150%,0) scale(1.4)",
        },
        "&:nth-of-type(1)": {
          left: `calc((${1} - 1) * (120% / ${numOfBlobs}))`,
          transitionDelay: `calc((${1} - 1) * 0.08s)`,
        },
        "&:nth-of-type(2)": {
          left: `calc((${2} - 1) * (120% / ${numOfBlobs}))`,
          transitionDelay: `calc((${2} - 1) * 0.08s)`,
        },
        "&:nth-of-type(3)": {
          left: `calc((${3} - 1) * (120% / ${numOfBlobs}))`,
          transitionDelay: `calc((${3} - 1) * 0.08s)`,
        },
        "&:nth-of-type(4)": {
          left: `calc((${4} - 1) * (120% / ${numOfBlobs}))`,
          transitionDelay: `calc((${4} - 1) * 0.08s)`,
        },
      },
    },
  },
});
