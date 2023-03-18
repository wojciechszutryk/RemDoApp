import { styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "54px",
  width: "100%",
  backgroundColor: theme.palette.secondary.main,
  boxShadow: `inset 0px 3px 4px ${theme.palette.primary.light}`,
  borderRadius: theme.spacing(3),
  color: theme.palette.secondary.contrastText,
  transition: "border 1s",
  fontFamily: "Fira Sans",
  ":hover": {
    backgroundColor: theme.palette.secondary.light,
    boxShadow: `inset 0px 3px 4px ${theme.palette.primary.main}`,
  },

  // [`&.${textFieldClasses.focused}`]: {
  //   backgroundColor: theme.palette.secondary.light,
  //   boxShadow: `inset 0px 3px 4px ${theme.palette.primary.dark}`,
  // },

  // [`&.${textFieldClasses.disabled}`]: {
  //   opacity: 0.7,
  // },

  // [`&.${textFieldClasses.error}`]: {
  //   border: `1px solid ${theme.palette.error.main}`,
  // },
}));
