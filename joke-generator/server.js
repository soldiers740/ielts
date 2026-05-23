const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Cache for jokes to reduce API calls
const jokeCache = {
  random: null,
  programming: null,
  knockKnock: null,
  general: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let jokeCount = 0;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Joke API server is running' });
});

// Get random joke endpoint
app.get('/api/joke', async (req, res) => {
  try {
    const { type = 'random' } = req.query;
    jokeCount++;

    // Check cache
    const now = Date.now();
    if (
      jokeCache[type] &&
      jokeCache.timestamp &&
      now - jokeCache.timestamp < CACHE_DURATION
    ) {
      return res.json({ success: true, joke: jokeCache[type], cached: true });
    }

    // Fetch from APIs
    const joke = await fetchJokeFromAPI(type);

    if (joke) {
      // Update cache
      jokeCache[type] = joke;
      jokeCache.timestamp = now;

      return res.json({ success: true, joke });
    } else {
      return res.status(500).json({ success: false, error: 'Failed to fetch joke' });
    }
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get statistics
app.get('/api/joke/stats', (req, res) => {
  res.json({
    totalJokesRequested: jokeCount,
    cacheSize: Object.keys(jokeCache).length,
    uptime: process.uptime(),
  });
});

// Fetch joke from various APIs
const fetchJokeFromAPI = async (type = 'random') => {
  const APIs = {
    random: [
      () => fetchFromJokesOne(),
      () => fetchFromOfficialJokeAPI('random_joke'),
      () => fetchFromJokeAPI('Any'),
    ],
    programming: [
      () => fetchFromOfficialJokeAPI('jokes/programming/random'),
      () => fetchFromJokeAPI('Programming'),
    ],
    knockKnock: [
      () => fetchFromOfficialJokeAPI('jokes/knock-knock/random'),
      () => fetchFromJokeAPI('Knock-knock'),
    ],
    general: [
      () => fetchFromJokeAPI('General'),
      () => fetchFromDadJokesAPI(),
    ],
  };

  const apiFunctions = APIs[type] || APIs.random;

  for (const apiFunction of apiFunctions) {
    try {
      const joke = await apiFunction();
      if (joke) return joke;
    } catch (err) {
      console.log(`API failed, trying next...`);
    }
  }

  return null;
};

// Jokes.one API
const fetchFromJokesOne = async () => {
  const response = await axios.get('https://api.jokes.one/jokes/random', {
    timeout: 5000,
  });
  if (response.data && response.data.joke) {
    return {
      id: `jokes-one-${Date.now()}`,
      text: response.data.joke.text,
      type: 'single',
      source: 'Jokes.one',
    };
  }
  return null;
};

// Official Joke API
const fetchFromOfficialJokeAPI = async (endpoint) => {
  const response = await axios.get(
    `https://official-joke-api.appspot.com/${endpoint}`,
    { timeout: 5000 }
  );
  if (response.data) {
    if (response.data.setup && response.data.delivery) {
      return {
        id: `official-${response.data.id || Date.now()}`,
        setup: response.data.setup,
        delivery: response.data.delivery,
        type: 'twopart',
        source: 'Official Joke API',
      };
    }
  }
  return null;
};

// JokeAPI (v2.jokeapi.dev)
const fetchFromJokeAPI = async (category) => {
  const response = await axios.get(
    `https://v2.jokeapi.dev/joke/${category}?format=json`,
    { timeout: 5000 }
  );
  if (response.data) {
    if (response.data.type === 'twopart') {
      return {
        id: `jokeapi-${response.data.id || Date.now()}`,
        setup: response.data.setup,
        delivery: response.data.delivery,
        category: response.data.category,
        type: 'twopart',
        source: 'JokeAPI',
      };
    } else if (response.data.type === 'single') {
      return {
        id: `jokeapi-${response.data.id || Date.now()}`,
        text: response.data.joke,
        category: response.data.category,
        type: 'single',
        source: 'JokeAPI',
      };
    }
  }
  return null;
};

// Dad Jokes API (icanhazdadjoke.com)
const fetchFromDadJokesAPI = async () => {
  const response = await axios.get('https://icanhazdadjoke.com', {
    headers: { Accept: 'application/json' },
    timeout: 5000,
  });
  if (response.data && response.data.joke) {
    return {
      id: `dadjoke-${response.data.id || Date.now()}`,
      text: response.data.joke,
      type: 'single',
      source: 'Dad Jokes',
    };
  }
  return null;
};

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Joke API server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Get a joke: http://localhost:${PORT}/api/joke?type=random`);
});
