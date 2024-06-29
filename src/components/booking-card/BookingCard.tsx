import { styled } from '@mui/material/styles';
import { differenceInDays, } from 'date-fns';

import Paper, { type PaperProps } from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Picture from '@/components/Picture';

import type { Place } from "@/types/place";
import type { Booking } from "@/types/booking";

import { formatDate } from '@/helpers/date';

const BookingContent = styled(Paper)<PaperProps>(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
  borderRadius: '0 0 8px 8px',
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
    borderRadius: '0 16px 16px 0',
  },
}));

interface BookingCardProps {
  booking: Booking;
  place: Place;
  onDelete: (bookingId: string) => void;
}


const BookingCard = ({ place, booking, onDelete }: BookingCardProps) => {
  const calculateTotalPrice = () => {
    const numberOfNights = differenceInDays(booking.checkout, booking.checkin);
    return numberOfNights * place.nightPrice;
  }

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Picture>
          <img src={place.image} alt={place.title} />
        </Picture>
      </Grid>

      <Grid item xs={12} md={9}>
        <BookingContent>
          <Stack gap={3} sx={{ height: '100%' }}>
            <Stack gap={1}>
              <Typography component="h2" variant="h5">{formatDate(booking.checkin)} - {formatDate(booking.checkout)}</Typography>
              <Typography component="h3">{place.title}</Typography>
              <Stack direction="row" gap={1}>
                <Typography fontWeight={600}>${calculateTotalPrice()} USD for {differenceInDays(booking.checkout, booking.checkin)} night(s)</Typography>
              </Stack>
            </Stack>

            <Stack sx={{ mt: 'auto' }} direction={{ md: 'row' }} gap={2}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                href={`/booking/${booking.id}`}
              >
                Edit Booking
              </Button>

              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete(booking.id)}
              >
                Delete Booking
              </Button>
            </Stack>
          </Stack>
        </BookingContent>
      </Grid>
    </Grid>
  );
}

export default BookingCard;