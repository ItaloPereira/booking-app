import { createBrowserRouter } from 'react-router-dom';
import { Typography } from '@mui/material';

import RootLayout from '@/layouts/RootLayout';

import HomePage from '@/pages/HomePage';
import PlacePage from '@/pages/PlacePage';
import NotFoundPage from '@/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/my-bookings',
        element: <Typography>My Bookings</Typography>,
      },
      {
        path: '/place/:placeId',
        element: <PlacePage />,
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
]);

export default router;