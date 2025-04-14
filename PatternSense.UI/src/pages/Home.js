import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PatternAnalyzer from '../components/PatternAnalyzer';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          PatternSense AI
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Discover and analyze patterns in number sequences using advanced AI algorithms.
          Enter 5 numbers below to get started.
        </Typography>
        <PatternAnalyzer />
      </Box>
    </Container>
  );
};

export default Home; 