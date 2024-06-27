import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import ListIcon from '@mui/icons-material/List';

import PageHeader from '@/components/page-header/PageHeader';
import PlaceCardList from '@/components/place-card-list/PlaceCardList';

import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

const HomePage = () => {
  const { places } = useBookingsContext();

  return (
    <main>
      <Helmet>
        <title>Booking App | My Bookings</title>
      </Helmet>

      <Container sx={{ marginBlock: { xs: 5, md: 6 } }}>
        <Stack gap={4}>
          <PageHeader
            title="Where would you like to go?"
            description="Book your next adventure with us!"
            actions={(
              <Button variant="contained" href="/my-bookings" startIcon={<ListIcon />}>
                My Bookings
              </Button>
            )}
          />

          <PlaceCardList places={places} />
        </Stack>
      </Container>
    </main>
  );
}

export default HomePage;