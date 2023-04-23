import { FormControlLabel, Menu, styled } from "@mui/material";

export const MenuPaperStyles = {};

export const StyledMenu = styled(Menu)(({ theme }) => ({
  ".MuiPaper-root": {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
