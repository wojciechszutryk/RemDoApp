import {
  Avatar,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";

export const MenuPaperStyles = {};

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

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  border: `3px solid ${theme.palette.primary.main}`,
  height: 46,
  width: 46,
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  "&  svg": {
    fill: theme.palette.primary.contrastText,
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));
