import React, { useState } from 'react';
import { getWeatherIconUrl, getWeatherEmoji } from '../services/weatherService';
import '../styles/HourlyForecast.css';

const HourlyForecast = ({ data, unit }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="hourly-forecast bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-600">
      <h2 className="text-2xl font-bold mb-6">⏰ Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-3 pb-2">
          {data.map((hour, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`hourly-card flex-shrink-0 bg-slate-600 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all cursor-pointer ${
                hoveredIndex === index ? 'scale-110 shadow-xl' : ''
              }`}
            >
              <div className="text-sm font-semibold text-slate-300 mb-3">{hour.time}</div>
              <img
                src={getWeatherIconUrl(hour.icon)}
                alt={hour.description}
                className="w-12 h-12 mx-auto mb-2"
              />
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{hour.temp}°</div>
                <div className="text-xs text-slate-400 mb-2">{hour.description}</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">💧</span>
                    <span>{hour.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">💨</span>
                    <span>{hour.wind_speed.toFixed(1)}</span>
                  </div>
                  {hour.precipitation > 0 && (
                    <div className="flex justify-between text-blue-400">
                      <span>🌧️</span>
                      <span>{hour.precipitation.toFixed(1)}mm</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
