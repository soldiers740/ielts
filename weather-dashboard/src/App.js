import React, { useState, useEffect } from 'react';
import { FiMapPin, FiSearch, FiRefreshCw, FiSettings } from 'react-icons/fi';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HourlyForecast from './components/HourlyForecast';
import WeatherAlerts from './components/WeatherAlerts';
import SearchBar from './components/SearchBar';
import { getWeatherData, getWeatherByCoordinates } from './services/weatherService';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [location, setLocation] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [showSettings, setShowSettings] = useState(false);

  // Fetch weather data
  const fetchWeather = async (city, tempUnit = unit) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city, tempUnit);
      if (data) {
        setCurrentWeather(data.current);
        setForecast(data.forecast);
        setHourlyForecast(data.hourly);
        setLocation(data.current.name || city);
        setCoords({ lat: data.current.lat, lon: data.current.lon });
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by geolocation
  const fetchWeatherByLocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoordinates(latitude, longitude, unit);
          if (data) {
            setCurrentWeather(data.current);
            setForecast(data.forecast);
            setHourlyForecast(data.hourly);
            setLocation(data.current.name || 'Current Location');
            setCoords({ lat: latitude, lon: longitude });
          }
        } catch (err) {
          setError('Failed to fetch weather for your location.');
          console.error('Geolocation weather error:', err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Unable to access your location. Please check permissions.');
        console.error('Geolocation error:', err);
        setLoading(false);
      }
    );
  };

  // Handle temperature unit change
  const handleUnitChange = async (newUnit) => {
    setUnit(newUnit);
    if (location) {
      await fetchWeather(location, newUnit);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeather(location);
  }, []);

  return (
    <div className="app min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🌤️</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Weather Dashboard</h1>
                <p className="text-slate-400 text-sm">Real-time weather information</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              title="Settings"
            >
              <FiSettings size={24} />
            </button>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <SearchBar onSearch={fetchWeather} />
            <button
              onClick={fetchWeatherByLocation}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
              title="Use current location"
            >
              <FiMapPin size={18} />
              <span className="hidden sm:inline">My Location</span>
            </button>
            <button
              onClick={() => fetchWeather(location)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh weather data"
            >
              <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-4 p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">Temperature Unit:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUnitChange('metric')}
                    className={`px-4 py-2 rounded transition-colors ${
                      unit === 'metric'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  >
                    °C (Celsius)
                  </button>
                  <button
                    onClick={() => handleUnitChange('imperial')}
                    className={`px-4 py-2 rounded transition-colors ${
                      unit === 'imperial'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  >
                    °F (Fahrenheit)
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 bg-opacity-50 border border-red-600 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && !currentWeather && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin text-5xl mb-4">🌪️</div>
              <p className="text-xl text-slate-400">Loading weather data...</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        {currentWeather && (
          <div className="space-y-6">
            {/* Current Weather */}
            <div className="fade-in">
              <CurrentWeather
                data={currentWeather}
                location={location}
                unit={unit}
              />
            </div>

            {/* Hourly Forecast */}
            {hourlyForecast && (
              <div className="fade-in" style={{ animationDelay: '0.1s' }}>
                <HourlyForecast data={hourlyForecast} unit={unit} />
              </div>
            )}

            {/* Weather Alerts */}
            {currentWeather.alerts && currentWeather.alerts.length > 0 && (
              <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                <WeatherAlerts alerts={currentWeather.alerts} />
              </div>
            )}

            {/* 5-Day Forecast */}
            {forecast && (
              <div className="fade-in" style={{ animationDelay: '0.3s' }}>
                <Forecast data={forecast} unit={unit} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
