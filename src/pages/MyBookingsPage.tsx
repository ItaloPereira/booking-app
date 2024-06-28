import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import PageHeader from '@/components/page-header/PageHeader';
import BookingCardList from '@/components/booking-card-list/BookingCardList';

import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

const MyBookingsPage = () => {
  const { bookings } = useBookingsContext();

  return (
    <main>
      <Helmet>
        <title>Booking App | My Bookings</title>
      </Helmet>

      <Container sx={{ marginBlock: { xs: 5, md: 6 } }}>
        <Stack gap={4}>
          <PageHeader
            title="Take a look at your schedule"
          />

          <BookingCardList bookings={bookings} />
        </Stack>
      </Container>
    </main>
  );
}

export default MyBookingsPage;