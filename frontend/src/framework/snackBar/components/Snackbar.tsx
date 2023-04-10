import {
  Alert,
  Portal,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { useSnackbar } from "..";
import { StyledSnackbar } from "./styles";

export const InfoSnackbar = (): JSX.Element => {
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
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snackbar.severity || "success"}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </StyledSnackbar>
        </Portal>
      )}
    </>
  );
};
