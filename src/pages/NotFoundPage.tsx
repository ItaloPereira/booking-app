import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const NotFoundPage = () => {
  return (
    <Stack marginTop={10} gap={4} alignItems="center" component="main">
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="h5" component="h2">
        Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
      <Box>
        <Button variant="contained" color="primary" href="/">
          Back to Home
        </Button>
      </Box>
    </Stack>
  );
};

export default NotFoundPage;