import { styled } from "@mui/material";

export const StyledCallendarWrapper = styled("div")(({ theme }) => ({
  width: "100vw",
  maxHeight: "400px",
  maxWidth: "1000px",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.background.paper,
  "& *": {
    borderColor: theme.palette.primary.main + ' !important',
  },
  "& > div": {
    margin: "0 0 0 15px",
    borderRadius: "20px",
    paddingLeft: "10px",
    "& > div.MuiPickersCalendarHeader-labelContainer": {
      order: 1,
      marginRight: "0px",
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
  "& .rbc-time-view": {
    borderColor: theme.palette.primary.main,
  },
}));
