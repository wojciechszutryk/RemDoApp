import { styled, Tab as MuiTab, TabProps } from "@mui/material";

export const Tab = styled((props: TabProps) => (
  <MuiTab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  color: theme.palette.secondary.main,
  fontWeight: 800,
  "&:hover": {
    color: theme.palette.secondary.light
  },
  "&.Mui-selected": {
    color: theme.palette.primary.contrastText,
  },
  "&.Mui-focusVisible": {
    backgroundColor: theme.palette.primary.contrastText,
  },
}));
