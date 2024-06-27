import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';

import PlaceCard from "@/components/place-card/PlaceCard";
import type { Place } from "@/types/place";

interface PlaceCardListProps {
  places: Place[];
}

const PlaceCardList = ({ places }: PlaceCardListProps) => {
  return (
    <Stack gap={2} flexGrow={1}>
      <Grid container spacing={2}>
        {places.map((place) => (
          <Grid key={place.id} item xs={12} sm={6} lg={4}>
            <PlaceCard key={place.title} place={place} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default PlaceCardList;