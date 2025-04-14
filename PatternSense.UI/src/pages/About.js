import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          About PatternSense AI
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph align="center">
          Advanced pattern recognition powered by artificial intelligence
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            What is PatternSense AI?
          </Typography>
          <Typography paragraph>
            PatternSense AI is a cutting-edge application that leverages artificial intelligence to analyze and identify patterns in number sequences. Our advanced algorithms can detect various types of patterns including arithmetic sequences, geometric sequences, symmetric patterns, and more complex mathematical relationships.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" gutterBottom>
            Key Features
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <BarChartIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Pattern Visualization</Typography>
                <Typography variant="body2" color="text.secondary">
                  Visual representation of number sequences to better understand patterns
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">AI Analysis</Typography>
                <Typography variant="body2" color="text.secondary">
                  Advanced AI algorithms to detect complex patterns in number sequences
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <SpeedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Real-time Processing</Typography>
                <Typography variant="body2" color="text.secondary">
                  Instant analysis and results for quick pattern identification
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Secure Processing</Typography>
                <Typography variant="body2" color="text.secondary">
                  Your data is processed securely with industry-standard encryption
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" gutterBottom>
            How It Works
          </Typography>
          <Typography paragraph>
            PatternSense AI uses a combination of mathematical algorithms and machine learning models to analyze number sequences. When you input a sequence of numbers, our system:
          </Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            <Typography component="li" paragraph>
              Processes the input through our pattern recognition engine
            </Typography>
            <Typography component="li" paragraph>
              Identifies potential mathematical relationships between numbers
            </Typography>
            <Typography component="li" paragraph>
              Classifies the pattern type (arithmetic, geometric, symmetric, etc.)
            </Typography>
            <Typography component="li" paragraph>
              Provides detailed analysis and visualization of the pattern
            </Typography>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h5" gutterBottom>
            Applications
          </Typography>
          <Typography paragraph>
            PatternSense AI can be used in various fields including:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" paragraph>
              Mathematics education and learning
            </Typography>
            <Typography component="li" paragraph>
              Data analysis and forecasting
            </Typography>
            <Typography component="li" paragraph>
              Financial market pattern recognition
            </Typography>
            <Typography component="li" paragraph>
              Scientific research and hypothesis testing
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default About; 