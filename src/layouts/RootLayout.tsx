import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import TopBar from '@/components/top-bar/TopBar';
import Snackbar from '@/components/snackbar/Snackbar';

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <Box>
      <TopBar />
      <Toolbar />
      <Outlet />
      <Snackbar />
    </Box>
  )
}

export default RootLayout;