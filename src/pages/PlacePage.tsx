import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import PageHeader from '@/components/page-header/PageHeader';
import BookingForm from '@/components/booking-form/BookingForm';
import Picture from '@/components/Picture';

import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

const PlacePage = () => {
  const { placeId, bookingId } = useParams();
  const { getPlaceById, getBookingById } = useBookingsContext();
  let place;
  let booking = null;

  if (!placeId && !bookingId) {
    return <Navigate to="/not-found" replace />;
  }

  if (placeId) {
    place = getPlaceById(placeId);
  }

  if (bookingId) {
    booking = getBookingById(bookingId);
    place = getPlaceById(booking ? booking.placeId : '');
  }

  if (!place || (bookingId && !booking)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <main>
      <Helmet>
        <title>{place.title}</title>
      </Helmet>

      <Container sx={{ marginBlock: { xs: 5, md: 6 } }}>
        <Stack gap={4}>
          <PageHeader
            title={place.title}
            description={place.description}
          />

          <Grid container>
            <Grid item xs={12} md={6}>
              <Picture>
                <img src={place.image} alt={place.title} />
              </Picture>
            </Grid>

            <Grid item xs={12} md={6}>
              <BookingForm place={place} booking={booking} />
            </Grid>
          </Grid>

        </Stack>
      </Container>
    </main>
  );
}

export default PlacePage;