import { Tabs, styled } from "@mui/material";
import { StyledTab as AtomicTab } from "atomicComponents/atoms/Tab/styles";

export const StyledTab = styled(AtomicTab)(({ theme }) => ({
  padding: "5px",
  minHeight: "unset",
  flexDirection: "row",
  flexWrap: "wrap",
  color: theme.palette.primary.contrastText,
  "& svg": {
    color: theme.palette.primary.contrastText,
  },
  "& > .MuiTab-iconWrapper": {
    marginBottom: 0,
    marginRight: "5px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  "&.Mui-selected": {
    color: theme.palette.background.paper,
    "& svg": {
      color: theme.palette.background.paper,
    },
  },
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: "unset",
  display: "flex",
  // backgroundColor: theme.palette.background.paper,
  "& > .MuiTabs-fixed": {
    display: "flex",
  },
  "& .MuiTabs-flexContainer": {
    justifyContent: "space-evenly",
    gap: "10px",
    width: "100%",
  },
  "& .MuiTabs-indicator": {
    order: -1,
    background: theme.palette.primary.contrastText,
    borderRadius: "10px",
    zIndex: -1,
    height: "30px",
    transform: "translateY(-1px)",
  },
}));
