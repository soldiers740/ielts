import React from 'react';
import { FiEye, FiWind, FiDroplets } from 'react-icons/fi';
import { getWeatherIconUrl, getWindDirection, getWeatherEmoji } from '../services/weatherService';
import '../styles/CurrentWeather.css';

const CurrentWeather = ({ data, location, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const visibilityUnit = unit === 'metric' ? 'km' : 'mi';
  const visibilityValue = unit === 'metric' ? (data.visibility / 1000).toFixed(1) : (data.visibility / 1609).toFixed(1);

  const sunrise = new Date(data.sunrise * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const sunset = new Date(data.sunset * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="current-weather bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-600">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Main Weather Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {location}, {data.country}
            </h2>
            <p className="text-slate-400 mb-6">Last updated: {new Date().toLocaleString()}</p>

            <div className="flex items-center gap-6 mb-8">
              <img
                src={getWeatherIconUrl(data.icon)}
                alt={data.description}
                className="w-24 h-24 filter drop-shadow-lg"
              />
              <div>
                <div className="text-6xl font-bold">{Math.round(data.temp)}</div>
                <div className="text-3xl text-slate-400">{tempUnit}</div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <span>{getWeatherEmoji(data.description)}</span>
                {data.description}
              </h3>
              <p className="text-slate-400 text-lg">Feels like {Math.round(data.feels_like)}{tempUnit}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Weather Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Humidity */}
          <div className="bg-slate-600 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <FiDroplets size={18} />
              <span className="text-sm font-semibold">Humidity</span>
            </div>
            <div className="text-3xl font-bold">{data.humidity}%</div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                style={{ width: `${data.humidity}%` }}
              />
            </div>
          </div>

          {/* Wind Speed */}
          <div className="bg-slate-600 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <FiWind size={18} />
              <span className="text-sm font-semibold">Wind</span>
            </div>
            <div className="text-3xl font-bold">{data.wind_speed.toFixed(1)}</div>
            <div className="text-sm text-slate-400">{windUnit} {getWindDirection(data.wind_deg)}</div>
          </div>

          {/* Pressure */}
          <div className="bg-slate-600 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all">
            <div className="text-sm font-semibold text-slate-400 mb-2">Pressure</div>
            <div className="text-3xl font-bold">{data.pressure}</div>
            <div className="text-sm text-slate-400">hPa</div>
          </div>

          {/* Visibility */}
          <div className="bg-slate-600 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <FiEye size={18} />
              <span className="text-sm font-semibold">Visibility</span>
            </div>
            <div className="text-3xl font-bold">{visibilityValue}</div>
            <div className="text-sm text-slate-400">{visibilityUnit}</div>
          </div>

          {/* Cloudiness */}
          <div className="bg-slate-600 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all">
            <div className="text-sm font-semibold text-slate-400 mb-2">Cloudiness</div>
            <div className="text-3xl font-bold">{data.cloudiness}%</div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-gray-400 to-gray-600 h-2 rounded-full"
                style={{ width: `${data.cloudiness}%` }}
              />
            </div>
          </div>

          {/* Sunrise */}
          <div className="bg-slate-600 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all">
            <div className="text-sm font-semibold text-slate-400 mb-2">🌅 Sunrise</div>
            <div className="text-2xl font-bold">{sunrise}</div>
          </div>

          {/* Sunset */}
          <div className="bg-slate-600 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all">
            <div className="text-sm font-semibold text-slate-400 mb-2">🌇 Sunset</div>
            <div className="text-2xl font-bold">{sunset}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
