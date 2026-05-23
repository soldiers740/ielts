const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API server is running' });
});

// Get weather alerts endpoint
app.get('/api/weather/alerts', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    if (!API_KEY) {
      return res.status(400).json({ error: 'API key not configured' });
    }

    // Try to fetch alerts using One Call API if available with your API tier
    // Note: Alerts are only available with paid API tiers
    const response = await axios.get(`${API_URL}/onecall`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
      },
    });

    const alerts = response.data.alerts || [];
    res.json({ alerts });
  } catch (error) {
    // If alerts endpoint is not available, return empty array
    if (error.response?.status === 401 || error.response?.status === 403) {
      return res.json({ alerts: [] });
    }
    console.error('Error fetching alerts:', error.message);
    res.json({ alerts: [] });
  }
});

// Get air quality data endpoint
app.get('/api/weather/air-quality', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    if (!API_KEY) {
      return res.status(400).json({ error: 'API key not configured' });
    }

    const response = await axios.get(`${API_URL}/air_pollution`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching air quality:', error.message);
    res.status(500).json({ error: 'Failed to fetch air quality data' });
  }
});

// Get weather for multiple cities endpoint
app.get('/api/weather/cities', async (req, res) => {
  try {
    const { cities } = req.query;

    if (!cities) {
      return res.status(400).json({ error: 'Cities parameter is required' });
    }

    if (!API_KEY) {
      return res.status(400).json({ error: 'API key not configured' });
    }

    const cityArray = cities.split(',');
    const weatherData = [];

    for (const city of cityArray) {
      try {
        const response = await axios.get(`${API_URL}/weather`, {
          params: {
            q: city.trim(),
            appid: API_KEY,
          },
        });
        weatherData.push(response.data);
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error.message);
      }
    }

    res.json({ cities: weatherData });
  } catch (error) {
    console.error('Error fetching weather for multiple cities:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Weather API server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
