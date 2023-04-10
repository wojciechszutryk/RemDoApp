import { Snackbar, styled } from '@mui/material';

export const StyledSnackbar = styled(Snackbar, {
  shouldForwardProp: (prop) => prop !== 'transformOnScroll',
})<{ transformOnScroll: boolean }>(({ theme, transformOnScroll }) => ({
  zIndex: 2500,
  '&.MuiSnackbar-root': {
    [theme.breakpoints.up('sm')]: {
      top: 100,
      transform: transformOnScroll ? 'translateY(-80px)' : 'none',
      transition: '0.3s transform',
    },
  },
}));
