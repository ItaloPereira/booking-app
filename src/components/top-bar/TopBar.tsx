import { useLocation } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

import AppBar, { type AppBarProps } from '@mui/material/AppBar';
import Stack, { type StackProps } from '@mui/material/Stack';
import Link, { LinkProps } from '@mui/material/Link';
import Container from '@mui/material/Container';

import UserAvatar from '@/components/user-avatar/UserAvatar';

const CustomAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: 'black'
}));

const LogoContainer = styled(Stack)<StackProps>(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',

  [theme.breakpoints.up('md')]: {
    position: 'relative',
    transform: 'none',
    left: 0,
  },
}));

const Logo = styled(Link)<LinkProps>(({ theme }) => ({
  fontFamily: `'DM Sans Variable', sans-serif`,
  fontSize: '1.25rem',
  fontWeight: 700,
  color: theme.palette.secondary.main,

  '&:hover': {
    textDecoration: 'none',
  },

  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
}));

const TopBarInner = styled(Stack)<StackProps>(() => ({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));


const TopBar = () => {
  const { pathname } = useLocation();

  return (
    <CustomAppBar position="fixed">
      <Container>
        <Toolbar disableGutters sx={{ gap: 3 }}>
          <TopBarInner>
            {pathname !== '/' && (
              <Link href="/" color="inherit" display={{ xs: 'block', md: 'none' }}>Home</Link>
            )}
            <LogoContainer>
              <Logo href="/">
                Booking App
              </Logo>
            </LogoContainer>
            {pathname !== '/' && (
              <Link href="/" color="inherit" display={{ xs: 'none', md: 'block' }}>Home</Link>
            )}
          </TopBarInner>
          <UserAvatar />
        </Toolbar>
      </Container>

    </CustomAppBar>
  )
}

export default TopBar;