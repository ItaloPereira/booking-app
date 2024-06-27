import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container sx={{ textAlign: 'center', marginTop: 10 }} component="main">
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;