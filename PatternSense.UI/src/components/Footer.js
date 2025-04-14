import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' PatternSense AI. All rights reserved.'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Developed by '}
          <Link color="inherit" href="https://github.com/elyes">
            Elyes
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 