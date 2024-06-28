import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/RootLayout';

import HomePage from '@/pages/HomePage';
import PlacePage from '@/pages/PlacePage';
import NotFoundPage from '@/pages/NotFoundPage';
import MyBookingsPage from '@/pages/MyBookingsPage';

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
        element: <MyBookingsPage />,
      },
      {
        path: '/place/:placeId',
        element: <PlacePage />,
      },
      {
        path: '/booking/:bookingId',
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