import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 second timeout
  // Add retry configuration
  retry: 2,
  retryDelay: 1000,
});

// Keep track of pending requests
const pendingRequests = new Map();

// Keep track of debounced functions
const debouncedFunctions = new Map();

// Create a cancel token source
const createCancelToken = () => {
  return axios.CancelToken.source();
};

// Cancel all pending requests
export const cancelAllRequests = (message = 'Operation cancelled by user') => {
  for (const [key, source] of pendingRequests.entries()) {
    source.cancel(message);
    pendingRequests.delete(key);
  }
};

// Debounce function to prevent rapid-fire requests
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  
  return (...args) => {
    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Set a new timeout
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
    
    // Return a function to cancel the debounce
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  };
};

// Add retry logic with exponential backoff
api.interceptors.response.use(undefined, async (err) => {
  const { config } = err;
  
  // Don't retry if the request was cancelled
  if (axios.isCancel(err)) {
    return Promise.reject(err);
  }

  if (!config || !config.retry) {
    return Promise.reject(err);
  }

  config.retryCount = config.retryCount || 0;

  if (config.retryCount >= config.retry) {
    return Promise.reject(err);
  }

  // Calculate delay with exponential backoff
  const delay = Math.min(1000 * Math.pow(2, config.retryCount), 10000);
  config.retryCount += 1;

  // Create a new cancel token for the retry
  const source = createCancelToken();
  config.cancelToken = source.token;

  // Add to pending requests
  const requestId = Math.random().toString(36).substring(7);
  pendingRequests.set(requestId, source);

  try {
    const delayRetry = new Promise(resolve => setTimeout(resolve, delay));
    await delayRetry;

    // Check if the request was cancelled during the delay
    if (source.token.reason) {
      return Promise.reject(source.token.reason);
    }

    return await api(config);
  } finally {
    pendingRequests.delete(requestId);
  }
});

// Add a request interceptor for handling errors globally
api.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }

    // Add cancel token if not already present
    if (!config.cancelToken) {
      const source = createCancelToken();
      config.cancelToken = source.token;

      // Add to pending requests
      const requestId = Math.random().toString(36).substring(7);
      pendingRequests.set(requestId, source);

      // Add cleanup function to config
      config.cleanup = () => {
        pendingRequests.delete(requestId);
      };
    }

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject({
      message: 'Failed to send request. Please check your internet connection.',
      status: 0
    });
  }
);

// Add a response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => {
    // Clean up the request
    if (response.config.cleanup) {
      response.config.cleanup();
    }
    return response;
  },
  (error) => {
    // Clean up the request
    if (error.config?.cleanup) {
      error.config.cleanup();
    }

    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        url: error.config.url
      });
      
      // Handle specific HTTP status codes
      switch (error.response.status) {
        case 400:
          return Promise.reject({
            message: error.response.data.message || 'Invalid request. Please check your input.',
            status: 400,
            data: error.response.data
          });
        case 401:
          return Promise.reject({
            message: 'Unauthorized. Please log in again.',
            status: 401
          });
        case 403:
          return Promise.reject({
            message: 'Access denied. You do not have permission to perform this action.',
            status: 403
          });
        case 404:
          return Promise.reject({
            message: 'The requested resource was not found.',
            status: 404
          });
        case 429:
          return Promise.reject({
            message: 'Too many requests. Please try again later.',
            status: 429
          });
        case 500:
          return Promise.reject({
            message: 'Internal server error. Please try again later.',
            status: 500
          });
        default:
          return Promise.reject({
            message: error.response.data.message || 'Server error occurred',
            status: error.response.status,
            data: error.response.data
          });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', {
        request: error.request,
        url: error.config.url
      });
      return Promise.reject({
        message: 'No response from server. Please try again later.',
        status: 0
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', {
        message: error.message,
        config: error.config
      });
      return Promise.reject({
        message: 'An unexpected error occurred',
        status: 0
      });
    }
  }
);

// Input validation helper
const validateNumbers = (numbers) => {
  if (!Array.isArray(numbers)) {
    throw new Error('Invalid input: Numbers must be an array');
  }

  if (numbers.length !== 5) {
    throw new Error('Invalid input: Please provide exactly 5 numbers');
  }

  if (numbers.some(num => !Number.isInteger(num))) {
    throw new Error('Invalid input: All numbers must be integers');
  }

  if (numbers.some(num => num < -1000000 || num > 1000000)) {
    throw new Error('Invalid input: Numbers must be between -1,000,000 and 1,000,000');
  }

  return true;
};

// API functions
export const analyzePattern = async (numbers) => {
  const source = createCancelToken();
  const requestId = Math.random().toString(36).substring(7);
  pendingRequests.set(requestId, source);
  
  try {
    validateNumbers(numbers);
    const response = await api.post('/PatternAnalysis/analyze', { numbers }, {
      cancelToken: source.token
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Request cancelled');
    }
    if (error.message && error.message.startsWith('Invalid input:')) {
      throw error;
    }
    throw {
      message: error.message || 'Failed to analyze pattern',
      status: error.status || 500
    };
  } finally {
    pendingRequests.delete(requestId);
  }
};

export default api; 