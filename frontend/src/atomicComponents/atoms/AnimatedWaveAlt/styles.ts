import { Theme } from "@mui/material";

export const AnimatedWaveAltStyles = (
  theme: Theme,
  noBorder?: boolean,
  disabled?: boolean,
  constantAnimation?: boolean
) => ({
  zIndex: 1,
  position: "relative",
  backgroundColor: "transparent",
  outline: "none",
  transition: "color 0.5s",
  "&:before": {
    display: noBorder ? "none" : "inherit",
    content: "''",
    zIndex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    border: `2px solid ${theme.palette.primary.contrastText}`,
    borderRadius: "30px",
    transition: "border 0.2s",
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
  ...(constantAnimation && {
    animation: "constantWaveColor 6s infinite",
    "& > div:last-of-type > div": {
      transitionDelay: "0.45s",
      "& > span": {
        transform: "translateY(0) scale(1.6)",
        animation: "constantWave 3s infinite alternate both",
      },

      "& > span:nth-of-type(2)": {
        animationDelay: "0.08s",
      },
      "& > span:nth-of-type(3)": {
        animationDelay: "0.16s",
      },
      "& > span:nth-of-type(4)": {
        animationDelay: "0.24s",
      },
    },
    "&:after": {
      transition: "all 0.3s",
      left: 0,
      top: 0,
    },
  }),

  ...(!disabled &&
    !constantAnimation && {
      "&:hover": {
        color: theme.palette.primary.light,
        "& > div:last-of-type > div": {
          transitionDelay: "0.45s",
          borderRadius: "30px",
          backgroundColor: theme.palette.secondary.contrastText,
          "& > span": {
            transform: "translateZ(0) scale(1.7)",
            "@supports (filter: url('#goo'))": {
              transform: "translateZ(0) scale(1.4)",
            },
          },
        },
        "&:after": {
          transition: "all 0.3s",
          left: 0,
          top: 0,
        },
      },
    }),
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
      transition: "background-color 0.03s ease-in",
      "& > span": {
        position: "absolute",
        top: "2px",
        // width: `calc(100% / ${numOfBlobs})`,
        width: "25%",
        height: "100%",
        background: theme.palette.secondary.contrastText,
        borderRadius: "100%",
        transform: "translate3d(0,150%,0) scale(1.7)",
        transition: "transform 0.45s",
        "@supports (filter: url('#goo'))": {
          transform: "translate3d(0,150%,0) scale(1.4)",
        },
        "&:nth-of-type(1)": {
          left: 0,
        },
        "&:nth-of-type(2)": {
          // left: `calc((${2} - 1) * (120% / ${numOfBlobs}))`,
          // transitionDelay: `calc((${2} - 1) * 0.08s)`,
          left: "25%",
          transitionDelay: `0.08s`,
        },
        "&:nth-of-type(3)": {
          left: "50%",
          transitionDelay: "0.16s",
        },
        "&:nth-of-type(4)": {
          left: "75%",
          transitionDelay: `0.24s`,
        },
      },
    },
  },
});
