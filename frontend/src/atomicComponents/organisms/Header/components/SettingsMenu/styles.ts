import { FormControlLabel, Menu, MenuItem, styled } from "@mui/material";

export const StyledMenu = styled(Menu)(({ theme }) => ({
  ".MuiPaper-root": {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    backgroundColor: theme.palette.primary.light,
    marginTop: 15,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      marginLeft: -5,
      marginRight: 10,
    },
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)({
  width: "100%",
});

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  "&  svg": {
    fill: theme.palette.primary.contrastText,
  },
}));
