import { useState, type FormEvent } from 'react';
import { addDays, differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper, { type PaperProps } from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { type DateValidationError } from '@mui/x-date-pickers/models';

import type { Place } from '@/types/place';

import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

const Card = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '0 0 8px 8px',
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
    borderRadius: '0 16px 16px 0',
  },
}));

interface ReservationFormProps {
  place: Place;
}

const ReservationForm = ({ place }: ReservationFormProps) => {
  const { createBooking } = useBookingsContext();
  const navigate = useNavigate();

  const [checkinValue, setCheckinValue] = useState<Date | null>(null);
  const [checkoutValue, setCheckoutValue] = useState<Date | null>(null);

  const [checkinError, setCheckinError] = useState<DateValidationError | null>(null);
  const [checkoutError, setCheckoutError] = useState<DateValidationError | null>(null);

  const getCheckinMinDate = () => {
    const today = new Date();
    if (checkinError) return addDays(today, 7);
    return addDays(today, 7);
  }

  const getCheckinMaxDate = () => {
    if (checkinError) return undefined;
    if (!checkoutValue) return undefined;
    return addDays(checkoutValue, -1);
  }

  const getCheckoutMinDate = () => {
    if (checkoutError) return addDays(getCheckinMinDate(), 1);
    if (!checkinValue) return addDays(getCheckinMinDate(), 1);
    return addDays(checkinValue, 1);
  }

  const calculateTotalPrice = () => {
    if (checkinValue && checkoutValue) {
      const numberOfNights = differenceInDays(checkoutValue, checkinValue);
      return numberOfNights * place.nightPrice;
    }
    return place.nightPrice;
  }

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select a date at least 7 days after today';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }

  const checkButtonAvailability = () => {
    if (!checkinValue || !checkoutValue || !!checkinError || !!checkoutError) return true;

    return false;
  }

  const handleSubmitReservation = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!checkinValue || !checkoutValue) return;

    createBooking({
      checkin: checkinValue,
      checkout: checkoutValue,
    });

    navigate('/my-bookings');
  }

  return (
    <Card>
      <Box component="form" aria-label="Reservation Form" onSubmit={handleSubmitReservation}>
        <Stack gap={2}>
          <Typography variant="h6" component="span" fontWeight={600} sx={{ mt: 'auto' }}>
            ${place.nightPrice} USD <Typography variant="caption">/night</Typography>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="CHECK-IN"
                name="checkin"
                minDate={getCheckinMinDate()}
                maxDate={getCheckinMaxDate()}
                value={checkinValue}
                onChange={(newValue) => {setCheckinValue(newValue), setCheckoutValue(null)}}
                onError={(newError) => setCheckinError(newError)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    InputLabelProps: { shrink: false },
                    helperText: getErrorMessage(checkinError),
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="CHECKOUT"
                name="checkout"
                minDate={getCheckoutMinDate()}
                value={checkoutValue}
                onChange={(newValue) => setCheckoutValue(newValue)}
                onError={(newError) => setCheckoutError(newError)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    InputLabelProps: { shrink: false },
                    helperText: getErrorMessage(checkoutError),
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button variant="contained" type="submit" disabled={checkButtonAvailability()}>
            Book now
          </Button>

          <Typography color="text.secondary">* Reservations are only accepted 7 days in advance</Typography>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography>${place.nightPrice} USD x {checkoutValue && checkinValue ? differenceInDays(checkoutValue, checkinValue) : 1} nights</Typography>
            <Typography fontWeight={600}>${calculateTotalPrice()} USD</Typography>
          </Stack>

        </Stack>
      </Box>
    </Card>
  );
}

export default ReservationForm;