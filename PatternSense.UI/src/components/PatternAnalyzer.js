/**
 * PatternAnalyzer Component
 * 
 * @author ELYES
 * @copyright Copyright (c) 2024-2025 ELYES. All rights reserved.
 * 
 * This component provides pattern analysis functionality with visualization
 * using Chart.js and Material-UI components.
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { analyzePattern, cancelAllRequests } from '../utils/api';
import { ErrorBoundary } from 'react-error-boundary';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartErrorFallback = ({ error, resetErrorBoundary }) => (
  <Box sx={{ p: 2, textAlign: 'center' }}>
    <Typography color="error" gutterBottom>
      Error rendering chart: {error.message}
    </Typography>
    <Button
      variant="outlined"
      color="primary"
      onClick={resetErrorBoundary}
      sx={{ mt: 1 }}
    >
      Try Again
    </Button>
  </Box>
);

const PatternAnalyzer = () => {
  const [numbers, setNumbers] = useState(['', '', '', '', '']);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastAnalyzed, setLastAnalyzed] = useState(null);

  // Cleanup function to cancel pending requests when component unmounts
  useEffect(() => {
    return () => {
      cancelAllRequests('Component unmounted');
    };
  }, []);

  const validateInput = useCallback((value) => {
    if (value === '') return true;
    const num = Number(value);
    return !isNaN(num) && num >= -1000000 && num <= 1000000 && Number.isInteger(num);
  }, []);

  const handleInputChange = useCallback((index, value) => {
    if (validateInput(value)) {
      setNumbers(prev => {
        const newNumbers = [...prev];
        newNumbers[index] = value;
        return newNumbers;
      });
      setError(null);
    }
  }, [validateInput]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      if (index < 4) {
        form.elements[index + 1].focus();
      } else {
        handleAnalyze();
      }
    }
  }, []);

  const resetForm = useCallback(() => {
    setNumbers(['', '', '', '', '']);
    setResult(null);
    setError(null);
  }, []);

  // Memoized analyze function
  const memoizedAnalyze = useCallback(async (parsedNumbers) => {
    try {
      const data = await analyzePattern(parsedNumbers);
      return data;
    } catch (err) {
      throw err;
    }
  }, []);

  const handleAnalyze = async (event) => {
    if (event) {
      event.preventDefault();
    }

    // Don't reanalyze the same sequence
    const currentSequence = numbers.join(',');
    if (currentSequence === lastAnalyzed) {
      return;
    }

    setError(null);
    setResult(null);

    try {
      const parsedNumbers = numbers.map(num => {
        const parsed = parseInt(num, 10);
        if (isNaN(parsed)) {
          throw new Error('Please enter valid numbers');
        }
        return parsed;
      });

      setLoading(true);
      const data = await memoizedAnalyze(parsedNumbers);
      setResult(data);
      setLastAnalyzed(currentSequence);
    } catch (err) {
      console.error('Error analyzing pattern:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'An error occurred while analyzing the pattern'
      );
    } finally {
      setLoading(false);
    }
  };

  const chartData = result
    ? {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Number Sequence',
            data: numbers.map((num) => {
              const parsed = parseInt(num, 10);
              return isNaN(parsed) ? null : parsed;
            }),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            spanGaps: true,
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: true,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Pattern Visualization',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Value: ${context.parsed.y.toLocaleString()}`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        cornerRadius: 4,
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          precision: 0,
          callback: function(value) {
            return value.toLocaleString();
          },
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
  };

  return (
    <Card className="pattern-card" component={Paper} elevation={3}>
      <CardHeader 
        title="Pattern Analyzer" 
        titleTypographyProps={{ variant: 'h5' }}
      />
      <CardContent>
        <form onSubmit={handleAnalyze} noValidate>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              Enter 5 numbers between -1,000,000 and 1,000,000:
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {numbers.map((num, index) => (
                <Grid item xs={4} sm={2} key={index}>
                  <TextField
                    label={`Number ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={num}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyPress={handleKeyPress}
                    type="number"
                    error={num !== '' && !validateInput(num)}
                    helperText={num !== '' && !validateInput(num) ? 'Invalid number' : ''}
                    inputProps={{
                      min: -1000000,
                      max: 1000000,
                      step: 1,
                      'aria-label': `Number ${index + 1} of 5`
                    }}
                    required
                  />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading || numbers.some(num => num === '' || !validateInput(num))}
              >
                {loading ? <CircularProgress size={24} /> : 'Analyze Pattern'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetForm}
                disabled={loading}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </form>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            onClose={() => setError(null)}
            variant="filled"
          >
            {error}
          </Alert>
        )}

        {result && (
          <Box component={Paper} elevation={1} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Analysis Results
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Basic Pattern:
              </Typography>
              <Chip
                label={result.patternType}
                className={`pattern-badge ${result.patternType.toLowerCase()}`}
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" component="span">
                {result.description}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Advanced Analysis:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                {result.advancedAnalysis.isArithmeticSequence && (
                  <Chip
                    label="Arithmetic Sequence"
                    className="pattern-badge arithmetic"
                  />
                )}
                {result.advancedAnalysis.isGeometricSequence && (
                  <Chip
                    label="Geometric Sequence"
                    className="pattern-badge geometric"
                  />
                )}
                {result.advancedAnalysis.isSymmetric && (
                  <Chip
                    label="Symmetric"
                    className="pattern-badge symmetric"
                  />
                )}
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Trend: {result.advancedAnalysis.trend}
              </Typography>
              {result.advancedAnalysis.commonDifference && (
                <Typography variant="body2">
                  Common Difference: {result.advancedAnalysis.commonDifference.toLocaleString()}
                </Typography>
              )}
              {result.advancedAnalysis.commonRatio && (
                <Typography variant="body2">
                  Common Ratio: {result.advancedAnalysis.commonRatio.toLocaleString()}
                </Typography>
              )}
            </Box>

            {result && (
              <Box sx={{ mt: 4, height: 400 }}>
                <ErrorBoundary
                  FallbackComponent={ChartErrorFallback}
                  onReset={() => {
                    setResult(null);
                    setError(null);
                  }}
                >
                  <Line data={chartData} options={chartOptions} />
                </ErrorBoundary>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PatternAnalyzer; 