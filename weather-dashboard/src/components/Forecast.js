import React from 'react';
import { getWeatherIconUrl, getWeatherEmoji } from '../services/weatherService';
import '../styles/Forecast.css';

const Forecast = ({ data, unit }) => {
  return (
    <div className="forecast bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-600">
      <h2 className="text-2xl font-bold mb-6">📅 5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.map((day, index) => (
          <div
            key={index}
            className="forecast-card bg-slate-600 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all hover:scale-105 cursor-pointer"
          >
            <h3 className="font-semibold text-lg mb-3">{day.date}</h3>
            <img
              src={getWeatherIconUrl(day.icon)}
              alt={day.description}
              className="w-16 h-16 mx-auto mb-2"
            />
            <div className="flex items-center justify-center gap-2 mb-3">
              <span>{getWeatherEmoji(day.description)}</span>
              <span className="text-sm text-slate-300">{day.description}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">High:</span>
                <span className="font-semibold">{day.max_temp}{day.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Low:</span>
                <span className="font-semibold">{day.min_temp}{day.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Humidity:</span>
                <span className="font-semibold">{day.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wind:</span>
                <span className="font-semibold">{day.wind_speed.toFixed(1)}</span>
              </div>
              {day.precipitation > 0 && (
                <div className="flex justify-between text-blue-400">
                  <span>Precipitation:</span>
                  <span className="font-semibold">{day.precipitation.toFixed(1)}mm</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
