import { ListItem, Popover, styled } from '@mui/material';

export const StyledListItem = styled(ListItem)<{}>(({ theme }) => ({
  width: '100%',
  padding: '0px',
  [theme.breakpoints.up('sm')]: {
    width: '250px',
  },

  // transform translate left 100 px down 30px
}));

// styled popover
export const StyledPopover = styled(Popover)({
  '.css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
    boxShadow: '-1px -1px 15px rgba(0, 0, 0, 0.06), 1px 1px 15px rgba(0, 0, 0, 0.05)',
  },
  // box shdow 0px 0px 0px 0px
  transform: 'translate(-190px, 8px)',
});

export const StyledAreaWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'center',
  borderLeft: '1px solid #d9d9db',
  color: '#47474A',
  paddingRight: '14px',
  paddingLeft: '14px',

  // svg width 12
  '& svg': {
    width: '20px',
    color: '#47474A',
  },

  // TODO update color from theme
});
