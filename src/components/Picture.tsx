import { styled } from '@mui/material/styles';

const Picture = styled('picture')(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',

  'img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    aspectRatio: '1 / 1',
    borderRadius: '8px 8px 0 0',

    [theme.breakpoints.up('md')]: {
      borderRadius: '16px 0 0 16px',
    },
  }
}));

export default Picture;
