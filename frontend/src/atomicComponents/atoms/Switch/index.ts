import { Switch as MuiSwitch, styled } from "@mui/material";

export const Switch = styled(MuiSwitch, {
  shouldForwardProp: (prop) =>
    prop !== "checkedBackgroundImage" && prop !== "uncheckedBackgroundImage",
})<{ checkedBackgroundImage?: string; uncheckedBackgroundImage?: string }>(
  ({ theme, checkedBackgroundImage, uncheckedBackgroundImage }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: checkedBackgroundImage,
        },
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.dark,
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.primary.contrastText,
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: uncheckedBackgroundImage,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.primary.light,
      borderRadius: 20 / 2,
    },
  })
);
