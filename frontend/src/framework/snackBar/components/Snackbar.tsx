import {
  Alert,
  Portal,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import UserAvatar from "atomicComponents/organisms/UserAvatar";
import { useSnackbar } from "..";
import { StyledSnackbar } from "./styles";

export const Snackbar = (): JSX.Element => {
  const { setSnackbar, snackbar } = useSnackbar();
  const scrollTrigger = useScrollTrigger();

  const theme = useTheme();
  const greaterThanSm = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClose = () => setSnackbar(undefined);

  return (
    <>
      {!!snackbar && (
        <Portal>
          <StyledSnackbar
            open
            anchorOrigin={{
              vertical: greaterThanSm ? "top" : "bottom",
              horizontal: "right",
            }}
            transformOnScroll={scrollTrigger}
            // autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snackbar.severity || "success"}
              sx={{ width: "100%" }}
              icon={
                snackbar.userData ? (
                  <UserAvatar userData={snackbar.userData} altBackground />
                ) : undefined
              }
            >
              {snackbar.message}
              {snackbar.content}
            </Alert>
          </StyledSnackbar>
        </Portal>
      )}
    </>
  );
};
