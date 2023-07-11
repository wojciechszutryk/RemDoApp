import Select, { selectClasses } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

export const StyledWrapper = styled("div")({
  minWidth: "100px",
  width: "100%",
  "& .MuiSelect-select:focus, &.Mui-focused": {
    backgroundColor: "transparent",
  },
  "& svg": {
    transition: "transform .15s",
    right: 8,
    top: "calc(50% - 12px)",
    "&.MuiSelect-iconOpen": {
      top: "calc(50% - 10px)",
    },
  },
});

export const StyledSelect = styled(Select)(({ theme }) => ({
  height: 52,
  paddingLeft: 0,
  paddingTop: 0,
  paddingBottom: 0,
  lineHeight: "54px",
  color: theme.palette.primary.contrastText,
  border: `2px solid ${theme.palette.primary.contrastText}`,
  borderRadius: theme.spacing(3),
  transition: "all .15s",

  [`&.${selectClasses.select}`]: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  [`&.Mui-focused:has(.${selectClasses.select}[aria-expanded="true"])`]: {
    backgroundColor: `transparent !important`,
    border: "none",
  },
  [`& > .${selectClasses.select}`]: {
    paddingLeft: 16,
    paddingBottom: 0,
    paddingTop: 0,
  },
}));
