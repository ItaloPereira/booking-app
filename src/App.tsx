import '@fontsource/roboto';
import '@fontsource-variable/dm-sans';

import { RouterProvider } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import CssBaseline from '@mui/material/CssBaseline';

import AppProviders from './AppProviders';
import router from '@/router/router';


function App() {
  return (
    <AppProviders>
      <Helmet>
        <title>Booking App</title>
      </Helmet>

      <CssBaseline />

      <RouterProvider router={router} />
    </AppProviders>
  )
}

export default App
