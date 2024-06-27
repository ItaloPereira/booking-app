import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import PageHeader from '@/components/page-header/PageHeader';
import ReservationForm from '@/components/reservation-form/ReservationForm';

import { useBookingsContext } from '@/contexts/bookings-context/useBookingsContext';

const Picture = styled('picture')(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',

  'img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    aspectRatio: '1 / 1',
    borderRadius: '8px 8px 0 0',

    [theme.breakpoints.up('md')]: {
      borderRadius: '16px 0 0 16px',
    },
  }
}));

const PlacePage = () => {
  const { placeId } = useParams();
  const { places } = useBookingsContext();

  const place = places.find((place) => place.id === placeId);

  if (!place) {
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

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Picture>
                <img src={place.image} alt={place.title} />
              </Picture>
            </Grid>

            <Grid item xs={12} md={6}>
              <ReservationForm place={place} />
            </Grid>
          </Grid>

        </Stack>
      </Container>
    </main>
  );
}

export default PlacePage;