import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import BookingCard from "@/components/booking-card/BookingCard";
import type { Booking } from "@/types/booking";

import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

interface BookingCardListProps {
  bookings: Booking[];

}

const BookingCardList = ({ bookings }: BookingCardListProps) => {
  const { getPlaceById, deleteBooking, openSnackbar } = useBookingsContext();

  const futureBookings = bookings
    .filter(booking => new Date(booking.checkin) >= new Date())
    .sort((a, b) => new Date(a.checkin).getTime() - new Date(b.checkin).getTime());

  
  const handleDeleteBooking = (bookingId: string) => {
    deleteBooking(bookingId);
    openSnackbar('Booking successfully deleted.');
  }

  return (
    <Stack gap={2} flexGrow={1}>
      {futureBookings.length === 0 && (
        <Stack gap={2}>
          <Typography variant="h5" component="h2">
            No upcoming bookings 😞
          </Typography>
          <Typography variant="body1">
            Start browsing the sea of possibilities among our available places.
          </Typography>
          <Box>
            <Button variant="contained" color="primary" href="/">
              Explore Now!
            </Button>
          </Box>
        </Stack>
      )}

      <Grid container spacing={3}>
        {futureBookings.map((booking) => {
          const place = getPlaceById(booking.placeId);

          if (!place) return null;

          return (
            <Grid key={booking.id} item xs={12}>
              <BookingCard booking={booking} place={place} onDelete={handleDeleteBooking} />
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  );
}

export default BookingCardList;