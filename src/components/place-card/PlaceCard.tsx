import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import type { Place } from "@/types/place";

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover, &:focus': {
          boxShadow: 8,
        },
      }}
      component={Link}
      href={`/place/${place.id}`}
      underline="none"
    >
      <CardMedia
        sx={{ height: 300 }}
        image={place.image}
        title="green iguana"
      />
      <CardContent component={Stack} gap={1} flex={1}>
        <Typography gutterBottom variant="h5" component="h3" sx={{ margin: 0 }}>
          {place.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {place.description}
        </Typography>
        <Typography variant="body2" fontWeight={600} sx={{ mt: 'auto' }}>
          ${place.nightPrice} USD <Typography variant="caption">/night</Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PlaceCard;