import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002';

// Multiple joke APIs
const JOKE_APIS = {
  random: [
    'https://api.jokes.one/jokes/random',
    'https://official-joke-api.appspot.com/random_joke',
    'https://v2.jokeapi.dev/joke/Any',
  ],
  programming: [
    'https://official-joke-api.appspot.com/jokes/programming/random',
    'https://v2.jokeapi.dev/joke/Programming',
  ],
  knockKnock: [
    'https://official-joke-api.appspot.com/jokes/knock-knock/random',
    'https://v2.jokeapi.dev/joke/Knock-knock',
  ],
  general: [
    'https://v2.jokeapi.dev/joke/General',
    'https://icanhazdadjoke.com',
  ],
};

/**
 * Fetch a random joke based on type
 * @param {string} type - Joke type (random, programming, knock-knock, general)
 * @returns {Promise<Object>} Joke object with setup/delivery or text
 */
export const getRandomJoke = async (type = 'random') => {
  try {
    // Try backend first for proxy and caching
    const backendResponse = await axios.get(`${BACKEND_URL}/api/joke`, {
      params: { type },
      timeout: 5000,
    });

    if (backendResponse.data.success) {
      return backendResponse.data.joke;
    }
  } catch (err) {
    console.log('Backend request failed, trying direct API calls...');
  }

  // Fallback to direct API calls if backend fails
  return getJokeFromPublicAPI(type);
};

/**
 * Get joke directly from public APIs
 * @param {string} type - Joke type
 * @returns {Promise<Object>} Joke object
 */
const getJokeFromPublicAPI = async (type = 'random') => {
  const apis = JOKE_APIS[type] || JOKE_APIS.random;
  const apiUrl = apis[Math.floor(Math.random() * apis.length)];

  try {
    const response = await axios.get(apiUrl, { timeout: 5000 });

    return parseJokeResponse(response.data, apiUrl);
  } catch (error) {
    console.error(`Error fetching from ${apiUrl}:`, error.message);

    // Try another API if this one fails
    if (apis.length > 1) {
      const otherApis = apis.filter((api) => api !== apiUrl);
      for (const api of otherApis) {
        try {
          const response = await axios.get(api, { timeout: 5000 });
          return parseJokeResponse(response.data, api);
        } catch (err) {
          console.error(`Error fetching from ${api}:`, err.message);
        }
      }
    }

    throw new Error('Unable to fetch joke from any API');
  }
};

/**
 * Parse joke response from different API formats
 * @param {Object} data - Raw response data
 * @param {string} apiUrl - API URL (to identify format)
 * @returns {Object} Standardized joke object
 */
const parseJokeResponse = (data, apiUrl) => {
  // Jokes.one API
  if (data.joke) {
    return {
      id: `jokes-one-${Date.now()}`,
      text: data.joke.text,
      type: 'single',
      source: 'Jokes.one',
    };
  }

  // Official Joke API
  if (data.setup && data.delivery) {
    return {
      id: `official-joke-${data.id || Date.now()}`,
      setup: data.setup,
      delivery: data.delivery,
      type: data.type || 'twopart',
      source: 'Official Joke API',
    };
  }

  // JokeAPI (v2.jokeapi.dev)
  if (data.type === 'twopart' && data.setup && data.delivery) {
    return {
      id: `jokeapi-${data.id || Date.now()}`,
      setup: data.setup,
      delivery: data.delivery,
      category: data.category,
      type: 'twopart',
      source: 'JokeAPI',
    };
  }

  if (data.type === 'single' && data.joke) {
    return {
      id: `jokeapi-${data.id || Date.now()}`,
      text: data.joke,
      category: data.category,
      type: 'single',
      source: 'JokeAPI',
    };
  }

  // icanhazdadjoke API
  if (data.joke) {
    return {
      id: `dadjoke-${data.id || Date.now()}`,
      text: data.joke,
      type: 'single',
      source: 'Dad Jokes',
    };
  }

  // Fallback
  return {
    id: `unknown-${Date.now()}`,
    text: 'Why did the joke fail? Because it was loading...',
    type: 'single',
    source: 'System',
  };
};

/**
 * Get joke statistics
 * @returns {Promise<Object>} Statistics object
 */
export const getJokeStats = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/joke/stats`);
    return response.data;
  } catch (err) {
    console.error('Error fetching stats:', err);
    return null;
  }
};
