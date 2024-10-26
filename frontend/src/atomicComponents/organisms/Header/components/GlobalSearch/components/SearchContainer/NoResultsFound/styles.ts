import { styled } from '@mui/material';

export const StyledWrapper = styled('div')(() => ({

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  // first child
  '& div ': {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  
    marginLeft: '16px',
    marginRight: '16px',
  
    maxWidth: '550px',
    gap: 8,
  },
  '& div > *:first-of-type': {
    marginTop: 24,
    marginBottom: 8,
  },

  // span
  '& > div > span': {
  textAlign: 'center',
  },
}));

export const StyledImage = styled('img')(() => ({
  display: 'block',
  width: '231.75px',
  height: '158.82px',
}));

export const StyledButton = styled('div')(({ theme }) => ({
  marginTop: 20,
  [theme.breakpoints.up('sm')]: {
    flexGrow: 3,
    order: 1,
  },
}));
