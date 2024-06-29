import { useState, type FormEvent } from 'react';
import { addDays, differenceInDays, formatISO } from 'date-fns';
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
import type { Booking } from '@/types/booking';

import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

const PlaceCard = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '0 0 8px 8px',
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
    borderRadius: '0 16px 16px 0',
  },
}));

interface BookingFormProps {
  place: Place;
  booking: Booking | null;
}

const BookingForm = ({ place, booking }: BookingFormProps) => {
  const { createBooking, editBooking, bookings, openSnackbar } = useBookingsContext();
  const navigate = useNavigate();

  const [checkinValue, setCheckinValue] = useState<Date | null>(booking ? new Date(booking.checkin) : null);
  const [checkoutValue, setCheckoutValue] = useState<Date | null>(booking ? new Date(booking.checkout) : null);

  const [checkinError, setCheckinError] = useState<DateValidationError | null>(null);
  const [checkoutError, setCheckoutError] = useState<DateValidationError | null>(null);

  const getCheckinMinDate = () => {
    const today = new Date();
    if (checkinError) return addDays(today, 7);
    return addDays(today, 7);
  }

  const getCheckoutMinDate = () => {
    if (!checkinValue) return addDays(getCheckinMinDate(), 1);
    return addDays(checkinValue, 1);
  }

  const checkinIsAlreadyBooked = (date: Date) => {
    const filteredBookings = bookings.filter(stateBooking => stateBooking.id !== booking?.id);

    const isBooked = filteredBookings.some(booking => {
      const bookingCheckin = addDays(new Date(booking.checkin), -1);
      const bookingCheckout = new Date(booking.checkout);
      return date >= bookingCheckin && date <= bookingCheckout;
    });
    return isBooked;
  };

  const checkoutIsAlreadyBooked = (date: Date) => {
    if (!checkinValue) return true;
    const filteredBookings = bookings.filter(stateBooking => stateBooking.id !== booking?.id);

    const isBooked = filteredBookings.some(booking => {
      const bookingCheckin = new Date(booking.checkin);
      if (date >= bookingCheckin && checkinValue <= bookingCheckin) return true;
      return false;
    });

    return isBooked;
  };

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

  const getUniqueId = () => {
    const randomPart = Math.floor(Math.random() * 1e9);
    const timestampPart = Date.now();
    return `${timestampPart}-${randomPart}`;
  }

  const checkButtonAvailability = () => {
    if (!checkinValue || !checkoutValue || !!checkinError || !!checkoutError) return true;

    return false;
  }

  const handleSubmitBooking = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!checkinValue || !checkoutValue) return;
    
    if (booking) {
      editBooking({
        id: booking.id,
        checkin: formatISO(checkinValue),
        checkout: formatISO(checkoutValue),
        placeId: place.id,
      });

      openSnackbar('Your booking has been successfully updated!');
      navigate('/my-bookings');
      return;
    }

    createBooking({
      id: getUniqueId(),
      checkin: formatISO(checkinValue),
      checkout: formatISO(checkoutValue),
      placeId: place.id,
    });

    openSnackbar('Your booking has been successfully completed!');
    navigate('/my-bookings');
  }

  return (
    <PlaceCard>
      <Box component="form" aria-label="Booking Form" onSubmit={handleSubmitBooking}>
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
                shouldDisableDate={checkinIsAlreadyBooked}
                value={checkinValue}
                onChange={(newValue) => { setCheckinValue(newValue), setCheckoutValue(null) }}
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
                disabled={!checkinValue}
                minDate={getCheckoutMinDate()}
                shouldDisableDate={checkoutIsAlreadyBooked}
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
            {booking ? 'Edit Booking' : 'Book now'}
          </Button>

          <Typography color="text.secondary">* Bookings are only accepted 7 days in advance</Typography>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography>${place.nightPrice} USD x {checkoutValue && checkinValue ? differenceInDays(checkoutValue, checkinValue) : 1} night(s)</Typography>
            <Typography fontWeight={600}>${calculateTotalPrice()} USD</Typography>
          </Stack>

        </Stack>
      </Box>
    </PlaceCard>
  );
}

export default BookingForm;