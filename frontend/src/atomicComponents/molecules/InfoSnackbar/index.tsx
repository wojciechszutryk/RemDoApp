import { Alert, Portal, useMediaQuery, useScrollTrigger, useTheme } from '@mui/material';
import { useInterface } from 'shared/states/useInterface';
import { StyledSnackbar } from './styles';

export const InfoSnackbar = (): JSX.Element => {
  const { interfaceState, interfaceActions } = useInterface();
  const scrollTrigger = useScrollTrigger();

  const theme = useTheme();
  const greaterThanSm = useMediaQuery(theme.breakpoints.up('sm'));

  const handleClose = () => interfaceActions.updateInfoSnackbar({ visible: false });

  return (
    <>
      {interfaceState.infoSnackbar.visible && (
        <Portal>
          <StyledSnackbar
            open={interfaceState.infoSnackbar.visible}
            anchorOrigin={{ vertical: greaterThanSm ? 'top' : 'bottom', horizontal: 'right' }}
            transformOnScroll={scrollTrigger}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={interfaceState.infoSnackbar.severity || 'success'}
              sx={{ width: '100%' }}
            >
              {interfaceState.infoSnackbar.message}
            </Alert>
          </StyledSnackbar>
        </Portal>
      )}
    </>
  );
};
