import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource-variable/dm-sans';

import { RouterProvider } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import AppProviders from './AppProviders';
import router from '@/router/router';


function App() {
  return (
    <AppProviders>
      <Helmet>
        <title>Booking App</title>
      </Helmet>
      <GlobalStyles styles={{ 'html': { fontStyle: 'normal' } }} />
      <CssBaseline />

      <RouterProvider router={router} />
    </AppProviders>
  )
}

export default App
