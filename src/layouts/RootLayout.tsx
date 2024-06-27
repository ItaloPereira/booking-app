import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import TopBar from '@/components/top-bar/TopBar';

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
    </Box>
  )
}

export default RootLayout;