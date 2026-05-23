import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const API_URL = process.env.REACT_APP_WEATHER_API_URL;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

if (!API_KEY) {
  console.warn(
    'Weather API Key not found. Please set REACT_APP_OPENWEATHER_API_KEY in .env file.'
  );
}

const createWeatherClient = () => {
  return axios.create({
    baseURL: API_URL,
    params: {
      appid: API_KEY,
    },
  });
};

const weatherClient = createWeatherClient();

/**
 * Fetch weather data by city name
 * @param {string} city - City name
 * @param {string} units - Temperature units ('metric', 'imperial')
 * @returns {Promise<Object>} Weather data object
 */
export const getWeatherData = async (city, units = 'metric') => {
  try {
    // Get current weather
    const currentResponse = await weatherClient.get('/weather', {
      params: {
        q: city,
        units: units,
      },
    });

    const currentData = currentResponse.data;

    // Get forecast data using coordinates
    const forecastResponse = await weatherClient.get('/forecast', {
      params: {
        lat: currentData.coord.lat,
        lon: currentData.coord.lon,
        units: units,
      },
    });

    // Get alerts using One Call API (if available with your API tier)
    let alertsData = [];
    try {
      const alertsResponse = await axios.get(`${BACKEND_URL}/api/weather/alerts`, {
        params: {
          lat: currentData.coord.lat,
          lon: currentData.coord.lon,
        },
      });
      alertsData = alertsResponse.data.alerts || [];
    } catch (err) {
      // Alerts endpoint might not be available
      console.log('Alerts endpoint not available');
    }

    return {
      current: {
        ...currentData,
        name: currentData.name,
        country: currentData.sys.country,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        description: currentData.weather[0].main,
        icon: currentData.weather[0].icon,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg,
        cloudiness: currentData.clouds.all,
        visibility: currentData.visibility,
        uvi: currentData.uvi || 'N/A',
        lat: currentData.coord.lat,
        lon: currentData.coord.lon,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        alerts: alertsData,
      },
      forecast: processForecastData(forecastResponse.data, units),
      hourly: processHourlyData(forecastResponse.data),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Fetch weather data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - Temperature units
 * @returns {Promise<Object>} Weather data object
 */
export const getWeatherByCoordinates = async (lat, lon, units = 'metric') => {
  try {
    // Get current weather
    const currentResponse = await weatherClient.get('/weather', {
      params: {
        lat: lat,
        lon: lon,
        units: units,
      },
    });

    const currentData = currentResponse.data;

    // Get forecast data
    const forecastResponse = await weatherClient.get('/forecast', {
      params: {
        lat: lat,
        lon: lon,
        units: units,
      },
    });

    return {
      current: {
        ...currentData,
        name: currentData.name,
        country: currentData.sys.country,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        description: currentData.weather[0].main,
        icon: currentData.weather[0].icon,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg,
        cloudiness: currentData.clouds.all,
        visibility: currentData.visibility,
        lat: currentData.coord.lat,
        lon: currentData.coord.lon,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        alerts: [],
      },
      forecast: processForecastData(forecastResponse.data, units),
      hourly: processHourlyData(forecastResponse.data),
    };
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

/**
 * Process and group forecast data by day
 * @param {Object} data - Raw forecast data from API
 * @param {string} units - Temperature units
 * @returns {Array} Processed forecast array
 */
const processForecastData = (data, units = 'metric') => {
  const grouped = {};

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  // Get daily forecast (max, min temps and main condition)
  return Object.entries(grouped).map(([date, items]) => {
    const temps = items.map((i) => i.main.temp);
    const mainWeather = items[0];
    const unit = units === 'metric' ? '°C' : '°F';

    return {
      date: date,
      max_temp: Math.round(Math.max(...temps)),
      min_temp: Math.round(Math.min(...temps)),
      description: mainWeather.weather[0].main,
      icon: mainWeather.weather[0].icon,
      humidity: mainWeather.main.humidity,
      wind_speed: mainWeather.wind.speed,
      precipitation: mainWeather.rain?.['3h'] || 0,
      unit: unit,
    };
  });
};

/**
 * Process hourly forecast data
 * @param {Object} data - Raw forecast data from API
 * @returns {Array} Processed hourly forecast array
 */
const processHourlyData = (data) => {
  return data.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    temp: Math.round(item.main.temp),
    description: item.weather[0].main,
    icon: item.weather[0].icon,
    wind_speed: item.wind.speed,
    humidity: item.main.humidity,
    precipitation: item.rain?.['3h'] || 0,
  }));
};

/**
 * Get weather icon URL
 * @param {string} iconCode - Icon code from API
 * @returns {string} Icon URL
 */
export const getWeatherIconUrl = (iconCode) => {
  const baseUrl = process.env.REACT_APP_WEATHER_ICON_URL || 'https://openweathermap.org/img/wn';
  return `${baseUrl}/${iconCode}@4x.png`;
};

/**
 * Convert wind direction (degrees) to compass direction
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} Compass direction (N, NE, E, etc.)
 */
export const getWindDirection = (degrees) => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.round((degrees % 360) / 22.5) % 16;
  return directions[index];
};

/**
 * Get weather emoji based on condition
 * @param {string} condition - Weather condition
 * @returns {string} Emoji
 */
export const getWeatherEmoji = (condition) => {
  const emojiMap = {
    Thunderstorm: '⛈️',
    Drizzle: '🌦️',
    Rain: '🌧️',
    Snow: '❄️',
    Mist: '🌫️',
    Smoke: '💨',
    Haze: '🌫️',
    Dust: '🌪️',
    Fog: '🌫️',
    Sand: '🏜️',
    Ash: '🌋',
    Squall: '💨',
    Tornado: '🌪️',
    Clear: '☀️',
    Clouds: '☁️',
  };
  return emojiMap[condition] || '🌤️';
};
