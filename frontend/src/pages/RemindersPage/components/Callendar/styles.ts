import { styled } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const StyledDateCalendar = styled(DateCalendar<dayjs.Dayjs>)(
  ({ theme }) => ({
    width: "100vw",
    maxWidth: "700px",
    overflow: "visible",
    "& div.MuiPickersCalendarHeader-root": {
      marginBottom: "20px",
      borderRadius: "20px",
      paddingLeft: "10px",
      "& > div.MuiPickersCalendarHeader-labelContainer": {
        padding: "0 10px",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "20px",
        color: theme.palette.primary.contrastText,
        "& svg": {
          color: theme.palette.primary.contrastText,
        },
      },
      "& div.MuiPickersArrowSwitcher-root": {
        "& button": {
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        },
        "& > div": {
          width: 50,
        },
      },
    },
    "& div.MuiDateCalendar-viewTransitionContainer": {
      padding: "40px",
      borderRadius: "50px 50px 150px 50px",
      backgroundColor: theme.palette.background.paper,
    },
    "& div.MuiDayCalendar-slideTransition": {
      minHeight: "320px",
    },
    "& div.MuiDayCalendar-header": {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "20px",
      "& > span.MuiDayCalendar-weekDayLabel": {
        justifyContent: "flex-start",
        paddingLeft: "5px",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
      },
    },
    "& div.MuiDayCalendar-weekContainer": {
      "& > span": {
        flexGrow: 1,
      },
    },
    "& .MuiYearCalendar-root": {
      width: "100%",
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      "& > div": {
        flexBasis: "33.33%",
        color: theme.palette.primary.contrastText,
        "& button.Mui-selected": {
          backgroundColor: theme.palette.primary.light,
        },
        [theme.breakpoints.up("md")]: {
          flexBasis: "25%",
        },
        [theme.breakpoints.up("lg")]: {
          flexBasis: "20%",
        },
      },
    },
  })
);

export const StyledPickersDay = styled(PickersDay<dayjs.Dayjs>)(
  ({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 50,
    width: "100%",
    borderRadius: "0px",
    willChange: "unset",
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: theme.palette.background.paper + " !important",
      borderColor: theme.palette.primary.contrastText,
    },
    "&.MuiPickersDay-today, &.MuiPickersDay-today:hover": {
      borderTop: "none",
      borderLeft: "none",
      //   borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
      "&+div > div > div > svg, &+div > div": {
        color: theme.palette.primary.contrastText,
      },
      borderRadius: "5px",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.primary.contrastText,
      //   borderRightColor: theme.palette.primary.main,
      //   borderBottomColor: theme.palette.primary.main,
      //   borderTopColor: "transparent",
      //   borderLeftColor: "transparent",
      borderBottomRightRadius: "20px",
    },
    "& > div > div": {
      width: 20,
      height: 20,
      display: "flex",
      justifyContent: "center",
      "& > svg": {
        color: theme.palette.primary.main,
        transform: "scale(0.8)",
      },
    },
  })
);

export const StyledDay = styled("span")({
  width: 17,
  height: 17,
  marginTop: 5,
});

export const StyledMoreTasksIcon = styled("div")(({ theme }) => ({
  lineHeight: "17px",
  padding: "0 2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.7rem",
  borderRadius: "50%",
  color: theme.palette.primary.contrastText,
  border: `1px solid ${theme.palette.primary.main}`,
  cursor: "default",
}));
