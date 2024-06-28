import type { SyntheticEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

const CustomSnackbar = () => {
  const { snackbar, closeSnackbar } = useBookingsContext();

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackbar();
  };

  return (
    <div>
      <Snackbar open={snackbar.opened} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomSnackbar;