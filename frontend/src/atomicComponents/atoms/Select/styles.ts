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
  marginTop: "30px",
  paddingLeft: 0,
  paddingTop: 0,
  paddingBottom: 0,
  lineHeight: "54px",
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  boxShadow: `inset 0px 3px 4px ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(3),

  [`&.${selectClasses.select}`]: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  "&:hover, &.MuiFilledInput-root:hover": {
    boxShadow: `inset 0px 3px 4px ${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.secondary.light,
  },
  [`&.Mui-focused:has(.${selectClasses.select}[aria-expanded="true"])`]: {
    backgroundColor: `${theme.palette.secondary.light} !important`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  [`& > .${selectClasses.select}`]: {
    paddingLeft: 16,
    paddingBottom: 0,
    paddingTop: 0,
  },
}));
