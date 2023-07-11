import { styled } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const StyledDateCalendar = styled(DateCalendar<dayjs.Dayjs>)(
  ({ theme }) => ({
    width: "100vw",
    maxHeight: "400px",
    maxWidth: "1000px",
    overflow: "visible",
    "& div.MuiPickersCalendarHeader-root": {
      margin: "0 0 0 15px",
      borderRadius: "20px",
      paddingLeft: "10px",
      "& > div.MuiPickersCalendarHeader-labelContainer": {
        order: 1,
        marginRight: "0px",
        color: theme.palette.primary.contrastText,
        "& > div, & > button": {
          height: "40px",
          backgroundColor: theme.palette.background.paper,
        },
        "& > div": {
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
          width: 150,
        },
        "& > button": {
          borderRadius: "0%",
          borderTopRightRadius: "25px",
        },
        "& svg": {
          color: theme.palette.primary.contrastText,
        },

        "&:after": {
          content: '""',
          alignSelf: "flex-end",
          width: 20,
          height: 20,
          background: `radial-gradient(circle 20px at 20px -4px,transparent 20px,${theme.palette.background.paper} 10px)`,
          backgroundRepeat: "no-repeat",
        },
      },
      "& div.MuiPickersArrowSwitcher-root": {
        opacity: "1 !important",
        visibility: "visible !important",
        order: 0,
        "& button": {
          backgroundColor: theme.palette.background.paper,
          borderRadius: "0%",
          "& svg": {
            color: theme.palette.primary.contrastText,
          },
          "&:hover svg": {
            color: theme.palette.primary.main,
          },
          "&:first-of-type": {
            borderTopLeftRadius: "30px",
          },
        },

        "&:before": {
          content: '""',
          alignSelf: "flex-end",
          width: 20,
          height: 15,
          background: `radial-gradient(circle 35px at -10px -17px,transparent 35px,${theme.palette.background.paper} 10px)`,
          backgroundRepeat: "no-repeat",
        },
      },
    },
    "& div.MuiDateCalendar-viewTransitionContainer": {
      padding: "20px 0px 0px",
      borderRadius: "20px",
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.up("sm")]: {
        padding: "20px 40px 0px",
        borderRadius: "50px 50px 150px 50px",
      },
    },
    "& div.MuiDayCalendar-slideTransition": {
      height: "320px",
    },
    "& div.MuiDayCalendar-header": {
      width: "100%",
      height: 20,
      backgroundColor: theme.palette.background.paper,
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
      marginBottom: "20px",
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
      backgroundColor: theme.palette.primary.light,
      "&+div > div > div > svg, &+div > div": {
        color: theme.palette.primary.contrastText,
      },
      borderRadius: "5px",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.primary.contrastText,
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
